<script lang="ts">
	import type { Orientation } from '$lib/orientation';
	import { LucideFootprints } from 'lucide-svelte';

	const {
		orientation,
		class: clazz = '',
		...restOfProps
	}: { orientation: Orientation } & any = $props();
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
	<div class={`m-auto ${rotationClass}`}>
		<LucideFootprints size={40} />
	</div>
</button>
