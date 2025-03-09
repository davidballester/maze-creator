import unlockSoundEffect from '$lib/assets/unlock.mp3';

export function playUnlockSoundEffect() {
	const audio = document.createElement('audio');
	audio.style.display = 'none';
	document.body.appendChild(audio);
	audio.volume = 0.5;
	audio.muted = false;
	audio.src = unlockSoundEffect;
	audio.addEventListener('ended', () => audio.remove());
	audio.addEventListener('error', () => audio.remove());
	audio.play();
}
