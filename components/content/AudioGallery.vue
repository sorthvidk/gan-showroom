<template>
	<div
		class="audio-gallery"
		@mousemove="scrollTo"
		@mouseup="() => (scrolling = false)"
	>
		<div
			class="audio-gallery__scroller"
			:style="{ transform: `translateY(${scrollerPos}vh)` }"
			@mousedown="() => (scrolling = true)"
		></div>
		<div class="audio-gallery__container">
			<div class="audio-gallery__wrapper">
				<div class="audio-gallery__images">
					<div
						v-for="(image, idx) in lookBook"
						:key="image.cloudinaryUrl"
						class="audio-gallery__image"
						:style="{ opacity: activeImage >= idx ? 1 : 0 }"
					>
						<img :src="getMediaUrl(image.type, image.cloudinaryUrl)" alt="" />
					</div>
				</div>
				<div class="audio-gallery__text">
					<h1>Current image: {{ activeImage + 1 }} / {{ lookBook.length }}</h1>
				</div>
			</div>
		</div>
		<div class="audio-gallery__modal" v-if="!audioPlaying">
			<p>Click the page to start audio</p>
		</div>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import getCloudinaryUrl from '~/utils/get-cloudinary-url'
import { AUDIO_PROGRESS, SCROLL_PROGRESS } from '~/model/constants'
import { clamp } from '~/utils/clamp'

export default {
	name: 'audio-scroll-gallery',
	data: () => ({
		scroll: 0,
		scrolling: false,
		scrollerHeight: 100,
		height: 5000,
	}),
	computed: {
		...mapState('assets', ['lookBook']),
		...mapState('audio', ['audioPlaying', 'audioProgress', 'scrollProgress']),
		accountedHeight() {
			return this.height - window.innerHeight
		},
		activeImage() {
			return Math.round(this.audioProgress * this.lookBook.length)
		},
		scrollerPos() {
			return (
				this.audioProgress *
				(100 - this.scrollerHeight / (window.innerHeight / 100))
			)
		},
	},
	methods: {
		...mapActions('audio', [SCROLL_PROGRESS.action]),
		getMediaUrl(type, cloudinaryUrl) {
			return getCloudinaryUrl(
				this.$cloudinary,
				{ type, cloudinaryUrl },
				{ width: 500 },
				2
			)
		},
		onScroll(e) {
			const val = this.audioProgress + e.deltaY / this.accountedHeight
			const scrollTo = val >= 1 ? 0 : val
			this[SCROLL_PROGRESS.action](clamp(0, val, 1))
		},
		scrollTo(e) {
			if (!this.scrolling) return

			this[SCROLL_PROGRESS.action](clamp(0, e.clientY / window.innerHeight, 1))
		},
	},
	mounted() {
		window.addEventListener('wheel', this.onScroll.bind(this))
	},
	beforeDestroy() {
		window.removeEventListener('wheel', this.onScroll.bind(this))
	},
}
</script>