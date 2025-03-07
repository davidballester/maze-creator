<script lang="ts">
	import type { Maze } from '$lib/maze';
	import { generateMaze } from '$lib/randomMazeGenerator';
	import { onMount } from 'svelte';
	import Input from '$lib/components/ui/input.svelte';
	import Button from '$lib/components/ui/button.svelte';
	import MazeOverview from '$lib/components/mazeOverview.svelte';
	import LinkButton from '$lib/components/ui/linkButton.svelte';
	import { compressToURIComponent } from '$lib/compress';
	import Accordion from '$lib/components/ui/accordion.svelte';

	const MIN_WIDTH = 3;
	const MAX_WIDTH = 15;
	const MIN_HEIGHT = 3;
	const MAX_HEIGHT = 15;

	let width: number = $state(8);
	let height: number = $state(8);
	let maze: Maze = $state({
		cells: [],
		title: '',
		startingCell: { i: 0, j: 0 },
		endingCell: { i: 0, j: 0 }
	});

	onMount(onGenerateMaze);

	function onGenerateMaze() {
		maze = {
			...generateMaze({ width, height }),
			title: maze.title
		};
	}
</script>

<div class="w-full">
	<header class="mb-4">
		<h1 class="text-center text-6xl">Create a New Maze</h1>
	</header>
	<p class="p-4">
		Edit the maze and then explore it. You can share the exploration link with anyone for them to
		explore your maze!
	</p>
	<div class="mt-8 p-4">
		<Input label="Title" type="string" bind:value={maze.title} />
		<Accordion title="Layout" initial={true}>
			<Input
				label="Width"
				type="number"
				bind:value={width}
				onblur={() => (width = Math.max(MIN_WIDTH, Math.min(width, MAX_WIDTH)))}
				min={MIN_WIDTH}
				max={MAX_WIDTH}
			/>
			<Input
				label="Height"
				type="number"
				bind:value={height}
				onblur={() => (height = Math.max(MIN_HEIGHT, Math.min(height, MAX_HEIGHT)))}
				min={MIN_HEIGHT}
				max={MAX_HEIGHT}
			/>
			<Button onclick={onGenerateMaze}>Generate</Button>
		</Accordion>

		{#if maze}
			<div class="mt-4 flex flex-col gap-3">
				<MazeOverview {maze} />
				<LinkButton href={`/explore/${compressToURIComponent(maze)}`}>Explore</LinkButton>
			</div>
		{/if}
	</div>
</div>
