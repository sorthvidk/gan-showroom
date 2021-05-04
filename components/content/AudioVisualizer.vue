<template>
	<div class="audio-visualizer" @click="onClick">
		<pre
			ref="text-measurement"
			style="position: absolute; visibility: hidden"
			>{{ string }}</pre
		>
		<text-cursor
			:text="
				!audioIsSetup
					? 'Click to play'
					: 'Ganni would like to invite you to the digital preview of our PS 2022 collection. The club is open. Click to type your password'
			"
		/>
		<pre :style="{ backgroundImage: `url(${imageUrl})` }">{{ output }}</pre>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import imageUrl from '~/static/img/login-slide.jpg'
// import audioUrl from '~/static/audio/1-03-Come-As-You-Are.mp3'
import TextCursor from '~/components/elements/TextCursor.vue'

export default {
	name: 'audio-visualizer',
	components: { TextCursor },
	props: {
		audioArray: {
			type: Float32Array,
		},
	},
	data: () => ({
		imageUrl,
		audioUrl: '/audio/1-03-Come-As-You-Are.mp3',
		string: 'GANNI NIGHT OUT',
		maxLinesAmount: null,
		Audio: new Audio(),
		AudioContext: null,
		audioIsSetup: false,
		analyser: null,
	}),
	computed: {
		...mapState('user', ['screenSize']),
		output() {
			return Array(this.maxLinesAmount).fill(this.string).join('\n')
		},
	},
	watch: {
		screenSize() {
			this.calculateLines()
		},
	},
	methods: {
		calculateLines() {
			this.maxLinesAmount = Math.ceil(
				this.screenSize.height /
					parseInt(getComputedStyle(this.$refs['text-measurement']).height)
			)
		},
		tick() {
			requestAnimationFrame(this.tick)
			console.log(this.audioArray)
		},
		setupAudio() {
			this.Audio.src = this.audioUrl
			this.AudioContext = new AudioContext()
			this.analyser = this.AudioContext.createAnalyser()

			this.analyser.connect(this.AudioContext.destination)
			this.analyser.fftSize = 256
			this.analyser.smoothingTimeConstant = 0.95
			const dataArray = new Uint8Array(this.analyser.frequencyBinCount)
			this.Audio.play()
		},
		playAudio() {},
		onClick() {
			if (!this.audioIsSetup) {
				this.setupAudio()
				this.audioIsSetup = true
			} else {
				this.$emit('done')
			}
		},
	},
	mounted() {
		this.calculateLines()
	},
	beforeDestroy() {
		this.Audio.pause()
		this.Audio.remove()
	},
}
</script>