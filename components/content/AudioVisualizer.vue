<template>
	<div
		class="audio-visualizer"
		@mouseover="
			changeCursor(
				'Ganni would like to invite you to the digital preview of our PS 2022 collection. The club is open. Click to type your password'
			)
		"
		@mouseleave="changeCursor('')"
		@click="$emit('clicked')"
	>
		<pre
			ref="text-measurement"
			style="position: absolute; visibility: hidden"
			>{{ string }}</pre
		>

		<div class="text" :style="{ backgroundImage: `url(${imageUrl})` }">
			<div class="column" v-for="(char, idx) in string" :key="char + idx">
				<span v-for="(line, idx) in normalizedArray[idx]" :key="idx">{{
					char.replace(' ', '&nbsp;') || '&nbsp;'
				}}</span>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { TEXT_CURSOR } from '~/model/constants'
import { nextIndex } from '~/utils/array-helpers'

export default {
	name: 'audio-visualizer',
	props: {
		// takes an array with length of 13, value range 0-1
		audioData: {
			type: Array,
			default: () => [],
		},
	},
	data: () => ({
		string: 'GANNI NIGHT OUT',
		maxLinesAmount: null,
		currentImageIndex: 0,
	}),
	computed: {
		...mapState('user', ['screenSize']),
		...mapState('utils', ['various']),
		normalizedArray() {
			return this.audioData.map((v) =>
				Math.max(1, Math.floor(v * 0.75 * this.maxLinesAmount))
			)
		},
		imageUrl() {
			return this.various.audioVisualizerBackground[this.currentImageIndex]
		},
	},
	watch: {
		screenSize() {
			this.calculateLines()
		},
	},
	methods: {
		...mapActions('utils', [TEXT_CURSOR.action]),
		calculateLines() {
			this.maxLinesAmount = Math.ceil(
				this.screenSize.height /
					parseInt(getComputedStyle(this.$refs['text-measurement']).height)
			)
		},
		changeCursor(str) {
			this[TEXT_CURSOR.action]({ str })
		},
	},
	mounted() {
		this.calculateLines()
		setInterval(() => {
			this.currentImageIndex = nextIndex(
				this.various.audioVisualizerBackground,
				this.currentImageIndex
			)
		}, 4000)
	},
	beforeDestroy() {
		this.changeCursor('')
	},
}
</script>