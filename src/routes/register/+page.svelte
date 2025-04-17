<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	import { goto } from '$app/navigation';

	let name = '';
	let email = '';
	let password = '';
	let error = '';
	let message = '';

	async function register() {
		const { error: signUpError } = await supabase.auth.signUp({
			email,
			password,
			options: {
				emailRedirectTo: 'https://etiquette-conf.ru/login?confirmed=true',
				data: { name }
			}
		});
		if (signUpError) {
			error = signUpError.message;
		} else {
			message = 'Registration successful! Please check your email for confirmation.';
			goto('/login?confirmed=false');
		}
	}
</script>

<main class="flex min-h-[calc(100dvh-64px)] flex-col items-center justify-center">
	<h1 class="mb-4 text-3xl font-bold">Register</h1>
	<form
		on:submit|preventDefault={register}
		class="bg-muted text-muted-fg mb-4 w-full max-w-md rounded px-8 pt-6 pb-8 shadow-md"
	>
		<div class="mb-4">
			<label for="name" class="mb-2 block text-sm font-bold">Name</label>
			<input
				id="name"
				type="text"
				bind:value={name}
				placeholder="Enter your full name"
				class="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
				required
			/>
		</div>
		<div class="mb-4">
			<label for="email" class="mb-2 block text-sm font-bold">Email</label>
			<input
				id="email"
				type="email"
				bind:value={email}
				placeholder="you@example.com"
				class="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
				required
			/>
		</div>
		<div class="mb-6">
			<label for="password" class="mb-2 block text-sm font-bold">Password</label>
			<input
				id="password"
				type="password"
				bind:value={password}
				placeholder="Enter your password"
				class="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
				required
			/>
		</div>
		{#if error}
			<p class="text-error-fg mb-4 text-sm italic">{error}</p>
		{/if}
		{#if message}
			<p class="text-success mb-4 text-sm italic">{message}</p>
		{/if}
		<div class="flex items-center justify-between">
			<button type="submit" class="primary"> Register </button>
			<a href="/login" class="hover:text-fg text-right text-base"> Already have an account? </a>
		</div>
	</form>
</main>
