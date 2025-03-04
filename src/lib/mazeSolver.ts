import type { Maze, MazeCellCoordinates } from './maze';

export function getMazeSolution({ maze }: { maze: Maze }): MazeCellCoordinates[] {
	const mazeWithVisited = new Array(maze.cells.length)
		.fill(null)
		.map(() => new Array(maze.cells[0].length).fill(false));
	const ans = solveRecursively({
		currentCellCoordinates: maze.startingCell,
		mazeWithVisited
	});
	return ans;

	function solveRecursively({
		currentCellCoordinates: currentCellCoordinates,
		mazeWithVisited
	}: {
		currentCellCoordinates: MazeCellCoordinates;
		mazeWithVisited: boolean[][];
	}): MazeCellCoordinates[] {
		if (
			currentCellCoordinates.i === maze.endingCell.i &&
			currentCellCoordinates.j === maze.endingCell.j
		) {
			return [currentCellCoordinates];
		}
		if (mazeWithVisited[currentCellCoordinates.i][currentCellCoordinates.j]) {
			return [];
		}
		mazeWithVisited[currentCellCoordinates.i][currentCellCoordinates.j] = true;
		const directions = [0, 1, 2, 3];
		const traversableDirections = directions.filter(
			(direction) => maze.cells[currentCellCoordinates.i][currentCellCoordinates.j][direction] === 0
		);
		const adjacentNodes = traversableDirections
			.map((direction) => go({ maze, cellCoordinates: currentCellCoordinates, direction }))
			.filter(Boolean) as MazeCellCoordinates[];
		for (const adjacentNode of adjacentNodes) {
			const partialSolution = solveRecursively({
				currentCellCoordinates: adjacentNode,
				mazeWithVisited
			});
			if (partialSolution.length) {
				return [currentCellCoordinates, ...partialSolution];
			}
		}
		return [];
	}
}

function go({
	maze,
	cellCoordinates: { i, j },
	direction
}: {
	maze: Maze;
	cellCoordinates: MazeCellCoordinates;
	direction: number;
}): MazeCellCoordinates | undefined {
	let newI: number = i;
	let newJ: number = j;
	switch (direction) {
		case 0: {
			newI = i - 1;
			break;
		}
		case 1: {
			newJ = j + 1;
			break;
		}
		case 2: {
			newI = i + 1;
			break;
		}
		default: {
			newJ = j - 1;
			break;
		}
	}
	return maze.cells[newI]?.[newJ] ? { i: newI, j: newJ } : undefined;
}
