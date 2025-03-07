<script lang="ts">
	import { LucideChevronUp } from 'lucide-svelte';
	import type { Snippet } from 'svelte';
	import { slide } from 'svelte/transition';

	let { title, children, initial }: { title: string; children: Snippet<[]>; initial: boolean } =
		$props();

	let open: boolean = $state(initial);
</script>

<div
	class={`w-full rounded-xs border-b ${open ? 'border-transparent bg-stone-900' : 'border-stone-100 bg-transparent'} pt-2 pr-3 pb-2 pl-3 transition-all duration-200`}
>
	<button
		class="flex w-full cursor-pointer flex-row items-center pt-2 pb-2 text-left text-base font-bold outline-none"
		onclick={() => (open = !open)}
	>
		<span class="flex-1">
			{title}
		</span>
		<div class={`justify-self-end transition-all duration-200 ${open ? 'rotate-0' : 'rotate-180'}`}>
			<LucideChevronUp />
		</div>
	</button>
	{#if open}
		<div transition:slide class="mt-4 mb-4">
			{@render children()}
		</div>
	{/if}
</div>
