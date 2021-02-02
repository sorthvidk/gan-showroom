
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
import { mapState, mapActions } from 'vuex'
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
			this.wasPlaying = this.playing
		},
	},
}
</script>