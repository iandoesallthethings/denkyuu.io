<script lang="ts">
	import type { Project } from '$types'

	export let project: Project
	export let classes = ''

	$: altText = `${stripHtml(project.name)}: ${stripHtml(project.subtitle)}`

	function stripHtml(s: string) {
		return s?.replace(/<[^>]*>?/gm, '') ?? ''
	}
</script>

<a href="/{project.route}" draggable="false" class="group mask {classes}">
	{#if project.video}
		<video
			title={altText}
			class="w-full !object-cover"
			src={project.video}
			disableRemotePlayback={true}
			autoplay
			muted
			loop
			playsInline
		/>
	{:else}
		<img src={project.image || 'images/maybe.gif'} alt={altText} class="" />
	{/if}

	<div
		class="
			flex
			opacity-0 group-hover:opacity-100 transition
			absolute w-full h-full
			justify-center items-center
			font-bold text-xl break-words
			mix-blend-difference
		"
	>
		{@html project.name}
	</div>
</a>

<style lang="postcss">
	a {
		@apply relative bg-gray-900 flex flex-col items-center text-center rounded-lg shadow-xl overflow-hidden transition select-none;
		@apply w-24 max-h-24 min-h-[40px];
		@apply sm:w-48 sm:max-h-64 sm:min-h-[100px];
	}

	/* .mask {
		--mask: radial-gradient(
			closest-side,
			black 0,
			black 50%,
			rgba(0, 0, 0, 0.75) 80%,
			rgba(0, 0, 0, 0.5) 95%,
			rgba(0, 0, 0, 0.25) 98%,
			transparent 100%
		);
		-webkit-mask: var(--mask);
		mask: var(--mask);
		backdrop-filter: blur(10px);
	} */

	img {
		-webkit-user-drag: none;
		-khtml-user-drag: none;
		-moz-user-drag: none;
		-o-user-drag: none;
		user-drag: none;
	}
</style>
