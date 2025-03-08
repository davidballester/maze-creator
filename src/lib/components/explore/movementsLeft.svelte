<script lang="ts">
	import { LucideCompass } from 'lucide-svelte';

	let { movementsLeft }: { movementsLeft: number } = $props();
</script>

<div class="flex flex-row items-center gap-3">
	<LucideCompass size={32} />
	<span>
		{`${movementsLeft} movement${movementsLeft > 1 || movementsLeft === 0 ? 's' : ''} left`}
	</span>
</div>
