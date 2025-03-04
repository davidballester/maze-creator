import type { Maze, WallBoolean } from './maze';

type MazeCellUnderContruction = {
	i: number;
	j: number;
	walls: [WallBoolean, WallBoolean, WallBoolean, WallBoolean];
	visited: boolean;
};
type MazeUnderConstruction = MazeCellUnderContruction[][];

export function generateMaze({ width, height }: { width: number; height: number }): Maze {
	if (width < 1 || height < 1) {
		throw new Error('invalid size');
	}
	const mazeUnderConstruction = generateInitialMaze({ width, height });
	getRandomUnvisitedCell({ maze: mazeUnderConstruction }).visited = true;
	while (!allCellsVisited({ maze: mazeUnderConstruction })) {
		const sourceCell = getRandomUnvisitedCell({ maze: mazeUnderConstruction });
		const walk = createRandomWalk({ maze: mazeUnderConstruction, sourceCell: sourceCell });
		for (let i = 1; i < walk.length; i++) {
			const prevCell = walk[i - 1];
			const nextCell = walk[i];
			removeWallsBetween({ sourceCell: prevCell, targetCell: nextCell });
			prevCell.visited = true;
			nextCell.visited = true;
		}
	}
	const maze: Maze = {
		title: '',
		cells: mazeUnderConstruction.map((row) => row.map(({ walls }) => walls)),
		startingCell: { i: 0, j: 0 },
		endingCell: { i: height - 1, j: width - 1 }
	};
	return maze;
}

function generateInitialMaze({
	width,
	height
}: {
	width: number;
	height: number;
}): MazeUnderConstruction {
	const maze: MazeUnderConstruction = [];
	for (let i = 0; i < height; i++) {
		const row: MazeCellUnderContruction[] = [];
		for (let j = 0; j < width; j++) {
			const mazeCellUnderContruction: MazeCellUnderContruction = {
				i,
				j,
				walls: [1, 1, 1, 1],
				visited: false
			};
			row.push(mazeCellUnderContruction);
		}
		maze.push(row);
	}
	// Initial cell open to the west
	maze[0][0].walls[3] = 0;
	// End cell open to the east
	maze.at(-1)!.at(-1)!.walls[1] = 0;
	return maze;
}

function getRandomUnvisitedCell({
	maze
}: {
	maze: MazeUnderConstruction;
}): MazeCellUnderContruction {
	const randomSort = () => Math.random() - 0.5;
	return getUnvisitedCells({ maze }).sort(randomSort).pop()!;
}

function getUnvisitedCells({ maze }: { maze: MazeUnderConstruction }): MazeCellUnderContruction[] {
	return maze
		.flat()
		.flat()
		.filter((cell) => !cell.visited);
}

function allCellsVisited({ maze }: { maze: MazeUnderConstruction }) {
	return getUnvisitedCells({ maze }).length === 0;
}

function createRandomWalk({
	maze,
	sourceCell
}: {
	maze: MazeUnderConstruction;
	sourceCell: MazeCellUnderContruction;
}): MazeCellUnderContruction[] {
	let walk: MazeCellUnderContruction[] = [];
	do {
		walk.push(sourceCell);
		const adjacentCells = getAdjacentCells({ maze, cell: sourceCell });
		sourceCell = shuffle(adjacentCells).pop()!;
		if (walk.includes(sourceCell)) {
			const indexOfSourceCell = walk.indexOf(sourceCell);
			walk = walk.slice(0, indexOfSourceCell);
		}
	} while (!sourceCell.visited);
	walk.push(sourceCell);
	return walk;
}

function getAdjacentCells({
	maze,
	cell
}: {
	maze: MazeUnderConstruction;
	cell: MazeCellUnderContruction;
}): MazeCellUnderContruction[] {
	const directions = [0, 1, 2, 3];
	return directions
		.map((direction) => go({ maze, cell, direction }) as MazeCellUnderContruction)
		.filter(Boolean);
}

function go({
	maze,
	cell,
	direction
}: {
	maze: MazeUnderConstruction;
	cell: MazeCellUnderContruction;
	direction: number;
}) {
	switch (direction) {
		case 0: {
			return maze[cell.i - 1]?.[cell.j];
		}
		case 1: {
			return maze[cell.i][cell.j + 1];
		}
		case 2: {
			return maze[cell.i + 1]?.[cell.j];
		}
		case 3: {
			return maze[cell.i][cell.j - 1];
		}
	}
}

function shuffle<T>(array: T[]): T[] {
	const randomSort = () => Math.random() - 0.5;
	return array.sort(randomSort);
}

function removeWallsBetween({
	sourceCell,
	targetCell
}: {
	sourceCell: MazeCellUnderContruction;
	targetCell: MazeCellUnderContruction;
}): void {
	const directionFromSource = getDirectionFrom({ sourceCell: sourceCell, targetCell: targetCell });
	sourceCell.walls[directionFromSource] = 0;
	const directionFromTarget = getDirectionFrom({
		sourceCell: targetCell,
		targetCell: sourceCell
	});
	targetCell.walls[directionFromTarget] = 0;
}

function getDirectionFrom({
	sourceCell,
	targetCell
}: {
	sourceCell: MazeCellUnderContruction;
	targetCell: MazeCellUnderContruction;
}): number {
	if (sourceCell.i === targetCell.i) {
		return sourceCell.j < targetCell.j ? 1 : 3;
	}
	return sourceCell.i < targetCell.i ? 2 : 0;
}
