
<template>
	<div class="audio-player">
		<div>
			<button @click="togglePlayback">
				<svg
					v-if="playing"
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
		<div>{{ title }}</div>
		<p class="audio-player__time">{{ currentTime }}</p>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import VueHowler from 'vue-howler'
import { AUDIO_PROGRESS, AUDIO_PLAYING, AUDIO_DONE } from '~/model/constants'
import { HHMMSS } from '~/utils/HHMMSS'

export default {
	mixins: [VueHowler],
	props: {
		title: { type: String, default: 'Artist - Song name' },
	},
	computed: {
		...mapState('audio', ['scrollProgress']),
		...mapState('user', ['loggedIn']),
		currentTime() {
			return HHMMSS(this.duration * this.progress)
		},
	},
	watch: {
		progress() {
			this[AUDIO_PROGRESS.action](this.progress)

			if (this.progress >= 0.97) {
				this[AUDIO_DONE.action]()
			}
		},
		scrollProgress() {
			if (typeof this.scrollProgress === 'number') {
				this.setProgress(this.scrollProgress)
			}
		},
		playing() {
			this[AUDIO_PLAYING.action](this.playing)
		},
	},
	methods: {
		...mapActions('audio', [
			AUDIO_PROGRESS.action,
			AUDIO_PLAYING.action,
			AUDIO_DONE.action,
		]),
	},
}
</script>