import type { PageLoad } from './$types';
import { decompressFromURIComponent } from '$lib/compress';

export const load: PageLoad = ({ params }) => {
	const mazeSeed = decompressFromURIComponent(params.slug);
	return {
		mazeSeed
	};
};
