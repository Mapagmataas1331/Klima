<script>
	import { page } from '$app/state';
	import { m } from '$lib/paraglide/messages';

	const errorType = {
		isClientError: page.status >= 400 && page.status < 500,
		isServerError: page.status >= 500,
		isNotFound: page.status === 404
	};

	const errorTheme = errorType.isServerError
		? 'warning'
		: errorType.isNotFound
			? 'error'
			: page.status >= 400
				? 'notify'
				: 'primary';
</script>

<div class="hidden">
	<p class="text-warning-fg">warning</p>
	<p class="text-error-fg">error</p>
	<p class="text-notify-fg">notify</p>
	<p class="text-primary-fg">primary</p>
	<p class="fill-warning">warning</p>
	<p class="fill-error">error</p>
	<p class="fill-notify">notify</p>
	<p class="fill-primary">primary</p>
</div>

<div class="flex min-h-[calc(100dvh-64px)] flex-col items-center justify-center">
	<div class="card mx-4 w-full max-w-2xl">
		<div class="flex flex-col items-center space-y-8 p-6 text-center">
			<div class={`relative h-32 w-32 text-${errorTheme}-fg`}>
				{#if errorType.isNotFound}
					<svg class="h-full w-full" viewBox="0 0 100 100">
						<circle
							cx="50"
							cy="50"
							r="45"
							class="fill-{errorTheme}"
							fill="currentColor"
							opacity="0.5"
						/>
						<text
							x="50%"
							y="62%"
							text-anchor="middle"
							class="text-4xl font-bold text-{errorTheme}-fg"
							fill="currentColor">{page.status}</text
						>
					</svg>
				{:else if errorType.isServerError}
					<svg class="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				{:else}
					<svg class="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
						/>
					</svg>
				{/if}
			</div>

			<div class="space-y-4">
				<h1 class={`text-4xl font-bold text-${errorTheme}-fg`}>
					{page.status}
					{page.status === 404 ? 'Not Found' : errorType.isServerError ? 'Server Error' : 'Error'}
				</h1>
				<p class="text-muted-fg mx-auto max-w-prose text-lg">
					{#if errorType.isNotFound}
						{m.notFound()}
					{:else if errorType.isServerError}
						{m.serverError()}
					{:else}
						{page.error?.message || m.error()}
					{/if}
				</p>
			</div>

			<div class="flex flex-col justify-center gap-4 sm:flex-row">
				{#if errorType.isServerError}
					<button on:click={() => window.location.reload()} class="secondary">
						<svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
							/>
						</svg>
						{m.tryAgain()}
					</button>
				{/if}

				<a href="/" class="primary">
					<svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
						/>
					</svg>
					{m.goHome()}
				</a>
			</div>
		</div>
	</div>
</div>
