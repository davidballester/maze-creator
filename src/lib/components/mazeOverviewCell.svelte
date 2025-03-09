<script lang="ts">
	import type { MazeCell } from '$lib/maze';
	import type { Orientation } from '$lib/orientation';
	import { LucideFootprints } from 'lucide-svelte';

	let { cell, solutionOrientation }: { cell: MazeCell; solutionOrientation: 'none' | Orientation } =
		$props();

	let borders = $derived.by(() => {
		const classes = [];
		const borders = [
			'border-t-stone-100',
			'border-r-stone-100',
			'border-b-stone-100',
			'border-l-stone-100'
		];
		const borderClasses = cell.walls.map((wall, i) => (wall ? borders[i] : '')).filter(Boolean);
		classes.push(...borderClasses);
		return classes.join(' ');
	});

	let rotationClass = $derived.by(() => {
		switch (solutionOrientation) {
			case 'east': {
				return 'rotate-90';
			}
			case 'south': {
				return 'rotate-180';
			}
			case 'west': {
				return 'rotate-270';
			}
			default: {
				return '';
			}
		}
	});
</script>

<td class={`${borders} border-6 border-transparent select-none`}>
	<div class="flex h-[24px] w-[24px] justify-center align-middle">
		{#if solutionOrientation !== 'none'}
			<div class={`${rotationClass}`}>
				<LucideFootprints size={20} />
			</div>
		{/if}
	</div>
</td>
