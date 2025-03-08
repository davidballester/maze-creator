<script lang="ts">
	import { LucideBadge, LucideBadgeCheck } from 'lucide-svelte';

	let {
		title,
		enabled,
		setEnabled
	}: { title: string; enabled: boolean; setEnabled: (enabled: boolean) => void } = $props();
</script>

<button
	class="flex w-full cursor-pointer flex-row gap-2 text-base"
	onclick={() => setEnabled(!enabled)}
>
	{#if enabled}
		<LucideBadgeCheck />
	{:else}
		<LucideBadge />
	{/if}
	{title}
</button>
