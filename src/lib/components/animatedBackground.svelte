<script lang="ts">
	const ballStyles = new Array(10)
		.fill(null)
		.map((_, i) => {
			const isEven = i % 2 === 0;
			const mutiplier = isEven ? 1 : -1;
			return {
				top: `${20 + Math.round(Math.random() * 60)}%`,
				left: `${20 + Math.round(Math.random() * 60)}%`,
				animation: 'move linear infinite',
				'animation-duration': `${120 + Math.round(Math.random() * 60)}s`,
				'animation-delay': `${Math.round(Math.random() * 30) * -1}s`,
				'transform-origin': `${Math.round(Math.random() * 20 * mutiplier)}vw ${Math.round(Math.random() * 20 * mutiplier)}vh`
			};
		})
		.map((style) =>
			Object.entries(style)
				.map(([key, value]) => `${key}: ${value};`)
				.join(' ')
		);
</script>

<div
	class="transparent pointer-events-none fixed top-0 left-0 h-screen w-screen overflow-hidden opacity-25"
>
	{#each ballStyles as ballStyle}
		<div
			class="absolute h-[15vmin] w-[15vmin] rounded-full backface-hidden odd:text-fuchsia-700 odd:shadow-[-15vmin_15vmin_15vmin_currentColor] even:text-pink-700 even:shadow-[15vmin_15vmin_15vmin_currentColor] md:h-[10vmin] md:w-[10vmin] md:shadow-[10vmin_10vmin_10vmin_currentColor] odd:md:shadow-[-10vmin_10vmin_10vmin_currentColor]"
			style={ballStyle}
		></div>
	{/each}
</div>

<style>
	@keyframes -global-move {
		100% {
			transform: translate3d(0, 0, 1px) rotate(360deg) scale(3);
		}
	}
</style>
