import type { Orientation } from './orientation';

export type WallBoolean = 0 | 1;
export interface MazeCellCoordinates {
	i: number;
	j: number;
}
export interface MazeCell extends MazeCellCoordinates {
	// North, East, South, West
	walls: [WallBoolean, WallBoolean, WallBoolean, WallBoolean];
	interaction?: Interaction;
}
export interface MazeSeed {
	title: string;
	width: number;
	height: number;
	seed: string;
	startingCell: MazeCellCoordinates;
	endingCell: MazeCellCoordinates;
	timer: {
		enabled: boolean;
		maxMoves: number;
		display: boolean;
	};
	interactions: InteractionSeed[];
}
interface InteractionSeed {
	globalCellIndex: number;
	interaction: Interaction;
}
export interface Maze extends MazeSeed {
	cells: MazeCell[][];
}
export type Adjacent = 'none' | 'wall' | 'start' | 'end';
export interface Interaction {
	text: string;
	blocksDirection?: { [direction in Orientation]?: boolean };
	password?: string;
}

export function getRandomSeed(): string {
	return String(Math.round(Math.random() * 1e9));
}

export function getMazeSeed(maze: Maze): MazeSeed {
	return {
		title: maze.title,
		width: maze.cells[0]?.length || 0,
		height: maze.cells.length,
		seed: maze.seed,
		startingCell: maze.startingCell,
		endingCell: maze.endingCell,
		timer: {
			...maze.timer
		},
		interactions: maze.cells
			.flat()
			.map((cell, index) => ({ globalCellIndex: index, interaction: cell.interaction }))
			.filter(({ interaction }) => !!interaction) as InteractionSeed[]
	};
}

export function fillFromSeed({ maze, mazeSeed }: { maze: Maze; mazeSeed: MazeSeed }): Maze {
	for (const interactionSeed of mazeSeed.interactions) {
		maze.cells.flat()[interactionSeed.globalCellIndex].interaction = interactionSeed.interaction;
	}
	return maze;
}

export function getCell({
	maze,
	cellCoordinates: { i, j }
}: {
	maze: Maze;
	cellCoordinates: MazeCellCoordinates;
}): MazeCell {
	return maze.cells[i][j];
}

export function go({
	maze,
	from,
	direction
}: {
	maze: Maze;
	from: MazeCellCoordinates;
	direction: Orientation;
}): MazeCellCoordinates | null {
	const landingCoordinates: MazeCellCoordinates = { ...from };
	switch (direction) {
		case 'north': {
			landingCoordinates.i -= 1;
			break;
		}
		case 'east': {
			landingCoordinates.j += 1;
			break;
		}
		case 'south': {
			landingCoordinates.i += 1;
			break;
		}
		case 'west': {
			landingCoordinates.j -= 1;
		}
	}
	if (!isValidCoordinates({ maze, coordinates: landingCoordinates })) {
		return null;
	}
	return landingCoordinates;
}

export function getAdjacents({
	maze,
	cellCoordinates
}: {
	maze: Maze;
	cellCoordinates: MazeCellCoordinates;
}): { [direction in Orientation]: Adjacent } {
	const cell = getCell({ maze, cellCoordinates });
	const adjacent = ['north', 'east', 'south', 'west'].reduce(
		(acc, direction, i) => ({
			...acc,
			[direction]: cell.walls[i] ? 'wall' : 'none'
		}),
		{} as { [orientation in Orientation]: Adjacent }
	);
	const isStartingCell =
		cellCoordinates.i === maze.startingCell.i && cellCoordinates.j === maze.startingCell.j;
	Object.entries(adjacent)
		.filter(([, whatIsThere]) => whatIsThere === 'none')
		.filter(
			([direction]) => !go({ maze, from: cellCoordinates, direction: direction as Orientation })
		)
		.forEach(([direction]) => {
			const d = direction as Orientation;
			adjacent[d] = isStartingCell ? 'start' : 'end';
		});
	return adjacent;
}

function isValidCoordinates({
	maze,
	coordinates
}: {
	maze: Maze;
	coordinates: MazeCellCoordinates;
}): boolean {
	return (
		coordinates.i >= 0 &&
		coordinates.i < maze.cells[0].length &&
		coordinates.j >= 0 &&
		coordinates.j < maze.cells.length
	);
}
