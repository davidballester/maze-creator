<script lang="ts">
	import MazeCreation from '$lib/components/create/mazeCreation.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	let maze = $state(data.maze);
</script>

<MazeCreation bind:maze />
