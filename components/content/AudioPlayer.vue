
<template>
	<div class="audio-player" :class="{ dark: dashboardDark }">
		<button @click="togglePlayback">
			<svg-icon :name="playing ? 'pause' : 'play'" />
		</button>
		<p class="audio-player__name">{{ title }}</p>
		<p class="audio-player__time">{{ currentTime }}</p>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import VueHowler from 'vue-howler'
// import {
// 	AUDIO_PROGRESS,
// 	AUDIO_DURATION,
// 	AUDIO_IS_PLAYING,
// 	AUDIO_SCROLLABLE,
// 	IS_INTRO,
// } from '~/model/constants'
import { HHMMSS } from '~/utils/HHMMSS'

export default {
	mixins: [VueHowler],
	props: {
		title: { type: String, default: '' },
	},
	computed: {
		...mapState('utils', ['dashboardDark', '__prod__']),
		...mapState('audio', [
			// 'scrollProgress',
			// 'audioIsScrollable',
			// 'audioIsPlaying',
			// 'audioActivate',
		]),
		currentTime() {
			return HHMMSS(this.duration * this.progress)
		},
	},
	watch: {
		// progress(pro) {
		// this[AUDIO_PROGRESS.action](pro)
		// this.$emit('update:p', pro)
		// console.log('p', pro)
		// if (this.progress >= 0.99) {
		// 	this[IS_INTRO.action](false)
		// }
		// },
		// scrollProgress() {
		// 	if (typeof this.scrollProgress === 'number' && this.audioIsScrollable) {
		// 		this.setProgress(this.scrollProgress)
		// 	}
		// },
		// audioIsPlaying: {
		// 	immediate: true,
		// 	handler() {
		// 		this.$nextTick(() => {
		// 			console.log(this.audioIsPlaying)
		// 			if (this.audioIsPlaying) {
		// 				this.play()
		// 				this.setProgress(this.scrollProgress)
		// 			} else {
		// 				this.pause()
		// 			}
		// 		})
		// 	},
		// },
		// duration: {
		// 	immediate: true,
		// 	handler() {
		// 		this[AUDIO_DURATION.action](this.duration)
		// 	},
		// },
	},
	// methods: {
	// 	...mapActions('audio', [
	// 		AUDIO_PROGRESS.action,
	// 		AUDIO_DURATION.action,
	// 		AUDIO_IS_PLAYING.action,
	// 		AUDIO_SCROLLABLE.action,
	// 		IS_INTRO.action,
	// 	]),
	// 	toggle() {
	// 		// this[AUDIO_IS_PLAYING.action](!this.audioIsPlaying)
	// 	},
	// },
	// mounted() {
	// 	// if (!this.__prod__) {
	// 	// 	this[IS_INTRO.action]()
	// 	// }
	// },
}
</script>