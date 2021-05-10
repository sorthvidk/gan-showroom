<template>
	<div class="fabrics">
		<div class="fabrics__content">
			<div
				class="fabrics__item"
				v-for="(item, idx) in items"
				:key="item.text + idx"
				ref="items"
				:class="isFullScreen ? 'zoomed' : ''"
			>
				<text-cursor />
				<img
					:src="getUrl(item.cloudinaryUrl)"
					:alt="'One of GANNIs many really nice fabrics'"
					:style="{
						transformOrigin: !isFullScreen ? 'center' : transformString(idx),
					}"
					@click="fullscreen"
					@mouseenter="changeCursor('Zoom', 'plus--bold')"
					@mouseleave="changeCursor('')"
				/>
				<div class="fabrics__text">
					<p v-html="isFullScreen ? item.text || '' : item.title || ''"></p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import getCloudinaryUrl from '~/utils/get-cloudinary-url'
import { clamp } from '~/utils/clamp'
import { TEXT_CURSOR, ASSISTANT_TOGGLE } from '~/model/constants'
import TextCursor from '../elements/TextCursor.vue'

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
		...mapActions('assistant', [ASSISTANT_TOGGLE.action]),
		...mapActions('utils', [TEXT_CURSOR.action]),
		getUrl(cloudinaryUrl) {
			return getCloudinaryUrl(this.$cloudinary, {
				cloudinaryUrl,
				type: 'image',
			})
		},
		// zoom(e) {
		// 	e.target.classList.toggle('zoomed')
		// },
		ownPos(idx) {
			if (!this.$refs.items) return 0

			const { top, left, width, height } = this.$refs.items[
				idx
			].getBoundingClientRect()

			return { top, left, width, height }
		},
		transformString(idx) {
			// if (!this.isFullscreen) return 'center'

			const { left, width, top, height } = this.ownPos(idx)

			return `${clamp(0, this.mousepos.x - left, width)}px ${clamp(
				0,
				this.mousepos.y - top,
				height
			)}px`
		},
		fullscreen(e) {
			if (!this.isFullScreen) {
				if (typeof document.body.requestFullscreen === 'function') {
					e.target.parentElement.requestFullscreen()
				}

				this.isFullScreen = true
				this.changeCursor('Zoom out')
			} else {
				if (document.exitFullscreen) {
					document.exitFullscreen()
				}
				this.isFullScreen = false
				this.changeCursor('+ Zoom')
			}
		},
		changeCursor(str, icon) {
			this[TEXT_CURSOR.action]({ str, icon })
		},
	},
	mounted() {
		this[ASSISTANT_TOGGLE.action](true)
	},
	beforeDestroy() {
		this.changeCursor('')
	},
}
</script>