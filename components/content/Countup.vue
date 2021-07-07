<template>
	<div class="countup">
		<div>Going up!</div>
		<div class="countup__count">{{ currentCount }}</div>
	</div>
</template>

<script>
import BezierEasing from 'bezier-easing'

export default {
	name: 'countup',
	data: () => ({
		progress: 0,
		maxCount: 127,
		ease: BezierEasing(1, 0, 0.5, 1),
		speed: 400
	}),
	computed: {
		currentCount() {
			return Math.ceil(
				Math.min(this.ease(this.progress) * this.maxCount, this.maxCount)
			)
		}
	},
	methods: {
		doCount() {
			// main base case
			if (this.progress >= 1) {
				this.$emit('done')
				return
			}

			window.requestAnimationFrame(this.doCount)
			this.progress += 1 / this.speed
		}
	},
	mounted() {
		requestAnimationFrame(this.doCount)
	}
}
</script>
