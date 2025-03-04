<script lang="ts">
	import type { Maze, MazeCell, MazeCellCoordinates } from '$lib/maze';
	import { getMazeSolution } from '$lib/mazeSolver';
	import MazeOverviewCell from './mazeOverviewCell.svelte';

	let { maze }: { maze: Maze } = $props();
	let mazeSolution: MazeCellCoordinates[] = $derived(
		getMazeSolution({
			maze
		})
	);

	function getSolutionOrientation({
		i,
		j
	}: MazeCellCoordinates): 'none' | 'north' | 'east' | 'south' | 'west' {
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

<div class="flex justify-center overflow-hidden p-2">
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
</div>
