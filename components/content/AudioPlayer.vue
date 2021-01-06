
<template>
	<div class="audio-player" :class="{ dark: dashboardDark }">
		<button @click="toggle">
			<svg-icon name="pause" v-if="audioPlaying" />
			<svg-icon name="play" v-else />
		</button>
		<p class="audio-player__name">
			{{ title }}
		</p>
		<p class="audio-player__time">{{ currentTime }}</p>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import VueHowler from 'vue-howler'
import {
	AUDIO_PROGRESS,
	AUDIO_DURATION,
	AUDIO_PLAYING,
	AUDIO_SCROLLABLE,
	IS_INTRO,
} from '~/model/constants'
import { HHMMSS } from '~/utils/HHMMSS'

export default {
	mixins: [VueHowler],
	props: {
		title: { type: String, default: '' },
	},
	computed: {
		...mapState('utils', ['dashboardDark', '__prod__']),
		...mapState('audio', [
			'scrollProgress',
			'audioIsScrollable',
			'audioPlaying',
			'audioActivate',
		]),
		currentTime() {
			return HHMMSS(this.duration * this.progress)
		},
	},
	watch: {
		progress() {
			this[AUDIO_PROGRESS.action](this.progress)

			if (this.progress >= 0.99) {
				this[IS_INTRO.action](false)
			}
		},
		scrollProgress() {
			if (typeof this.scrollProgress === 'number' && this.audioIsScrollable) {
				this.setProgress(this.scrollProgress)
			}
		},
		audioPlaying: {
			immediate: true,
			handler() {
				this.$nextTick(() => {
					if (this.audioPlaying) {
						this.play()
						this.setProgress(this.scrollProgress)
					} else {
						this.pause()
					}
				})
			},
		},
		duration: {
			immediate: true,
			handler() {
				this[AUDIO_DURATION.action](this.duration)
			},
		},
	},
	methods: {
		...mapActions('audio', [
			AUDIO_PROGRESS.action,
			AUDIO_DURATION.action,
			AUDIO_PLAYING.action,
			AUDIO_SCROLLABLE.action,
			IS_INTRO.action,
		]),
		toggle() {
			this[AUDIO_PLAYING.action](!this.audioPlaying)
		},
	},
	mounted() {
		if (!this.__prod__) {
			this[IS_INTRO.action]()
		}
	},
}
</script>