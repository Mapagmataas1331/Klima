<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	import { session, type Session } from '$lib/stores/session';
	import { onDestroy } from 'svelte';
	let currentSession: Session | null = null;

	const unsubscribe = session.subscribe((value) => {
		currentSession = value;
	});

	onDestroy(() => unsubscribe());

	const logout = () => {
		supabase.auth.signOut();
		currentSession = null;
	};

	let tickets = ['Ticket #001', 'Ticket #002'];
</script>

<main class="flex min-h-[calc(100dvh-64px)] flex-col items-center justify-center">
	<h1 class="mb-4 text-3xl font-bold">Profile</h1>
	{#if currentSession}
		<p class="mb-4">Welcome, {currentSession.user.user_metadata.name}</p>
		<p class="mb-4">Your email: {currentSession.user.email}</p>
		<button class="error mb-8" on:click={logout}> Log out </button>
		<h2 class="mb-2 text-2xl font-semibold">Bought Tickets</h2>
		<ul class="list-disc pl-5">
			{#each tickets as ticket (ticket)}
				<li>{ticket}</li>
			{/each}
		</ul>
	{:else}
		<p>
			You are not logged in. Please <a href="/login" class="link">login</a>.
		</p>
	{/if}
</main>
