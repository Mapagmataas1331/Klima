<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	import { session } from '$lib/stores/session';
	import { onDestroy } from 'svelte';
	let currentSession: any = null;

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

<main class="flex min-h-[calc(100dvh-61px)] flex-col items-center justify-center">
	<h1 class="mb-4 text-3xl font-bold">Profile</h1>
	{#if currentSession}
		<p class="mb-4">Welcome, {currentSession.user.user_metadata.name}</p>
		<p class="mb-4">Your email: {currentSession.user.email}</p>
		<button
			class="bg-error hover:bg-error-alt text-bg mb-4 cursor-pointer rounded px-4 py-1 font-semibold"
			on:click={logout}
		>
			Log out
		</button>
		<h2 class="mb-2 text-2xl font-semibold">Bought Tickets</h2>
		<ul class="list-disc pl-5">
			{#each tickets as ticket}
				<li>{ticket}</li>
			{/each}
		</ul>
	{:else}
		<p>
			You are not logged in. Please <a href="/login" class="text-blue-500 underline">login</a>.
		</p>
	{/if}
</main>
