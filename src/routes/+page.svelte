<script lang="ts">
	import { session, type Session } from '$lib/stores/session';
	import { onDestroy } from 'svelte';
	import { m } from '$lib/paraglide/messages';
	import { goto } from '$app/navigation';

	let currentSession: Session | null = null;

	const unsubscribe = session.subscribe((value) => {
		currentSession = value;
	});

	onDestroy(() => unsubscribe());
</script>

<main>
	<section class="flex min-h-[calc(100dvh-64px)] w-full flex-col items-center justify-between">
		<div></div>

		<div class="mx-8 my-4 flex max-w-2xl flex-col items-center justify-center text-center">
			<h1 class="mb-2 text-lg font-semibold italic sm:mb-4 sm:text-xl md:mb-6 md:text-2xl">
				{m.whatIsConference()}
			</h1>
			<p class="text-base sm:text-lg md:text-xl">
				{m.conferenceIs()}
			</p>
		</div>

		<div class="mx-4 flex flex-col items-center justify-center py-2">
			<h1 class="text-lg font-semibold italic sm:text-xl md:text-2xl">
				{m.latestConference()}
			</h1>
			<button
				onclick={() => goto('/conference/2025')}
				class="text-muted-fg hover:text-fg bg-muted mt-3 mb-4 cursor-pointer rounded-md shadow-sm transition duration-200 ease-in-out hover:scale-105"
			>
				<div
					class="flex flex-col items-center justify-center gap-2 px-6 py-4 pb-5 text-center hyphens-none sm:mt-6 sm:mb-8 sm:py-6 md:px-14 md:py-8 md:pb-10"
				>
					<div class="text-base font-semibold sm:text-xl md:text-2xl md:font-bold">
						{m['conference2025.title']()}
					</div>
					<div class="text-base italic sm:text-lg md:text-xl md:font-semibold">
						{m['conference2025.description']()}
					</div>
				</div>
			</button>
			<div class="space-x-4">
				{#if currentSession}
					<a href="/profile" class="primary">{m.profile()}</a>
				{:else}
					<a href="/login" class="primary">{m.login()}</a>
				{/if}
				<a href="/conference/2025" class="secondary">{m.buyTicket()}</a>
			</div>
		</div>

		<div class="group relative mx-4 my-4 flex cursor-s-resize flex-col items-center justify-center">
			<span class="mb-1 text-sm font-medium italic sm:mb-2 sm:text-base sm:font-semibold">
				{m.moreInfo()}
			</span>
			<svg
				class="h-6 w-6 animate-bounce stroke-[1.05px] sm:stroke-[1.5px]"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
			</svg>

			<div
				class="absolute bottom-full mb-2 w-max rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100"
			>
				{m.scrollHint()}
			</div>
		</div>

		<div></div>
	</section>

	<section class="flex min-h-dvh w-full flex-col items-center justify-between">
		<div></div>
		<div class="my-4 w-full pr-0 pl-6 sm:w-lg sm:px-4 md:w-xl">
			<h1 class="mb-2 text-lg font-semibold italic sm:mb-4 sm:text-xl md:mb-6 md:text-2xl">
				Зачем участвовать?
			</h1>
			<ul class="list-disc px-4 text-left text-base sm:text-lg md:text-xl">
				<li>Обмен опытом и лучшими практиками</li>
				<li>Развитие профессиональных стандартов</li>
				<li>Нетворкинг и новые контакты</li>
				<li>Возможность представить свои исследования и проекты</li>
			</ul>
		</div>

		<div class="my-4 w-full pr-0 pl-6 sm:w-lg sm:px-4 md:w-xl">
			<h1 class="mb-2 text-lg font-semibold italic sm:mb-4 sm:text-xl md:mb-6 md:text-2xl">
				Формат и структура
			</h1>
			<ul class="list-disc px-4 text-left text-base sm:text-lg md:text-xl">
				<li>Пленарные заседания</li>
				<li>Практические тренинги и мастер‑классы</li>
				<li>Дискуссионные панели и круглые столы</li>
				<li>Экскурсии и культурная программа</li>
			</ul>
		</div>

		<div class="my-4 w-full pr-0 pl-6 sm:w-lg sm:px-4 md:w-xl">
			<h1 class="mb-2 text-lg font-semibold italic sm:mb-4 sm:text-xl md:mb-6 md:text-2xl">
				Кому это интересно?
			</h1>
			<ul class="list-disc px-4 text-left text-base sm:text-lg md:text-xl">
				<li>Профессионалы и эксперты отрасли</li>
				<li>Преподаватели и исследователи</li>
				<li>Представители бизнеса и госструктур</li>
				<li>Все, кто хочет расширить круг знакомств и получить новые знания</li>
			</ul>
		</div>
		<div></div>
	</section>

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
</main>
