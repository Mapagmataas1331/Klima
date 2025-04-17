<script lang="ts">
	import { session, type Session } from '$lib/stores/session';
	import { onDestroy } from 'svelte';

	let currentSession: Session | null = null;

	const unsubscribe = session.subscribe((value) => {
		currentSession = value;
	});

	onDestroy(() => unsubscribe());
</script>

<main class="flex min-h-[calc(100dvh-64px)] flex-col items-center justify-center">
	<h1 class="mb-8 text-4xl font-bold">Conference 2025</h1>
	<div class="space-x-4">
		{#if currentSession}
			<a href="/profile" class="primary"> Profile </a>
		{:else}
			<a href="/login" class="primary"> Login </a>
		{/if}
		<a href="/buy-ticket" class="secondary"> Buy Ticket </a>
	</div>
</main>

<div class="card m-4 size-16"></div>

<div class="bg-bg my-2 flex flex-col items-center justify-center space-x-4 p-8">
	<div class="text-muted-fg">text</div>
	<div class="text-fg">text</div>
	<a href="/zxc" class="link">link</a>
	<a href="/" class="link">link</a>
	<button class="primary m-2">Primary</button>
	<button class="secondary m-2">Secondary</button>
	<button class="notify m-2">Notify</button>
	<button class="success m-2">Success</button>
	<button class="warning m-2">Warning</button>
	<button class="error m-2">Error</button>
</div>

<div class="bg-muted my-2 flex flex-col items-center justify-center space-x-4 p-8">
	<div class="text-muted-fg">text</div>
	<div class="text-fg">text</div>
	<a href="/zxc" class="link">link</a>
	<a href="/" class="link">link</a>
	<button class="primary m-2">Primary</button>
	<button class="secondary m-2">Secondary</button>
	<button class="notify m-2">Notify</button>
	<button class="success m-2">Success</button>
	<button class="warning m-2">Warning</button>
	<button class="error m-2">Error</button>
</div>
