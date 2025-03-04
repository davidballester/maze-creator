<script lang="ts">
	let { children } = $props();
</script>

<div class="min-h-screen bg-stone-950 text-stone-100">
	<div class="flex justify-center align-top">
		<div class="w-full sm:max-w-sm md:max-w-lg lg:max-w-xl xl:max-w-2xl">
			{@render children()}
		</div>
	</div>
</div>
