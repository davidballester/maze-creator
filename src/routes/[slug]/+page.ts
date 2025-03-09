import type { PageLoad } from './$types';
import { decompressFromURIComponent } from '$lib/compress';
import { MAZE_CREATION_COMPRESSION_SHIFT } from '$lib/constants';

export const load: PageLoad = ({ params }) => {
	const mazeSeed = decompressFromURIComponent(params.slug, -MAZE_CREATION_COMPRESSION_SHIFT);
	return {
		mazeSeed
	};
};
