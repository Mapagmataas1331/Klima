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

<main class="flex min-h-screen flex-col items-center justify-center bg-gray-100">
	<h1 class="mb-4 text-3xl font-bold">Register</h1>
	<form
		on:submit|preventDefault={register}
		class="mb-4 w-full max-w-md rounded bg-white px-8 pt-6 pb-8 shadow-md"
	>
		<!-- Name -->
		<div class="mb-4">
			<label for="name" class="mb-2 block text-sm font-bold text-gray-700">Name</label>
			<input
				id="name"
				type="text"
				bind:value={name}
				placeholder="Enter your full name"
				class="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
				required
			/>
		</div>
		<!-- Email -->
		<div class="mb-4">
			<label for="email" class="mb-2 block text-sm font-bold text-gray-700">Email</label>
			<input
				id="email"
				type="email"
				bind:value={email}
				placeholder="you@example.com"
				class="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
				required
			/>
		</div>
		<!-- Password -->
		<div class="mb-6">
			<label for="password" class="mb-2 block text-sm font-bold text-gray-700">Password</label>
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
			<p class="mb-4 text-xs text-red-500 italic">{error}</p>
		{/if}
		{#if message}
			<p class="mb-4 text-xs text-green-500 italic">{message}</p>
		{/if}
		<div class="flex items-center justify-between">
			<button
				type="submit"
				class="focus:shadow-outline rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700 focus:outline-none"
			>
				Register
			</button>
			<a
				href="/login"
				class="inline-block align-baseline text-sm font-bold text-blue-500 hover:text-blue-800"
			>
				Already have an account?
			</a>
		</div>
	</form>
</main>
