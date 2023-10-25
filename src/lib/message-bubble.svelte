<script lang="ts">
	import type { Message } from './types';

	export let message: Message;
	$: isAdmin = message.author === 'Admin' || message.author === 'Moderator';
	$: author = isAdmin ? message.author : message.author.substring(24).replaceAll('_', ' ');
</script>

<div class="flex flex-col" class:items-end={isAdmin}>
	{#if !isAdmin}
		<p class="text-sm mb-2 ml-[5.5rem]">
			{author}
		</p>
	{/if}
	<div class="flex flex-row gap-x-6" class:flex-row-reverse={isAdmin}>
		<div
			class="h-10 w-10 rounded-full flex justify-center items-center text-lg font-medium text-white"
			class:bg-[#00ACF2]={!isAdmin}
			class:bg-[#009F00]={isAdmin}
		>
			{author[0].toUpperCase()}
		</div>
		<p
			class="flex-1 px-6 py-4 max-w-2xl text-white whitespace-pre-wrap rounded-xl"
			class:rounded-tl-none={!isAdmin}
			class:rounded-tr-none={isAdmin}
			class:bg-[#00ACF2]={!isAdmin}
			class:bg-[#009F00]={isAdmin}
		>
			{message.text}
		</p>
	</div>
</div>
