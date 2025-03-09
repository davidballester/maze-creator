<script lang="ts">
	const {
		label,
		class: clazz,
		...restProps
	}: { label: string; class: string | undefined } & any = $props();
	const id: string = $state(`input-${Math.round(Math.random() * 1e6)}`);
</script>

<div class="mb-3 justify-start align-middle">
	<label for={id} class="text-md font-bold">{label}</label>
	<textarea
		rows={5}
		{id}
		{...restProps}
		class={`mt-1 w-full resize-none rounded-xs border border-stone-700 pt-1 pr-3 pb-1 pl-3 outline-0 transition-all focus:border-stone-100 ${clazz}`}
	></textarea>
</div>
