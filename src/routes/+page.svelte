<script lang="ts">
	import { session } from '$lib/stores/session';
	import { onDestroy } from 'svelte';
	import { goto } from '$app/navigation';
	let currentSession: any = null;

	const unsubscribe = session.subscribe((value) => {
		currentSession = value;
	});

	onDestroy(() => unsubscribe());
</script>

<main class="flex min-h-[calc(100dvh-61px)] flex-col items-center justify-center">
	<h1 class="mb-8 text-4xl font-bold">Conference 2025</h1>
	<div class="space-x-4">
		{#if currentSession}
			<a href="/profile" class="primary"> Profile </a>
		{:else}
			<a href="/login" class="notify"> Login </a>
		{/if}
		<a href="/buy-ticket" class="success"> Buy Ticket </a>
	</div>
</main>

<div class="bg-bg my-8 space-x-4 p-8">
	<button class="primary">Primary</button>
	<button class="secondary">Secondary</button>
	<button class="notify">Notify</button>
	<button class="success">Success</button>
	<button class="warning">Warning</button>
	<button class="error">Error</button>
</div>

<div class="bg-muted space-x-4 p-8">
	<button class="primary">Primary</button>
	<button class="secondary">Secondary</button>
	<button class="notify">Notify</button>
	<button class="success">Success</button>
	<button class="warning">Warning</button>
	<button class="error">Error</button>
</div>
