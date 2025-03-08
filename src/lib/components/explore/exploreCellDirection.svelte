<script lang="ts">
	import type { Adjacent } from '$lib/maze';
	import type { Orientation } from '$lib/orientation';
	import ExploreCellGoDirection from './exploreCellGoDirection.svelte';

	let {
		adjacent,
		direction,
		go,
		disableNavigation
	}: { adjacent: Adjacent; direction: Orientation; go: () => void; disableNavigation: boolean } =
		$props();
</script>

{#if adjacent === 'none' && !disableNavigation}
	<ExploreCellGoDirection orientation={direction} onclick={go} />
{:else if adjacent === 'start' || adjacent === 'end'}
	<div class="text-center text-xl capitalize">
		{adjacent}
	</div>
{/if}
