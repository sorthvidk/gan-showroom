
<template>
	<div :style="{ position: 'fixed', zIndex: 10 }">
		<!-- <div>Progress: {{ progress }}%</div>
		<div>Scroll: {{ scrollProgress }}</div>
		<div>
			<button @click="togglePlayback">{{ playing ? 'Pause' : 'Play' }}</button>
		</div>
		<div>
			<button @click="stop">Stop</button>
		</div> -->
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import VueHowler from 'vue-howler'
import { AUDIO_PROGRESS, AUDIO_PLAYING } from '~/model/constants'

export default {
	mixins: [VueHowler],
	computed: {
		...mapState('audio', ['scrollProgress']),
	},
	watch: {
		progress() {
			this[AUDIO_PROGRESS.action](this.progress)
		},
		scrollProgress() {
			this.setProgress(this.scrollProgress)
		},
		playing() {
			this[AUDIO_PLAYING.action](this.playing)
		},
	},
	methods: {
		...mapActions('audio', [AUDIO_PROGRESS.action, AUDIO_PLAYING.action]),
	},
	mounted() {
		console.log(this)
	},
}
</script>