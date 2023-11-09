<script lang="ts">
	import MessageBubble from '$lib/message-bubble.svelte';
	import type { JSONMessage, Message } from '$lib/types';
	import { fly } from 'svelte/transition';

	let file: File | undefined;

	function onFileSelected(event: Event) {
		file = (event.target as HTMLInputElement).files?.[0];
		if (file) {
			const fileReader = new FileReader();
			fileReader.onload = () => {
				const text = fileReader.result as string;
				const json = JSON.parse(text);
				const keys = Object.keys(json);
				const last = keys[keys.length - 1];
				const parsedMessages = JSON.parse(last) as JSONMessage[];
				const relevantMessages = parsedMessages.slice(2, parsedMessages.length - 2);
				messages = relevantMessages.map((m, i) => {
					return {
						id: i,
						author: m.name ?? 'Moderator',
						text: m.content
					};
				});
			};
			fileReader.readAsText(file);
		}
	}

	let messages: Message[] = [];
</script>

<div class="h-screen w-screen bg-default flex items-center justify-center">
	{#if file}
		<div
			class="w-3/4 h-3/4 bg-white bg-opacity-95 rounded-2xl p-10 overflow-y-auto flex flex-col gap-y-8"
		>
			{#each messages as message, i}
				<div transition:fly={{ delay: 2000 * i }}>
					<MessageBubble {message} />
				</div>
			{/each}
		</div>
	{:else}
		<input
			class="flex h-10 max-w-3xl rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
			type="file"
			on:change={onFileSelected}
		/>
	{/if}
</div>
