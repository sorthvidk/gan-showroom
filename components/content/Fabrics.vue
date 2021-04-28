<template>
	<div class="fabrics">
		<div
			class="fabrics__item"
			v-for="(item, idx) in items"
			:key="item.text"
			ref="items"
		>
			<text-cursor :text="'+zoom'" />
			<img
				:src="getUrl(item.cloudinaryUrl)"
				:alt="'One of GANNIs many really nice fabrics'"
				:style="{ transformOrigin: transformString(idx) }"
				@click="zoom"
			/>
			<div class="fabrics__text" v-if="item.text">
				<p>{{ item.text }}</p>
			</div>
			<button class="fabrics__fullscreen" @click="fullscreen">
				<svg-icon :name="isFullScreen ? 'fullscreen--off' : 'fullscreen--on'" />
			</button>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import getCloudinaryUrl from '~/utils/get-cloudinary-url'
import TextCursor from '~/components/elements/TextCursor.vue'
import { clamp } from '~/utils/clamp'

export default {
	name: 'fabrics',
	components: {
		TextCursor,
	},
	data: () => ({
		clamp,
		isFullScreen: false,
	}),
	computed: {
		...mapState('fabrics', ['items']),
		...mapState('user', ['mousepos', 'currentScroll']),
	},
	methods: {
		getUrl(cloudinaryUrl) {
			return getCloudinaryUrl(this.$cloudinary, {
				cloudinaryUrl,
				type: 'image',
			})
		},
		zoom(e) {
			e.target.classList.toggle('zoomed')
		},
		ownPos(idx) {
			if (!this.$refs.items) return 0

			const { top, left, width, height } = this.$refs.items[
				idx
			].getBoundingClientRect()

			return { top, left, width, height }
		},
		transformString(idx) {
			const { left, width, top, height } = this.ownPos(idx)

			return `${clamp(0, this.mousepos.x - left, width)}px ${clamp(
				0,
				this.mousepos.y - top,
				height
			)}px`
		},
		fullscreen(e) {
			if (!document.fullscreenElement) {
				e.target.parentElement.requestFullscreen()
				this.isFullScreen = true
			} else {
				if (document.exitFullscreen) {
					document.exitFullscreen()
					this.isFullScreen = false
				}
			}
		},
	},
}
</script>