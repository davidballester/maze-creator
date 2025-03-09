import pkg from 'lz-string';
const { compressToEncodedURIComponent, decompressFromEncodedURIComponent } = pkg;
import type { MazeSeed } from './maze';

export function compressToURIComponent(maze: MazeSeed, shift: number = 0): string {
	const stringifiedMaze = JSON.stringify(maze);
	const shiftedStringifiedMaze = applyShift(stringifiedMaze, shift);
	return compressToEncodedURIComponent(shiftedStringifiedMaze);
}

export function decompressFromURIComponent(maze: string, shift: number = 0): MazeSeed {
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
