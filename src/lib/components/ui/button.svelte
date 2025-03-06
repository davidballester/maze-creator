<script lang="ts">
	let { children, ...restProps } = $props();
</script>

<button
	class="w-full cursor-pointer rounded-sm bg-stone-800 pt-2 pr-4 pb-2 pl-4 text-center text-base text-stone-100 transition-all hover:bg-stone-700"
	{...restProps}
>
	{@render children()}
</button>
