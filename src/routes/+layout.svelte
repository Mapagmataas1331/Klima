<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { setLocale, getLocale, locales, type Locale } from '$lib/paraglide/runtime';
	import { theme } from '$lib/stores/theme';
	import { m } from '$lib/paraglide/messages';
	import Icon from '$lib/components/icon.svelte';

	let { data, children } = $props();
	let themes = { light: m.light(), dark: m.dark() };

	$effect(() => {
		document.title = m.title();
	});

	onMount(() => {
		setLocale(data.locale as Locale);
		theme.set(data.theme);
	});
</script>

<nav class="bg-muted text-muted-fg flex h-16 justify-between text-xs sm:text-sm">
	<div class="flex items-center justify-center pr-2 pl-4">
		<a class="hover:text-fg flex items-center gap-2 transition duration-150 ease-in-out" href="/">
			<Icon class="size-7 fill-current sm:size-8" />
			<p class="max-w-28 pb-0.5 text-sm font-semibold sm:max-w-none sm:text-base">{m.title()}</p>
		</a>
	</div>
	<div class="flex items-center justify-center gap-4 pr-4 pl-2">
		<div
			class="hover:text-fg p-i flex flex-col items-center justify-center gap-0 transition duration-150 ease-in-out sm:flex-row sm:gap-1.5"
		>
			<label for="locale">{m.language()}: </label>
			<select
				id="locale"
				value={getLocale()}
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
