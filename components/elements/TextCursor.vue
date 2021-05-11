<template>
	<div
		class="text-cursor"
		:class="{ hideDefaultCursor }"
		:style="{
			transform:
				lerpedPos.x &&
				`translate(calc(${lerpedPos.x}px - 50%), calc(${lerpedPos.y}px - 50%))`,
		}"
	>
		<svg-icon v-if="textCursor && textCursor.icon" :name="textCursor.icon" />
		<p v-if="textCursor && textCursor.str">{{ textCursor.str }}</p>
	</div>
</template>

<script>
import { mapState } from 'vuex'

function lerp(start, end, amt) {
	return (1 - amt) * start + amt * end
}

export default {
	name: 'text-cursor',
	data: () => ({
		lerpedPos: {
			x: null,
			y: null,
		},
	}),

	computed: {
		...mapState('user', ['mousepos']),
		...mapState('utils', ['textCursor']),
		hideDefaultCursor() {
			return this.textCursor ? true : false
		},
	},
	watch: {
		textCursor: {
			deep: true,
			handler(newValue) {
				setTimeout(() => {
					document.body.classList.toggle('no-cursor', newValue)
				})
			},
		},
	},
	methods: {
		tick() {
			requestAnimationFrame(this.tick)

			if (!this.textCursor) return

			this.lerpedPos = {
				x: lerp(this.lerpedPos.x, this.mousepos.x, 0.2),
				y: lerp(this.lerpedPos.y, this.mousepos.y, 0.2),
			}
		},
	},
	mounted() {
		this.tick()
	},
}
</script>