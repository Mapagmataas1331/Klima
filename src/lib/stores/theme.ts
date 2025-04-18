import { browser } from '$app/environment';
import { writable } from 'svelte/store';

function getThemeFromCookie(): string | null {
	if (!browser) return null;
	const match = document.cookie.match(/(?:^|; )theme=([^;]*)/);
	return match ? decodeURIComponent(match[1]) : null;
}

function setThemeCookie(theme: string) {
	if (!browser) return;
	document.cookie = `theme=${encodeURIComponent(theme)}; Path=/; Max-Age=${60 * 60 * 24 * 365}; SameSite=Lax`;
}

function getSystemTheme(): string {
	if (!browser || !window.matchMedia) return 'light';
	return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

const initialTheme = browser
	? document.documentElement.dataset.theme || getThemeFromCookie() || getSystemTheme()
	: 'light';

export const theme = writable<string>(initialTheme);

theme.subscribe((value) => {
	if (!browser) return;
	document.documentElement.setAttribute('data-theme', value);
	setThemeCookie(value);
});
