<script lang="ts">
	import MazeCreation from '$lib/components/create/mazeCreation.svelte';
	import type { Maze } from '$lib/maze';
	import { generateMaze } from '$lib/randomMazeGenerator';
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();
	const mazeSeed = data.mazeSeed;
	let maze: Maze = $state(generateMaze(mazeSeed));
</script>

<MazeCreation bind:maze />
