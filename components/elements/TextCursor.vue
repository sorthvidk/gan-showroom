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
		<svg-icon v-if="content.icon" :name="content.icon" />
		<p v-if="content.str">{{ content.str }}</p>
	</div>
</template>

<script>
import { mapState } from 'vuex'

function lerp(start, end, amt) {
	return (1 - amt) * start + amt * end
}

export default {
	name: 'text-cursor',
	props: {
		text: { type: Object | null, default: () => ({ str: null, icon: null }) },
	},

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
			return this.text.str || this.text.icon || this.textCursor ? true : false
		},
		content() {
			if (this.text.str || this.text.icon) {
				return this.text
			}

			const { str = null, icon = null } = this.textCursor || {}

			return { str, icon }
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