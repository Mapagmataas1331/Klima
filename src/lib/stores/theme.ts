import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const defaultTheme = 'light';

function getThemeFromCookies(): string {
	if (!browser) return defaultTheme;

	const match = document.cookie.match(/(?:^|; )theme=([^;]*)/);
	return match?.[1] || defaultTheme;
}

function setThemeCookie(theme: string) {
	if (!browser) return;
	document.cookie = `theme=${theme}; Path=/; Max-Age=31536000`; // 1 year
}

const initialTheme = getThemeFromCookies();
export const theme = writable(initialTheme);

theme.subscribe((value) => {
	if (!browser) return;
	document.body.dataset.theme = value;
	setThemeCookie(value);
});
