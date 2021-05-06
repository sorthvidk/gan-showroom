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
		<svg-icon v-if="isSvg" :name="textCursorText.replace('svg:', '')" />
		<p v-else>{{ textCursorText }}</p>
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
		...mapState('utils', ['textCursorText']),
		hideDefaultCursor() {
			document.body.classList.toggle('no-cursor', this.textCursorText)

			return this.textCursorText ? true : false
		},
		isSvg() {
			return this.textCursorText.includes('svg:')
		},
	},
	methods: {
		tick() {
			requestAnimationFrame(this.tick)

			if (!this.textCursorText) return

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