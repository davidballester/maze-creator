import pkg from 'lz-string';
const { compressToEncodedURIComponent, decompressFromEncodedURIComponent } = pkg;
import type { Maze } from './maze';

export function compressToURIComponent(maze: Maze, shift: number = 0): string {
	const stringifiedMaze = JSON.stringify(maze);
	const shiftedStringifiedMaze = applyShift(stringifiedMaze, shift);
	return compressToEncodedURIComponent(shiftedStringifiedMaze);
}

export function decompressFromURIComponent(maze: string, shift: number = 0): Maze {
	const shiftedStringifiedMaze = decompressFromEncodedURIComponent(maze);
	const stringifiedMaze = applyShift(shiftedStringifiedMaze, shift);
	return JSON.parse(stringifiedMaze);
}

function applyShift(string: string, shift: number): string {
	return string
		.split('')
		.map((char) => String.fromCharCode(char.charCodeAt(0) + shift))
		.join('');
}
