<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { setLocale, getLocale, locales, type Locale } from '$lib/paraglide/runtime';
	import { theme } from '$lib/stores/theme';
	import { m } from '$lib/paraglide/messages';

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

<nav class="bg-muted text-muted-fg flex h-16 justify-between text-sm">
	<div class="flex items-center justify-center pr-2 pl-4">
		<a class="flex items-center gap-2" href="/">
			<img
				style="width: 32px; height: 32px;{$theme == 'dark' ? ' filter: invert(100%);' : ''}"
				src="/klima.svg"
				alt="icon"
			/>
			<p class="pb-0.5 text-base font-semibold">{m.title()}</p>
		</a>
	</div>
	<div class="flex items-center justify-center gap-2 pr-4 pl-2">
		<div>
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
		<div>
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
