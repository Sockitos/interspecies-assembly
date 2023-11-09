<script lang="ts">
	import type { Message } from './types';

	export let message: Message;
	$: isModerator = message.author === 'Moderator';
	$: author = isModerator ? message.author : message.author.substring(25).replaceAll('_', ' ');
</script>

<div class="flex flex-col" class:items-end={isModerator}>
	{#if !isModerator}
		<p class="text-sm mb-2 ml-[5.5rem]">
			{author}
		</p>
	{/if}
	<div class="flex flex-row gap-x-6" class:flex-row-reverse={isModerator}>
		<div
			class="h-10 w-10 rounded-full flex justify-center items-center text-lg font-medium text-white"
			class:bg-[#00ACF2]={!isModerator}
			class:bg-[#009F00]={isModerator}
		>
			{author[0].toUpperCase()}
		</div>
		<p
			class="flex-1 px-6 py-4 max-w-2xl text-white whitespace-pre-wrap rounded-xl"
			class:rounded-tl-none={!isModerator}
			class:rounded-tr-none={isModerator}
			class:bg-[#00ACF2]={!isModerator}
			class:bg-[#009F00]={isModerator}
		>
			{message.text}
		</p>
	</div>
</div>
