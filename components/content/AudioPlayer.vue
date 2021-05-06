<template>
	<div
		class="audio-player"
		:class="{ dark: dashboardDark, invert: audioPlayerDark }"
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
// import VueHowler from 'vue-howler'
import AudioSpectrumBars from '~/components/content/AudioSpectrumBars.vue'
import { MMSS } from '~/utils/HHMMSS'

export default {
	// mixins: [VueHowler],
	components: {
		AudioSpectrumBars,
	},
	props: {
		title: { type: String, default: '' },
		src: { type: String },
		// titles: { type: Array, default: () => [] },
	},
	data: () => ({
		wasPlaying: true,
		playing: true,
		duration: 234,
		progress: 0.5,
	}),
	computed: {
		...mapState('utils', ['dashboardDark', '__prod__', 'audioPlayerDark']),
		currentTime() {
			return MMSS(this.duration * this.progress)
		},
	},
	watch: {
		playing() {
			this.wasPlaying = this.playing
		},
		title() {
			setTimeout(() => {
				this.play()
			}, 100)
		},
		progress() {
			if (this.progress >= 0.99) {
				setTimeout(() => this.$emit('played-through'), 100)
			}
		},
	},
	methods: {
		togglePlayback() {
			console.log('toggle')
		},
	},
}
</script>
