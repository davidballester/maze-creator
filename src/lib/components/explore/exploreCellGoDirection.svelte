<script lang="ts">
	import type { Orientation } from '$lib/orientation';
	import { LucideDoorClosed, LucideFootprints } from 'lucide-svelte';

	const {
		orientation,
		class: clazz = '',
		isBlocked,
		...restOfProps
	}: { orientation: Orientation; isBlocked: boolean } & any = $props();
	const rotationClass = $derived.by(() => {
		switch (orientation) {
			case 'north': {
				return '';
			}
			case 'east': {
				return 'rotate-90';
			}
			case 'south': {
				return 'rotate-180';
			}
			case 'west': {
				return 'rotate-270';
			}
		}
	});
</script>

<button
	class={`absolute top-0 left-0 flex h-full w-full cursor-pointer justify-center align-middle ${clazz}`}
	{...restOfProps}
>
	<div class={`m-auto ${isBlocked ? '' : rotationClass}`}>
		{#if isBlocked}
			<LucideDoorClosed size={40} />
		{:else}
			<LucideFootprints size={40} />
		{/if}
	</div>
</button>
