<template>
	<div
		class="preload-images"
		style="opacity: 0; pointer-events: none; position: fixed; top: -100000px, left: -100000px"
	>
		<img
			v-for="(src, i) in images"
			:key="'preload-image-' + i"
			:src="src"
			alt="An image that should be cached"
		/>
		<video
			v-for="(src, i) in videos"
			:key="'preload-video-' + i"
			:src="src"
			:muted="true"
		/>
	</div>
</template>
<script>
import { isVideo } from '~/utils/is-video'

export default {
	name: 'preload-images',
	props: {
		srcs: { type: Array, default: () => [] },
	},
	computed: {
		videos() {
			return this.srcs.filter(isVideo)
		},
		images() {
			return this.srcs.filter((src) => !this.videos.includes(src))
		},
	},
}
</script>