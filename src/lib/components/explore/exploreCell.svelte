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

<table class={`${walls} m-auto w-full max-w-xs table-fixed md:w-[30vw]`}>
	<tbody>
		<tr class="h-[20%]">
			<td id="north-west" class="w-[20%]"></td>
			<td id="north" class="relative w-[60%]">
				<div class="min-h-[50px]">
					<ExploreCellDirection
						adjacent={adjacent.north}
						direction="north"
						go={() => go('north')}
						password={cell.interaction?.password}
						isBlocked={!!cell.interaction?.blocksDirection?.north}
						{onUnlock}
						{disableNavigation}
					/>
				</div>
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
			<td id="center" class="w-[60%]">
				<div class="min-h-[150px]"></div>
			</td>
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
				<div class="min-h-[50px]">
					<ExploreCellDirection
						adjacent={adjacent.south}
						direction="south"
						go={() => go('south')}
						password={cell.interaction?.password}
						isBlocked={!!cell.interaction?.blocksDirection?.south}
						{onUnlock}
						{disableNavigation}
					/>
				</div>
			</td>
			<td id="south-east" class="w-[20%]"></td>
		</tr>
	</tbody>
</table>

{#if cell.interaction?.text}
	<p class="mt-8 text-center text-xl md:mt-16">{cell.interaction.text}</p>
{/if}
