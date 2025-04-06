<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	import { goto } from '$app/navigation';
	let email = '';
	let password = '';
	let error = '';

	async function login() {
		const { error: loginError } = await supabase.auth.signInWithPassword({ email, password });
		if (loginError) {
			error = loginError.message;
		} else {
			goto('/profile');
		}
	}
</script>

<main class="flex min-h-[calc(100dvh-61px)] flex-col items-center justify-center">
	<h1 class="mb-4 text-3xl font-bold">Login</h1>
	<form
		on:submit|preventDefault={login}
		class="mb-4 w-full max-w-md rounded bg-white px-8 pt-6 pb-8 shadow-md"
	>
		<div class="mb-4">
			<label for="email" class="mb-2 block text-sm font-bold text-gray-700">Email</label>
			<input
				id="email"
				type="email"
				bind:value={email}
				class="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
				required
			/>
		</div>
		<div class="mb-6">
			<label for="password" class="mb-2 block text-sm font-bold text-gray-700">Password</label>
			<input
				id="password"
				type="password"
				bind:value={password}
				class="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
				required
			/>
		</div>
		{#if error}
			<p class="mb-4 text-xs text-red-500 italic">{error}</p>
		{/if}
		<div class="flex items-center justify-between">
			<button
				type="submit"
				class="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
			>
				Sign In
			</button>
			<a
				href="/register"
				class="inline-block align-baseline text-sm font-bold text-blue-500 hover:text-blue-800"
			>
				Register
			</a>
		</div>
	</form>
</main>
