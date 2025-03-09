<script lang="ts">
	import { getRandomSeed, type Maze } from '$lib/maze';
	import { generateMaze } from '$lib/randomMazeGenerator';
	import MazeCreation from '$lib/components/create/mazeCreation.svelte';
	import { onMount } from 'svelte';

	let maze: Maze = $state({
		seed: getRandomSeed(),
		title: '',
		timer: {
			enabled: false,
			display: false,
			maxMoves: 0
		},
		cells: [],
		startingCell: { i: 0, j: 0 },
		endingCell: { i: 0, j: 0 },
		width: 8,
		height: 8
	});

	onMount(() => {
		maze = {
			...maze,
			...generateMaze(maze)
		};
	});
</script>

<MazeCreation bind:maze />
