<script lang="ts">
	import { LucideCopyright, LucideGithub } from 'lucide-svelte';
	import '../app.css';
	import AnimatedBackground from '$lib/components/animatedBackground.svelte';
	let { children } = $props();
</script>

<svelte:head>
	<title>Maze Creator</title>
</svelte:head>

<div class=" bg-stone-950 text-stone-100">
	<AnimatedBackground />
	<div class="flex min-h-screen w-full flex-col items-center">
		<div
			class="flex w-full grow-1 flex-col items-center pt-4 pb-4 sm:max-w-sm md:max-w-lg lg:max-w-xl xl:max-w-2xl"
		>
			{@render children()}
		</div>
		<footer class="flex flex-col items-center gap-2 p-4 text-center">
			<a href="https://github.com/davidballester/maze-creator" class="mb-4">
				<LucideGithub class="mr-1 inline" />
				<span class="text-base">David Ballester Mena</span>
			</a>
			<a href="https://github.com/davidballester/maze-creator" class="mb-4">
				<LucideCopyright class="mr-1 inline" />
				<span>David Ballester Mena {new Date().getFullYear()}. All rights reserved.</span>
			</a>
			<a
				href="https://freesound.org/people/StarNinjas37/sounds/506909/"
				class="text-xs"
				target="_blank"
			>
				Heartbeat sound effect by StarNinjas37 - FreeSound.org
			</a>
			<a
				href="https://freesound.org/people/Cepagrave/sounds/476911/"
				class="text-xs"
				target="_blank"
			>
				Door unlocked effect effect by Cepagrave - FreeSound.org
			</a>
			<a
				href="https://freesound.org/people/Cepagrave/sounds/476911/"
				class="text-xs"
				target="_blank"
			>
				Door unlocked effect effect by Cepagrave - FreeSound.org
			</a>
			<a href="https://www.flaticon.com/free-icons/maze" class="text-xs" target="_blank">
				Favicon created by Freepik - Flaticon
			</a>
		</footer>
	</div>
</div>
