<script lang="ts">
	import type { MazeCell } from '$lib/maze';
	import footprintsImage from '$lib/assets/footprints.png';
	import type { Orientation } from '$lib/orientation';

	let { cell, solutionOrientation }: { cell: MazeCell; solutionOrientation: 'none' | Orientation } =
		$props();

	let borders = $derived.by(() => {
		const classes = [];
		const bordersPerDirection = ['t', 'r', 'b', 'l'];
		const borderClasses = cell
			.map((wall, i) => (wall ? bordersPerDirection[i] : ''))
			.filter(Boolean)
			.map((border) => `border-${border}-stone-100`);
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
	<!-- This will preload the dynamic Tailwind styles -->
	<div
		class="hidden rotate-90 rotate-180 rotate-270 border-t-stone-100 border-r-stone-100 border-b-stone-100 border-l-stone-100"
	></div>
	<div class="flex h-[24px] w-[24px] justify-center align-middle">
		{#if solutionOrientation !== 'none'}
			<img
				alt="steps"
				src={footprintsImage}
				class={`m-auto max-w-[unset] ${rotationClass}`}
				width="16"
				height="16"
			/>
		{/if}
	</div>
</td>
