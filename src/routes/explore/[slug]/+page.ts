import type { PageLoad } from './$types';
import { decompressFromURIComponent } from '$lib/compress';

export const load: PageLoad = ({ params }) => {
	const maze = decompressFromURIComponent(params.slug);
	return {
		maze
	};
};
