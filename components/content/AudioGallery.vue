<template>
	<div
		class="audio-gallery"
		ref="audio-gallery"
		@mousemove="scrollTo"
		@mouseup="() => (scrolling = false)"
	>
		<div
			class="audio-gallery__scrollbar"
			@mousedown="
				(e) => {
					scrolling = true
					scrollTo(e)
				}
			"
		>
			<div
				class="audio-gallery__scroller"
				:style="{ transform: `scaleY(${scrollerPos / 100})` }"
			/>
		</div>
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
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import getCloudinaryUrl from '~/utils/get-cloudinary-url'
import {
	AUDIO_TRACK,
	AUDIO_PROGRESS,
	SCROLL_PROGRESS,
	AUDIO_SCROLLABLE,
	AUDIO_PLAYING,
} from '~/model/constants'
import { clamp } from '~/utils/clamp'

export default {
	name: 'audio-scroll-gallery',
	data: () => ({
		scroll: 0,
		scrolling: false,
		scrollerHeight: 0,
		componentHeight: 0,
		height: 5000,
		audioWasPlaying: null,
	}),
	computed: {
		...mapState('ganniFm', ['songs']),
		...mapState('assets', ['lookBook']),
		...mapState('audio', ['audioPlaying', 'audioProgress', 'scrollProgress']),
		accountedHeight() {
			return this.height - this.componentHeight
		},
		activeImage() {
			return Math.round(this.audioProgress * this.lookBook.length)
		},
		scrollerPos() {
			return (
				this.audioProgress * (100 - this.scrollerHeight / this.componentHeight)
			)
		},
	},
	methods: {
		...mapActions('audio', [
			AUDIO_TRACK.action,
			SCROLL_PROGRESS.action,
			AUDIO_SCROLLABLE.action,
			AUDIO_PLAYING.action,
		]),
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
			this[SCROLL_PROGRESS.action](clamp(0, val, 1))
		},
		scrollTo(e) {
			if (!this.scrolling) return

			this[SCROLL_PROGRESS.action](
				clamp(0, e.clientY / this.componentHeight, 1)
			)
		},
	},
	mounted() {
		this.audioWasPlaying = this.audioPlaying
		window.addEventListener('wheel', this.onScroll.bind(this))
		this[AUDIO_SCROLLABLE.action](true)
		this[AUDIO_PLAYING.action](true)
		this[AUDIO_TRACK.action](this.songs[0])
		this.componentHeight = parseInt(
			getComputedStyle(this.$refs['audio-gallery']).height
		)
	},
	beforeDestroy() {
		window.removeEventListener('wheel', this.onScroll.bind(this))
		this[AUDIO_SCROLLABLE.action](false)
		this[SCROLL_PROGRESS.action](0)
		this[AUDIO_TRACK.action](this.songs[1])
		this[AUDIO_PLAYING.action](this.audioWasPlaying)
	},
	// afterDestroy() {
	// 	this[AUDIO_PLAYING.action](this.audioWasPlaying)
	// },
}
</script>