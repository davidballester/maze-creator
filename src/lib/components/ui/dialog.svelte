<script lang="ts">
	let { children } = $props();
</script>

<div class="fixed top-0 left-0 z-10 h-screen w-screen bg-stone-950 opacity-30 blur-sm"></div>
<div class="fixed top-0 left-0 z-20 flex h-screen w-screen flex-col items-center justify-center">
	<div class="w-xs rounded-xs border border-stone-600 bg-stone-900 p-8 md:w-md">
		{@render children()}
	</div>
</div>
