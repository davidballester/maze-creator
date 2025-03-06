<script lang="ts">
	import ExploreCell from '$lib/components/explore/exploreCell.svelte';
	import { getAdjacents, getCell, go, type Adjacent } from '$lib/maze';
	import type { Orientation } from '$lib/orientation';
	import { fade } from 'svelte/transition';
	import type { PageProps } from './$types';
	import LinkButton from '$lib/components/ui/linkButton.svelte';

	const transitionDuration = 200;

	let { data }: PageProps = $props();
	const maze = data.maze;
	let showCell: boolean = $state(true);
	let currentCellCoordinates = $state(maze.startingCell);
	let currentCell = $derived(getCell({ maze, cellCoordinates: currentCellCoordinates }));
	let adjacent: { [orientation in Orientation]: Adjacent } = $derived.by(() =>
		getAdjacents({ maze, cellCoordinates: currentCellCoordinates })
	);

	function goInDirection(direction: Orientation): void {
		const landingCoordinates = go({ maze, from: currentCellCoordinates, direction });
		if (!landingCoordinates) {
			return;
		}
		showCell = false;
		setTimeout(() => {
			currentCellCoordinates = landingCoordinates;
			showCell = true;
		}, transitionDuration);
	}
</script>

<div class="flex flex-1 flex-col items-center select-none">
	<header>
		<h1 class="text-center text-6xl">{maze.title || 'Maze'}</h1>
	</header>

	<div class="mt-8 flex grow-1 justify-center">
		{#if showCell}
			<div transition:fade={{ duration: transitionDuration }}>
				<ExploreCell cell={currentCell} go={goInDirection} {adjacent} />
			</div>
		{/if}
	</div>

	<a
		href="/"
		class="w-full cursor-pointer rounded-sm bg-stone-800 pt-2 pr-4 pb-2 pl-4 text-center text-base text-stone-100 transition-all hover:bg-stone-700"
	>
		Create your own maze
	</a>
</div>
