<script lang="ts">
	import Button from '../ui/button.svelte';
	import Dialog from '../ui/dialog.svelte';
	import Input from '../ui/input.svelte';

	let {
		password,
		onUnlock,
		onDesist
	}: { password: string; onUnlock: () => void; onDesist: () => void } = $props();
	let input: string = $state('');
	let error: boolean = $state(false);

	function validatePassword() {
		error = false;
		if (input === password) {
			onUnlock();
		} else {
			error = true;
		}
	}
</script>

<Dialog>
	<div class="flex w-full flex-col gap-2">
		<Input
			label="Enter the password"
			value={input}
			onchange={(evt: any) => {
				input = evt.currentTarget.value;
			}}
			{error}
		/>
		<footer class="flex flex-row items-center justify-end gap-4 self-end">
			<Button onclick={onDesist}>Desist</Button>
			<Button onclick={validatePassword} variant="main">Try</Button>
		</footer>
	</div>
</Dialog>
