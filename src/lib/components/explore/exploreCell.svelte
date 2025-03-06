<script lang="ts">
	import type { Adjacent, MazeCell } from '$lib/maze';
	import type { Orientation } from '$lib/orientation';
	import ExploreCellDirection from './exploreCellDirection.svelte';
	import './exploreCell.css';

	let {
		cell,
		go,
		adjacent
	}: {
		cell: MazeCell;
		go: (direction: Orientation) => void;
		adjacent: { [direction in Orientation]: Adjacent };
	} = $props();
	let walls: string = $derived.by(() => {
		const directions = ['north', 'east', 'south', 'west'];
		const walls = directions.filter((_, i) => cell[i]);
		return walls.join(' ');
	});
</script>

<table class={`${walls} aspect-square w-[66vw] max-w-xs md:w-[30vw]`}>
	<tbody>
		<tr class="h-[20%]">
			<td id="north-west" class="w-[20%]"></td>
			<td id="north" class="relative w-[60%]">
				<ExploreCellDirection adjacent={adjacent.north} direction="north" go={() => go('north')} />
			</td>
			<td id="north-east" class="w-[20%]"></td>
		</tr>
		<tr class="h-[60%]">
			<td id="west" class="relative w-[20%]">
				<ExploreCellDirection adjacent={adjacent.west} direction="west" go={() => go('west')} />
			</td>
			<td id="center" class="w-[60%]"></td>
			<td id="east" class="relative w-[20%]">
				<ExploreCellDirection adjacent={adjacent.east} direction="east" go={() => go('east')} />
			</td>
		</tr>
		<tr class="h-[20%]">
			<td id="south-west" class="w-[20%]"></td>
			<td id="south" class="relative w-[60%]">
				<ExploreCellDirection adjacent={adjacent.south} direction="south" go={() => go('south')} />
			</td>
			<td id="south-east" class="w-[20%]"></td>
		</tr>
	</tbody>
</table>
