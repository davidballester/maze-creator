<script lang="ts">
	import type { Maze } from '$lib/maze';
	import { generateMaze } from '$lib/randomMazeGenerator';
	import MazeCreation from '$lib/components/create/mazeCreation.svelte';
	import { onMount } from 'svelte';

	let maze: Maze = $state({
		title: '',
		timer: {
			enabled: false,
			display: false,
			maxMoves: 0
		},
		cells: [],
		startingCell: { i: 0, j: 0 },
		endingCell: { i: 0, j: 0 }
	});

	onMount(() => {
		maze = {
			...maze,
			...generateMaze({ width: 8, height: 8 })
		};
	});
</script>

<MazeCreation bind:maze />
