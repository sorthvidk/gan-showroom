
<template>
	<div
		v-show="!isAudioGallery"
		class="audio-player"
		:class="{ dark: dashboardDark }"
	>
		<button @click="togglePlayback">
			<svg-icon :name="playing ? 'pause' : 'play'" />
		</button>
		<p class="audio-player__name">{{ title }}</p>
		<p class="audio-player__time">{{ currentTime }}</p>
		<audio-spectrum-bars :animate="playing" />
	</div>
</template>

<script>
import { mapState } from 'vuex'
import VueHowler from 'vue-howler'
import AudioSpectrumBars from '~/components/content/AudioSpectrumBars.vue'
import { MMSS } from '~/utils/HHMMSS'

export default {
	mixins: [VueHowler],
	components: {
		AudioSpectrumBars,
	},
	props: {
		title: { type: String, default: '' },
		// titles: { type: Array, default: () => [] },
	},
	data: () => ({
		wasPlaying: true,
	}),
	computed: {
		...mapState(['dashboardContent']),
		...mapState('utils', ['dashboardDark', '__prod__']),
		isAudioGallery() {
			const hide =
				!this.dashboardContent ||
				this.dashboardContent.contentComponent === 'audio-gallery-controller'

			if (hide && this.playing) {
				this.pause()
				this.wasPlaying = true
			} else if (!hide && this.wasPlaying && this.playing) {
				this.play()
			}

			return hide
		},
		currentTime() {
			return MMSS(this.duration * this.progress)
		},
	},
	watch: {
		playing() {
			// console.log('playing', this.playing)
			this.wasPlaying = this.playing
		},
		title() {
			// console.log('new title', this.title)
			setTimeout(() => {
				this.play()
				// console.log('replay')
			}, 100)
		},
		progress() {
			// console.log('progress', this.progress)

			if (this.progress >= 0.99) {
				// if (this.progress >= 0.02) {
				setTimeout(() => this.$emit('played-through'), 100)
			}
		},
	},
}
</script>