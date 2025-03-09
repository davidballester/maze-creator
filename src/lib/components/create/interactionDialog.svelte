<script lang="ts">
	import type { Adjacent, Interaction } from '$lib/maze';
	import type { Orientation } from '$lib/orientation';
	import { LucideDoorClosed, LucideDoorOpen } from 'lucide-svelte';
	import Button from '../ui/button.svelte';
	import Dialog from '../ui/dialog.svelte';
	import TextArea from '../ui/textArea.svelte';
	import Input from '../ui/input.svelte';
	import { slide } from 'svelte/transition';

	let {
		initialInteraction,
		adjacents,
		onDelete,
		onSave
	}: {
		initialInteraction: Interaction;
		adjacents: { [direction in Orientation]: Adjacent };
		onDelete: () => void;
		onSave: (interaction: Interaction) => void;
	} = $props();

	let interaction = $state({
		...initialInteraction,
		blocksDirection: { ...(initialInteraction.blocksDirection ?? {}) }
	});
	let isEmptyInteraction = $derived(
		!interaction.text &&
			!interaction.password &&
			Object.values(interaction.blocksDirection).every((x) => !x)
	);
	let missingPassword: boolean = $derived(
		!interaction.password?.trim() && Object.values(interaction.blocksDirection).some((x) => x)
	);
</script>

{#snippet blockDirectionButton(direction: Orientation)}
	{#key interaction.blocksDirection[direction]}
		<Button
			disabled={adjacents[direction] !== 'none'}
			onclick={() =>
				(interaction.blocksDirection[direction] = !interaction.blocksDirection[direction])}
			toggled={interaction.blocksDirection[direction]}
		>
			<div class="flex flex-row items-center justify-center gap-2">
				<div class="hidden sm:block">
					{#if interaction.blocksDirection[direction]}
						<LucideDoorClosed size={16} />
					{:else}
						<LucideDoorOpen size={16} />
					{/if}
				</div>
				<span class="capitalize">{direction}</span>
			</div>
		</Button>
	{/key}
{/snippet}

<Dialog>
	<div class="flex flex-col items-start gap-4">
		<h3 class="text-xl font-bold">Interaction</h3>

		<div class="w-full">
			<TextArea
				label="Text"
				type="string"
				value={interaction?.text}
				onchange={(evt: any) => {
					interaction.text = evt.currentTarget.value;
				}}
			/>
		</div>

		<div class="w-full">
			<span class="text-md mb-2 block font-bold">Block directions</span>
			<div class="grid grid-cols-3 grid-rows-3 gap-1">
				<div></div>
				{@render blockDirectionButton('north')}
				<div></div>
				{@render blockDirectionButton('west')}
				<div></div>
				{@render blockDirectionButton('east')}
				<div></div>
				{@render blockDirectionButton('south')}
				<div></div>
			</div>
		</div>

		{#if Object.values(interaction.blocksDirection).some((x) => x)}
			<div transition:slide>
				<Input
					label="Password"
					helperText="Password required to progress through closed doors"
					type="string"
					value={interaction?.password || ''}
					onchange={(evt: any) => {
						interaction.password = evt.currentTarget.value;
					}}
					onblur={() => (interaction.password = interaction.password?.trim())}
					error={missingPassword}
				/>
			</div>
		{/if}

		<div class="w-full border-t border-stone-400"></div>

		<footer class="flex flex-row items-center justify-end gap-4 self-end">
			<Button onclick={onDelete}>Delete</Button>
			<Button
				onclick={() => (isEmptyInteraction ? onDelete() : onSave(interaction))}
				variant="main"
				disabled={missingPassword}
			>
				Save
			</Button>
		</footer>
	</div>
</Dialog>
