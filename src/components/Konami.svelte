<script lang="ts">
	import { elasticOut } from 'svelte/easing'
	import { fade, type TransitionConfig } from 'svelte/transition'
	import * as Fireworks from '$lib/fireworks/index.js'

	let playing = false

	// Konami Code
	let lastElevenKeyCodes = Array(11).fill('')
	let konamiCode = [
		'ArrowUp',
		'ArrowUp',
		'ArrowDown',
		'ArrowDown',
		'ArrowLeft',
		'ArrowRight',
		'ArrowLeft',
		'ArrowRight',
		'b',
		'a',
		'Enter',
	]

	const contra = `
	             _             
                | |            
  ___ ___  _ __ | |_ _ __ __ _ 
 / __/ _ \\| '_ \\| __| '__/ _' |
| (_| (_) | | | | |_| | | (_| |
 \\___\\___/|_| |_|\\__|_|  \\__,_|
`

	const konami = (event: KeyboardEvent) => {
		if (!playing) {
			lastElevenKeyCodes.push(event.key)
			lastElevenKeyCodes.shift()

			if (JSON.stringify(lastElevenKeyCodes) === JSON.stringify(konamiCode)) {
				console.log('O SHIIIIIIIIT')
				console.log(contra)
				toggleFireworks()
			}
		} else {
			toggleFireworks()
		}
	}

	const spin = (_node: Node, { duration }: TransitionConfig) => {
		return {
			duration,
			css: (t: number) => {
				const eased = elasticOut(t)

				return `
					transform: scale(${eased}) rotate(${eased * 1080}deg);
					color: hsl(
						${~~(t * 360)},
						${Math.min(100, 1000 - 1000 * t)}%,
						${Math.min(50, 500 - 500 * t)}%
					);`
			},
		}
	}

	function toggleFireworks() {
		playing = !playing
		playing ? Fireworks.start() : Fireworks.stop()
	}
</script>

<svelte:window on:keydown={konami} />

{#if playing}
	<button
		class="all-unset"
		on:click={toggleFireworks}
		on:keydown={(event) => event.key === 'Escape' && toggleFireworks()}
		in:fade={{ duration: 1000, delay: 6000 }}
		out:fade
	>
		<i class="close far fa-times-circle" />
	</button>
	<div class="youDidIt" in:spin={{ duration: 8000 }} out:fade>
		<p class="cursive">great job</p>
		<p class="rainbow">YOU DID IT</p>
	</div>
{/if}

<canvas id="canvas" class:playing>
	Canvas is not supported in your browser. You get nothing. You Lose. Good day sir.
</canvas>

<style lang="postcss">
	canvas {
		display: none;
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		cursor: crosshair;
	}
	.playing {
		display: block;
	}
	.youDidIt {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		display: grid;
		justify-content: center;
	}
	.cursive {
		font-family: cursive;
		font-size: 2em;
		align-self: end;
	}
	.cursive::after {
		color: white;
		mix-blend-mode: difference;
	}
	.rainbow {
		font-weight: bolder;
		font-size: 5em;
		margin-top: -50px;
		align-self: start;
		background-color: #efd002;
		background-clip: text;
		-webkit-background-clip: text;
		background-image: linear-gradient(162deg, red, orange, yellow, green, blue, indigo, violet);
		color: transparent;
		background-size: 1400% 1400%;
		-webkit-animation: AnimationName 2s ease infinite;
		-moz-animation: AnimationName 2s ease infinite;
		animation: AnimationName 2s ease infinite;
	}
	.close {
		z-index: 1;
		font-size: 2em;
		opacity: 50%;
		position: absolute;
		cursor: pointer;
		top: 60%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	@-webkit-keyframes AnimationName {
		0% {
			background-position: 0% 30%;
		}
		50% {
			background-position: 100% 71%;
		}
		100% {
			background-position: 0% 30%;
		}
	}
	@-moz-keyframes AnimationName {
		0% {
			background-position: 0% 30%;
		}
		50% {
			background-position: 100% 71%;
		}
		100% {
			background-position: 0% 30%;
		}
	}
	@keyframes AnimationName {
		0% {
			background-position: 0% 30%;
		}
		50% {
			background-position: 100% 71%;
		}
		100% {
			background-position: 0% 30%;
		}
	}
</style>
