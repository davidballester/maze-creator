<script lang="ts">
	import type { Maze, MazeCell, MazeCellCoordinates } from '$lib/maze';
	import type { Orientation } from '$lib/orientation';
	import MazeOverviewCell from './mazeOverviewCell.svelte';

	let {
		maze,
		mazeSolution = [],
		onInteraction
	}: {
		maze: Maze;
		mazeSolution: MazeCellCoordinates[];
		onInteraction?: (cell: MazeCell) => void;
	} = $props();

	function getSolutionOrientation({ i, j }: MazeCellCoordinates): 'none' | Orientation {
		const mazeSolutionIndex = mazeSolution.findIndex((cell) => cell.i === i && cell.j === j);
		if (mazeSolutionIndex === -1) {
			return 'none';
		}
		const nextCell = mazeSolution[mazeSolutionIndex + 1] || {
			i: maze.cells.length,
			j: maze.cells[0].length + 1
		};
		if (nextCell.j > j) {
			return 'east';
		}
		if (nextCell.j < j) {
			return 'west';
		}
		if (nextCell.i > i) {
			return 'south';
		}
		return 'north';
	}
</script>

<div class="flex flex-col items-center gap-4 overflow-hidden p-2">
	<div class="w-content overflow-x-auto pt-4 pr-2 pb-4 pl-2">
		<table>
			<tbody>
				{#each maze.cells as rowCells, i}
					<tr>
						{#if i === 0}
							<MazeOverviewCell
								cell={{ i: 0, j: 0, walls: [0, 0, 0, 0] }}
								solutionOrientation={'east'}
							/>
						{:else}
							<td></td>
						{/if}
						{#each rowCells as cell, j}
							<MazeOverviewCell
								{cell}
								solutionOrientation={getSolutionOrientation({ i, j })}
								{onInteraction}
							/>
						{/each}
						{#if i === maze.cells.length - 1}
							<MazeOverviewCell
								cell={{ i, j: maze.cells[0].length - 1, walls: [0, 0, 0, 0] }}
								solutionOrientation={'east'}
							/>
						{:else}
							<td></td>
						{/if}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	<div class="text-center">
		<p class="pb-4 text-xs">Click on a cell to add custom interaction.</p>
		<p><strong>Solution length</strong>: {mazeSolution.length}</p>
	</div>
</div>
