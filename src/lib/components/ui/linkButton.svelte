<script lang="ts">
	let { class: clazz = '', children, ...restProps } = $props();
</script>

<a
	class={`w-full cursor-pointer rounded-sm bg-stone-100 pt-2 pr-4 pb-2 pl-4 text-center text-base text-stone-950 transition-all hover:bg-stone-300 ${clazz}`}
	{...restProps}
>
	{@render children()}
</a>
