<script lang="ts">
	import type { Maze, MazeCellCoordinates } from '$lib/maze';
	import { generateMaze } from '$lib/randomMazeGenerator';
	import { onMount } from 'svelte';
	import Input from '$lib/components/ui/input.svelte';
	import MazeOverview from '$lib/components/mazeOverview.svelte';
	import LinkButton from '$lib/components/ui/linkButton.svelte';
	import { compressToURIComponent } from '$lib/compress';
	import Accordion from '$lib/components/ui/accordion.svelte';
	import { getMazeSolution } from '$lib/mazeSolver';
	import MazeLayout from '$lib/components/create/mazeLayout.svelte';
	import MazeConfig from '$lib/components/create/mazeConfig.svelte';

	type AccordionItem = 'layout' | 'config' | null;

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
		endingCell: { i: 0, j: 0 },
		timer: {
			enabled: false,
			maxMoves: 0,
			display: false
		}
	});
	let mazeSolution: MazeCellCoordinates[] = $derived(
		getMazeSolution({
			maze
		})
	);
	let currentAccordionItem: AccordionItem = $state('layout');

	onMount(onGenerateMaze);

	function onGenerateMaze() {
		maze = {
			...maze,
			...generateMaze({ width, height })
		};
	}

	function toggleAccordion(accordionItem: AccordionItem): void {
		if (currentAccordionItem === accordionItem) {
			currentAccordionItem = null;
		} else {
			currentAccordionItem = accordionItem;
		}
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
		<Input
			label="Title"
			type="string"
			value={maze.title}
			onchange={(evt: any) => (maze.title = evt.currentTarget.value)}
		/>
		<Accordion
			title="Layout"
			open={currentAccordionItem === 'layout'}
			onToggle={() => toggleAccordion('layout')}
		>
			<MazeLayout
				{height}
				setHeight={(newHeight) => (height = newHeight)}
				minHeight={MIN_HEIGHT}
				maxHeight={MAX_HEIGHT}
				{width}
				setWidth={(newWidth) => (width = newWidth)}
				minWidth={MIN_WIDTH}
				maxWidth={MAX_WIDTH}
				onGenerate={onGenerateMaze}
			/>
		</Accordion>
		<Accordion
			title="Config"
			open={currentAccordionItem === 'config'}
			onToggle={() => toggleAccordion('config')}
		>
			<MazeConfig
				timerEnabled={maze.timer.enabled}
				setTimerEnabled={(timerEnabled) => {
					if (timerEnabled) {
						maze.timer.maxMoves = mazeSolution.length;
					}
					maze.timer.enabled = timerEnabled;
				}}
				maxMoves={maze.timer.maxMoves}
				minMaxMoves={mazeSolution.length}
				setMaxMoves={(maxMoves) => (maze.timer.maxMoves = maxMoves)}
				display={maze.timer.display}
				setDisplay={(display) => (maze.timer.display = display)}
			/>
		</Accordion>

		{#if maze}
			<div class="mt-4 flex flex-col gap-3">
				<MazeOverview {maze} {mazeSolution} />
				<LinkButton href={`/explore/${compressToURIComponent(maze)}`}>Explore</LinkButton>
			</div>
		{/if}
	</div>
</div>
