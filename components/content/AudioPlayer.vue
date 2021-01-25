
<template>
	<div class="audio-player" :class="{ dark: dashboardDark }">
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
// import {
// 	AUDIO_PROGRESS,
// 	AUDIO_DURATION,
// 	AUDIO_IS_PLAYING,
// 	AUDIO_SCROLLABLE,
// 	IS_INTRO,
// } from '~/model/constants'
import { MMSS } from '~/utils/HHMMSS'

export default {
	mixins: [VueHowler],
	components: {
		AudioSpectrumBars,
	},
	props: {
		title: { type: String, default: '' },
	},
	computed: {
		...mapState('utils', ['dashboardDark', '__prod__']),
		currentTime() {
			return MMSS(this.duration * this.progress)
		},
	},
	watch: {},
}
</script>