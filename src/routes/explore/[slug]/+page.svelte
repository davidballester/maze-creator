<script lang="ts">
	import ExploreCell from '$lib/components/exploreCell.svelte';
	import { getAdjacents, getCell, go, type Adjacent } from '$lib/maze';
	import type { Orientation } from '$lib/orientation';
	import { fade } from 'svelte/transition';
	import type { PageProps } from './$types';

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

<div class="select-none">
	<header>
		<h1 class="text-center text-6xl">{maze.title || 'Maze'}</h1>
	</header>

	<div class="mt-8 flex justify-center">
		{#if showCell}
			<div transition:fade={{ duration: transitionDuration }}>
				<ExploreCell cell={currentCell} go={goInDirection} {adjacent} />
			</div>
		{/if}
	</div>
</div>
