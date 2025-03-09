<script lang="ts">
	type Variant = 'main' | 'default';
	let {
		children,
		variant = 'default',
		class: clazz = '',
		toggled = false,
		...restProps
	}: { variant?: Variant; class?: string; toggled?: boolean } & any = $props();
	const backgroundClasses = getBackgroundClasses({ variant, toggled });
	const textClasses = getTextClasses({ variant });

	function getBackgroundClasses({
		variant,
		toggled
	}: {
		variant: Variant;
		toggled: boolean;
	}): string {
		switch (variant) {
			case 'main': {
				return toggled
					? 'bg-stone-400 hover:bg-stone-200'
					: 'bg-stone-100 hover:bg-stone-400 disabled:hover:bg-stone-400';
			}
			default: {
				return toggled
					? 'bg-stone-700 hover:bg-stone-500'
					: 'bg-stone-800 hover:bg-stone-700 disabled:hover:bg-stone-800';
			}
		}
	}

	function getTextClasses({ variant }: { variant: Variant }): string {
		switch (variant) {
			case 'main': {
				return 'text-stone-800';
			}
			default: {
				return 'text-stone-100';
			}
		}
	}
</script>

<button
	class={`w-full cursor-pointer rounded-sm pt-2 pr-4 pb-2 pl-4 text-center text-base transition-all disabled:cursor-not-allowed disabled:opacity-50 ${backgroundClasses} ${textClasses} ${clazz}`}
	{...restProps}
>
	{@render children()}
</button>
