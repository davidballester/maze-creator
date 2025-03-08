<script lang="ts">
	import heartbeat from '$lib/assets/heartbeat.ogg';
	import { onMount } from 'svelte';

	const MIN_VOLUME = 0.05;
	const MAX_VOLUME = 0.5;
	const MAX_DELAY_BETWEEN_BEATS_MS = 2e3;
	const MIN_DELAY_BETWEEN_BEATS_MS = 350;

	let { progress }: { progress: number } = $props();
	let audio: HTMLMediaElement;
	let volume = $derived.by(() => {
		if (progress === 0 || isNaN(progress)) {
			return MIN_VOLUME;
		}
		return MIN_VOLUME + (MAX_VOLUME - MIN_VOLUME) * progress;
	});
	let delayBetweenBeatsMs: number | null = $derived.by(() => {
		if (progress === 0 || progress === 1 || isNaN(progress)) {
			return null;
		}
		return (
			MIN_DELAY_BETWEEN_BEATS_MS +
			MAX_DELAY_BETWEEN_BEATS_MS -
			MAX_DELAY_BETWEEN_BEATS_MS * progress
		);
	});

	onMount(beat);

	async function beat() {
		if (!audio || delayBetweenBeatsMs === null) {
			await waitMs(500);
			return beat();
		}
		audio.volume = volume;
		audio.currentTime = 0;
		audio.play();
		await waitMs(delayBetweenBeatsMs);
		return beat();
	}

	async function waitMs(ms: number) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}
</script>

<audio src={heartbeat} class="hidden" bind:this={audio}></audio>
