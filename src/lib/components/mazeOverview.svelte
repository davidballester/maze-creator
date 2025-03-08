<script lang="ts">
	import type { Maze, MazeCellCoordinates } from '$lib/maze';
	import type { Orientation } from '$lib/orientation';
	import MazeOverviewCell from './mazeOverviewCell.svelte';

	let { maze, mazeSolution = [] }: { maze: Maze; mazeSolution: MazeCellCoordinates[] } = $props();

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
						<td>
							{#if i === 0}
								<MazeOverviewCell cell={[0, 0, 0, 0]} solutionOrientation={'east'} />
							{/if}
						</td>
						{#each rowCells as cell, j}
							<MazeOverviewCell {cell} solutionOrientation={getSolutionOrientation({ i, j })} />
						{/each}
						<td>
							{#if i === maze.cells.length - 1}
								<MazeOverviewCell cell={[0, 0, 0, 0]} solutionOrientation={'east'} />
							{/if}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	<div class="text-center">
		<p><strong>Solution length</strong>: {mazeSolution.length}</p>
	</div>
</div>
