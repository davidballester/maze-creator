<script lang="ts">
	const { label, ...restProps } = $props();
	const id: string = $state(`input-${Math.round(Math.random() * 1e6)}`);
</script>

<div class="mb-3 justify-start align-middle">
	<label for={id} class="text-md font-bold">{label}</label>
	<input
		{id}
		{...restProps}
		class="mt-1 w-full rounded-xs border border-stone-700 pt-1 pr-3 pb-1 pl-3 outline-0 transition-all focus:border-stone-100"
	/>
</div>
