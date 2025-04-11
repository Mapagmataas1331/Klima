<script lang="ts">
	import { session, type Session } from '$lib/stores/session';
	import { goto } from '$app/navigation';
	import { onDestroy } from 'svelte';
	let currentSession: Session | null = null;

	const unsubscribe = session.subscribe((value) => {
		currentSession = value;
	});

	onDestroy(() => unsubscribe());

	async function buyTicket() {
		// Redirect to login if not authenticated
		if (!currentSession) {
			goto('/login');
		} else {
			// Proceed with the ticket purchase logic
			alert('Proceeding to ticket purchase...');
			// You can integrate payment logic here
		}
	}
</script>

<main class="flex min-h-[calc(100dvh-64px)] flex-col items-center justify-center">
	<h1 class="mb-4 text-3xl font-bold">Buy Ticket</h1>
	<button
		on:click={buyTicket}
		class="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
	>
		Buy Ticket
	</button>
</main>
