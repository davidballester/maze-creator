<script lang="ts">
	import Button from '../ui/button.svelte';
	import Input from '../ui/input.svelte';

	let {
		width,
		maxWidth,
		minWidth,
		height,
		maxHeight,
		minHeight,
		setWidth,
		setHeight,
		onGenerate
	}: {
		width: number;
		maxWidth: number;
		minWidth: number;
		height: number;
		minHeight: number;
		maxHeight: number;
		setWidth: (width: number) => void;
		setHeight: (height: number) => void;
		onGenerate: () => void;
	} = $props();
</script>

<Input
	label="Width"
	type="number"
	value={width}
	onchange={(event: any) => setWidth(parseInt(event.currentTarget.value))}
	onblur={() => setWidth(Math.max(minWidth, Math.min(width, maxWidth)))}
	min={minWidth}
	max={maxWidth}
/>
<Input
	label="Height"
	type="number"
	value={height}
	onchange={(event: any) => setHeight(parseInt(event.currentTarget.value))}
	onblur={() => (height = Math.max(minHeight, Math.min(height, maxHeight)))}
	min={minHeight}
	max={maxHeight}
/>
<Button onclick={onGenerate}>Generate</Button>
