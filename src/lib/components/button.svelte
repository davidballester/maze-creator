<script lang="ts">
	let { children, ...restProps } = $props();
</script>

<button
	class="w-full cursor-pointer rounded-sm bg-stone-100 pt-2 pr-4 pb-2 pl-4 text-center text-base text-stone-950 transition-all hover:bg-stone-300"
	{...restProps}
>
	{@render children()}
</button>
