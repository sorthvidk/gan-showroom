
<template>
	<div>
		<div class="audio-player">
			<div>
				<button @click="toggle">
					<svg
						v-if="audioPlaying"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 30 30"
					>
						<path d="M11 9h3v12h-3zM16 9h3v12h-3z" />
					</svg>
					<svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
						<path d="M21.2 15.1l-10.1 6.1V9l10.1 6.1z" />
					</svg>
				</button>
			</div>
			<p class="audio-player__name">
				{{ title }}
			</p>
			<p class="audio-player__time">{{ currentTime }}</p>
		</div>
		<!-- <div class="audio-player__modal" v-if="!playing">
			<p>Click the page to start audio</p>
		</div> -->
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import VueHowler from 'vue-howler'
import {
	AUDIO_PROGRESS,
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
	},
	methods: {
		...mapActions('audio', [
			AUDIO_PROGRESS.action,
			AUDIO_PLAYING.action,
			AUDIO_SCROLLABLE.action,
			IS_INTRO.action,
		]),
		toggle() {
			this[AUDIO_PLAYING.action](!this.audioPlaying)
		},
	},
	mounted() {
		if (!this.audioActivate) {
			this[IS_INTRO.action]()
		}
	},
}
</script>