<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { setLocale, getLocale, locales, type Locale } from '$lib/paraglide/runtime';
	import { theme } from '$lib/stores/theme';
	import { m } from '$lib/paraglide/messages';
	import Icon from '$lib/components/icon.svelte';

	let { data, children } = $props();
	let themes = {
		light: m.light(),
		dark: m.dark()
	};

	let showScrollTop = $state(false);

	let locale = $state(getLocale());

	function handleScroll() {
		showScrollTop = window.pageYOffset > 128;
	}

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	$effect(() => {
		document.title = m.title();
	});

	onMount(() => {
		setLocale(data.locale as Locale);
		theme.set(data.theme);
	});
</script>

<svelte:window onscroll={handleScroll} />

<nav class="bg-muted text-muted-fg flex h-16 justify-between text-xs sm:text-sm">
	<div class="flex items-center justify-center pr-2 pl-4">
		<a class="hover:text-fg flex items-center gap-2 transition duration-150 ease-in-out" href="/">
			<Icon class="size-7 fill-current sm:size-8" style="max-height: 32px; max-width: 32px" />
			<p class="max-w-28 pb-1 text-sm font-semibold sm:max-w-none sm:text-base">{m.title()}</p>
		</a>
	</div>
	<div class="flex items-center justify-center gap-4 pr-4 pl-2">
		<div
			class="hover:text-fg p-i flex flex-col items-center justify-center gap-0 transition duration-150 ease-in-out sm:flex-row sm:gap-1.5"
		>
			<label for="locale">{m.language()}: </label>
			<select
				id="locale"
				class:pr-1={locale === 'en'}
				value={locale}
				onchange={(e) => setLocale((e.target as HTMLSelectElement).value as Locale)}
			>
				{#each locales as locale (locale)}
					<option value={locale}>{locale}</option>
				{/each}
			</select>
		</div>
		<div
			class="hover:text-fg flex flex-col items-center justify-center gap-0 transition duration-150 ease-in-out sm:flex-row sm:gap-1.5"
		>
			<label for="theme">{m.theme()}: </label>
			<select
				id="theme"
				class:pr-1={$theme === 'light'}
				value={$theme}
				onchange={(e) => theme.set((e.target as HTMLSelectElement).value)}
			>
				{#each Object.entries(themes) as [value, label] ([value, label])}
					<option {value}>{label}</option>
				{/each}
			</select>
		</div>
	</div>
</nav>

{@render children()}

<button
	onclick={scrollToTop}
	class="bg-secondary/50 text-secondary-fg hover:bg-secondary/70 fixed right-4 bottom-4 cursor-pointer rounded-full p-2 shadow-lg transition-opacity duration-300 sm:p-3"
	class:opacity-0={!showScrollTop}
	class:opacity-100={showScrollTop}
	style="pointer-events: {showScrollTop ? 'auto' : 'none'}"
	aria-label="Scroll to top"
>
	<svg
		viewBox="0 0 24 24"
		class="block h-4 w-4 sm:h-5 sm:w-5"
		xmlns="http://www.w3.org/2000/svg"
		stroke="currentColor"
		fill="none"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
	>
		<polyline points="6 15 12 9 18 15" />
	</svg>
</button>
