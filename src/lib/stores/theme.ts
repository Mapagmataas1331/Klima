import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const systemTheme =
	browser && window.matchMedia
		? window.matchMedia('(prefers-color-scheme: dark)').matches
			? 'dark'
			: 'light'
		: 'light';

function getThemeFromCookies(): string | null {
	if (!browser) return null;
	const match = document.cookie.match(/(?:^|; )theme=([^;]*)/);
	return match?.[1] || null;
}

function setThemeCookie(theme: string) {
	if (!browser) return;
	document.cookie = `theme=${theme}; Path=/; Max-Age=31536000`;
}

const initialTheme = getThemeFromCookies() ?? systemTheme;
export const theme = writable<string>(initialTheme);

theme.subscribe((value) => {
	if (!browser) return;
	document.body.dataset.theme = value;
	setThemeCookie(value);
});
