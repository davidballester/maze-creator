<script lang="ts">
	import { slide } from 'svelte/transition';
	import Input from '../ui/input.svelte';
	import Checkbox from '../ui/checkbox.svelte';

	let {
		timerEnabled,
		setTimerEnabled,
		maxMoves,
		setMaxMoves,
		minMaxMoves,
		display,
		setDisplay
	}: {
		timerEnabled: boolean;
		setTimerEnabled: (timerEnabled: boolean) => void;
		maxMoves: number;
		setMaxMoves: (maxMoves: number) => void;
		minMaxMoves: number;
		display: boolean;
		setDisplay: (display: boolean) => void;
	} = $props();
</script>

<div class="flex w-full flex-col gap-3">
	<Checkbox
		title="Limit number of movements"
		enabled={timerEnabled}
		setEnabled={(timerEnabled) => setTimerEnabled(timerEnabled)}
	/>
	{#if timerEnabled}
		<div transition:slide>
			<Input
				label="Max moves"
				type="number"
				value={maxMoves}
				onchange={(evt: any) => setMaxMoves(parseInt(evt.currentTarget.value))}
				min={minMaxMoves}
				onblur={() => setMaxMoves(Math.max(minMaxMoves, maxMoves))}
			/>
			<Checkbox
				title="Display to explorers"
				enabled={display}
				setEnabled={(display) => setDisplay(display)}
			/>
		</div>
	{/if}
</div>
