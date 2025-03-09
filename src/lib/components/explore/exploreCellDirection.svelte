<script lang="ts">
	import type { Adjacent } from '$lib/maze';
	import type { Orientation } from '$lib/orientation';
	import { fade } from 'svelte/transition';
	import ExploreCellGoDirection from './exploreCellGoDirection.svelte';
	import PasswordDialog from './passwordDialog.svelte';

	let {
		adjacent,
		direction,
		go,
		disableNavigation,
		password,
		isBlocked,
		onUnlock
	}: {
		adjacent: Adjacent;
		direction: Orientation;
		go: () => void;
		disableNavigation: boolean;
		password?: string;
		isBlocked: boolean;
		onUnlock: () => void;
	} = $props();
	let showPasswordInput: boolean = $state(false);
</script>

{#if adjacent === 'none' && !disableNavigation}
	<ExploreCellGoDirection
		orientation={direction}
		onclick={() => (isBlocked && password ? (showPasswordInput = true) : go())}
		{isBlocked}
	/>
{:else if adjacent === 'start' || adjacent === 'end'}
	<div class="text-center text-xl capitalize">
		{adjacent}
	</div>
{/if}
{#if showPasswordInput}
	<div transition:fade>
		<PasswordDialog
			password={password!}
			onDesist={() => (showPasswordInput = false)}
			onUnlock={() => {
				showPasswordInput = false;
				onUnlock();
			}}
		/>
	</div>
{/if}
