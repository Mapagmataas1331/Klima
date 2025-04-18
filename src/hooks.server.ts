import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { paraglideMiddleware } from '$lib/paraglide/server';

const paraglideHandle: Handle = ({ event, resolve }) =>
	paraglideMiddleware(event.request, ({ request: localizedRequest, locale }) => {
		event.request = localizedRequest;
		return resolve(event, {
			transformPageChunk: ({ html }) => {
				return html.replace('%lang%', locale);
			}
		});
	});

const hintsHandle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);
	response.headers.set('Accept-CH', 'Sec-CH-Prefers-Color-Scheme');
	response.headers.set('Critical-CH', 'Sec-CH-Prefers-Color-Scheme');
	response.headers.set('Vary', 'Sec-CH-Prefers-Color-Scheme');
	return response;
};

const themeHandle: Handle = async ({ event, resolve }) => {
	const cookieTheme = event.cookies.get('theme');
	const hintTheme = event.request.headers.get('sec-ch-prefers-color-scheme') ?? '';
	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%theme%', cookieTheme || hintTheme || 'light')
	});
};

export const handle: Handle = sequence(hintsHandle, paraglideHandle, themeHandle);
