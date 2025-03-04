export type WallBoolean = 0 | 1;
// North, East, South, West
export type MazeCell = [WallBoolean, WallBoolean, WallBoolean, WallBoolean];
export interface MazeCellCoordinates {
	i: number;
	j: number;
}
export interface Maze {
	title: string;
	cells: MazeCell[][];
	startingCell: MazeCellCoordinates;
	endingCell: MazeCellCoordinates;
}
