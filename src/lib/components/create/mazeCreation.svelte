<script lang="ts">
	import {
		getAdjacents,
		getMazeSeed,
		getRandomSeed,
		type Maze,
		type MazeCell,
		type MazeCellCoordinates,
		type MazeSeed
	} from '$lib/maze';
	import { generateMaze } from '$lib/randomMazeGenerator';
	import Input from '$lib/components/ui/input.svelte';
	import MazeOverview from '$lib/components/mazeOverview/mazeOverview.svelte';
	import LinkButton from '$lib/components/ui/linkButton.svelte';
	import { compressToURIComponent } from '$lib/compress';
	import Accordion from '$lib/components/ui/accordion.svelte';
	import { getMazeSolution } from '$lib/mazeSolver';
	import MazeLayout from '$lib/components/create/mazeLayout.svelte';
	import MazeConfig from '$lib/components/create/mazeConfig.svelte';
	import { MAZE_CREATION_COMPRESSION_SHIFT } from '$lib/constants';
	import { fade } from 'svelte/transition';
	import InteractionDialog from './interactionDialog.svelte';
	import Button from '../ui/button.svelte';
	import Dialog from '../ui/dialog.svelte';

	let { maze = $bindable() }: { maze: Maze } = $props();

	type AccordionItem = 'layout' | 'config' | null;

	const MIN_WIDTH = 3;
	const MAX_WIDTH = 15;
	const MIN_HEIGHT = 3;
	const MAX_HEIGHT = 15;

	let width: number = $state(maze.cells[0]?.length || 8);
	let height: number = $state(maze.cells.length || 8);
	let mazeSolution: MazeCellCoordinates[] = $derived(
		getMazeSolution({
			maze
		})
	);
	let mazeSeed: MazeSeed = $derived(getMazeSeed(maze));
	let currentAccordionItem: AccordionItem = $state('layout');
	let interactionDialogCell: MazeCell | undefined = $state(undefined);
	let showGenerateMazeConfirmationDialog: boolean = $state(false);

	function onGenerateMaze() {
		const mazeSeed = getMazeSeed(maze);
		mazeSeed.seed = getRandomSeed();
		mazeSeed.width = width;
		mazeSeed.height = height;
		mazeSeed.interactions = [];
		maze = generateMaze(mazeSeed);
	}

	function toggleAccordion(accordionItem: AccordionItem): void {
		if (currentAccordionItem === accordionItem) {
			currentAccordionItem = null;
		} else {
			currentAccordionItem = accordionItem;
		}
	}

	function updateURL() {
		window.history.replaceState(
			{},
			'',
			`${window.location.origin}/${compressToURIComponent(mazeSeed, MAZE_CREATION_COMPRESSION_SHIFT)}`
		);
	}

	function onInteraction(cell: MazeCell): void {
		cell.interaction ??= {
			text: ''
		};
		interactionDialogCell = cell;
	}
</script>

<div class="w-full">
	<header class="mb-4">
		<h1 class="p-2 text-center text-6xl">Create a New Maze</h1>
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
			onchange={(evt: any) => {
				maze.title = evt.currentTarget.value;
				updateURL();
			}}
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
				onGenerate={() => {
					showGenerateMazeConfirmationDialog = maze.cells
						.flat()
						.some(({ interaction }) => !!interaction);
					if (!showGenerateMazeConfirmationDialog) {
						onGenerateMaze();
						updateURL();
					}
				}}
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
					updateURL();
				}}
				maxMoves={maze.timer.maxMoves}
				minMaxMoves={mazeSolution.length}
				setMaxMoves={(maxMoves) => {
					maze.timer.maxMoves = maxMoves;
					updateURL();
				}}
				display={maze.timer.display}
				setDisplay={(display) => {
					maze.timer.display = display;
					updateURL();
				}}
			/>
		</Accordion>

		{#if maze}
			<div class="mt-4 flex flex-col gap-3">
				<MazeOverview {maze} {mazeSolution} {onInteraction} />
				<LinkButton href={`/explore/${compressToURIComponent(mazeSeed)}`} data-sveltekit-reload>
					Explore
				</LinkButton>
			</div>
		{/if}

		{#if interactionDialogCell}
			<div transition:fade={{ duration: 100 }}>
				<InteractionDialog
					initialInteraction={interactionDialogCell.interaction || { text: '' }}
					adjacents={getAdjacents({ maze, cellCoordinates: interactionDialogCell })}
					onSave={(interaction) => {
						interactionDialogCell!.interaction = interaction;
						interactionDialogCell = undefined;
						updateURL();
					}}
					onDelete={() => {
						interactionDialogCell!.interaction = undefined;
						interactionDialogCell = undefined;
						updateURL();
					}}
				/>
			</div>
		{/if}

		{#if showGenerateMazeConfirmationDialog}
			<div transition:fade={{ duration: 100 }}>
				<Dialog>
					<p class="mb-4">
						If you generate a new maze, the interactive cells you have created so far will be
						deleted. Are you sure?
					</p>
					<footer class="flex flex-row items-center justify-end gap-4 self-end">
						<Button
							onclick={() => {
								onGenerateMaze();
								updateURL();
								showGenerateMazeConfirmationDialog = false;
							}}
						>
							Yes
						</Button>
						<Button onclick={() => (showGenerateMazeConfirmationDialog = false)} variant="main">
							No
						</Button>
					</footer>
				</Dialog>
			</div>
		{/if}
	</div>
</div>
