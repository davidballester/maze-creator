<script lang="ts">
	import ExploreCell from '$lib/components/explore/exploreCell.svelte';
	import { getAdjacents, getCell, go, type Adjacent, type Maze } from '$lib/maze';
	import type { Orientation } from '$lib/orientation';
	import { fade } from 'svelte/transition';
	import type { PageProps } from './$types';
	import MovementsLeft from '$lib/components/explore/movementsLeft.svelte';
	import SoundIndicator from '$lib/components/explore/soundIndicator.svelte';
	import { generateMaze } from '$lib/randomMazeGenerator';
	import { playUnlockSoundEffect } from '$lib/unlockSoundEffect';

	const transitionDuration = 200;

	let { data }: PageProps = $props();
	const mazeSeed = data.mazeSeed;
	const maze: Maze = generateMaze(mazeSeed);
	let showCell: boolean = $state(true);
	let currentCellCoordinates = $state(maze.startingCell);
	let currentCell = $derived({ ...getCell({ maze, cellCoordinates: currentCellCoordinates }) });
	let adjacent: { [orientation in Orientation]: Adjacent } = $derived.by(() =>
		getAdjacents({ maze, cellCoordinates: currentCellCoordinates })
	);
	let movementsLeft: number = $state(maze.timer.maxMoves);
	let isFinalCell = $derived(
		currentCellCoordinates.i === maze.endingCell.i && currentCellCoordinates.j === maze.endingCell.j
	);
	let disableNavigation: boolean = $derived(
		(maze.timer.enabled && movementsLeft <= 0) || isFinalCell
	);
	let isGameOver = $derived(disableNavigation && !isFinalCell);

	function goInDirection(direction: Orientation): void {
		const landingCoordinates = go({ maze, from: currentCellCoordinates, direction });
		if (!landingCoordinates) {
			return;
		}
		movementsLeft -= 1;
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

	<div class="mt-8 flex grow-1 flex-col items-center">
		{#if maze.timer.enabled}
			<div class="mb-4 flex flex-row items-center gap-3">
				{#if maze.timer.display}
					<MovementsLeft {movementsLeft} />
				{/if}
				<SoundIndicator progress={1 - movementsLeft / maze.timer.maxMoves} />
			</div>
		{/if}
		{#if showCell}
			<div
				transition:fade={{ duration: transitionDuration }}
				class={disableNavigation && !isFinalCell ? 'blur-md' : ''}
			>
				<ExploreCell
					cell={currentCell}
					go={goInDirection}
					{adjacent}
					{disableNavigation}
					onUnlock={() => {
						playUnlockSoundEffect();
						currentCell.interaction!.blocksDirection = {};
						currentCellCoordinates = { ...currentCellCoordinates };
					}}
				/>
			</div>
		{/if}
		{#if isGameOver}
			<div
				transition:fade
				class="absolute top-[30%] left-[50%] translate-x-[-50%] text-center text-3xl md:text-5xl"
			>
				Your journey ends here
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
