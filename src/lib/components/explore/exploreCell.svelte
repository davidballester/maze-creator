<script lang="ts">
	import type { Adjacent, MazeCell } from '$lib/maze';
	import type { Orientation } from '$lib/orientation';
	import ExploreCellDirection from './exploreCellDirection.svelte';
	import './exploreCell.css';

	let {
		cell,
		go,
		adjacent,
		disableNavigation,
		onUnlock
	}: {
		cell: MazeCell;
		go: (direction: Orientation) => void;
		adjacent: { [direction in Orientation]: Adjacent };
		disableNavigation: boolean;
		onUnlock: () => void;
	} = $props();
	let walls: string = $derived.by(() => {
		const directions = ['north', 'east', 'south', 'west'];
		const walls = directions.filter((_, i) => cell.walls[i]);
		return walls.join(' ');
	});
</script>

<div class="flex w-full flex-col items-center gap-8 md:gap-16">
	<table class={`${walls} aspect-square w-[66vw] max-w-xs md:w-[30vw]`}>
		<tbody>
			<tr class="h-[20%]">
				<td id="north-west" class="w-[20%]"></td>
				<td id="north" class="relative w-[60%]">
					<ExploreCellDirection
						adjacent={adjacent.north}
						direction="north"
						go={() => go('north')}
						password={cell.interaction?.password}
						isBlocked={!!cell.interaction?.blocksDirection?.north}
						{onUnlock}
						{disableNavigation}
					/>
				</td>
				<td id="north-east" class="w-[20%]"></td>
			</tr>
			<tr class="h-[60%]">
				<td id="west" class="relative w-[20%]">
					<ExploreCellDirection
						adjacent={adjacent.west}
						direction="west"
						go={() => go('west')}
						password={cell.interaction?.password}
						isBlocked={!!cell.interaction?.blocksDirection?.west}
						{onUnlock}
						{disableNavigation}
					/>
				</td>
				<td id="center" class="w-[60%]"></td>
				<td id="east" class="relative w-[20%]">
					<ExploreCellDirection
						adjacent={adjacent.east}
						direction="east"
						go={() => go('east')}
						password={cell.interaction?.password}
						isBlocked={!!cell.interaction?.blocksDirection?.east}
						{onUnlock}
						{disableNavigation}
					/>
				</td>
			</tr>
			<tr class="h-[20%]">
				<td id="south-west" class="w-[20%]"></td>
				<td id="south" class="relative w-[60%]">
					<ExploreCellDirection
						adjacent={adjacent.south}
						direction="south"
						go={() => go('south')}
						password={cell.interaction?.password}
						isBlocked={!!cell.interaction?.blocksDirection?.south}
						{onUnlock}
						{disableNavigation}
					/>
				</td>
				<td id="south-east" class="w-[20%]"></td>
			</tr>
		</tbody>
	</table>

	{#if cell.interaction?.text}
		<p class="text-center text-xl">{cell.interaction.text}</p>
	{/if}
</div>
