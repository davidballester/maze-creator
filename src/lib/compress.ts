import pkg from 'lz-string';
const { compressToEncodedURIComponent, decompressFromEncodedURIComponent } = pkg;
import type { Maze } from './maze';

export function compressToURIComponent(maze: Maze): string {
	return compressToEncodedURIComponent(JSON.stringify(maze));
}

export function decompressFromURIComponent(maze: string): Maze {
	return JSON.parse(decompressFromEncodedURIComponent(maze));
}
