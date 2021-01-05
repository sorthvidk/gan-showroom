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
						v-for="(image, idx) in images"
						:key="image.cloudinaryUrl"
						class="audio-gallery__image"
						:style="{
							opacity: activeImage >= idx ? 1 : 0,
							height: height(idx),
						}"
					>
						<img :src="getMediaUrl(image.type, image.cloudinaryUrl)" alt="" />
					</div>
				</div>
				<div class="audio-gallery__text">
					<h1>{{ currentSubtitle }}</h1>
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
	AUDIO_DURATION,
	SCROLL_PROGRESS,
	AUDIO_SCROLLABLE,
	AUDIO_PLAYING,
} from '~/model/constants'
import { clamp } from '~/utils/clamp'
import { getRandomIntHash } from '~/utils/get-random-int-hash'
import { lastElement } from '~/utils/array-helpers'

export default {
	name: 'audio-scroll-gallery',
	data: () => ({
		scroll: 0,
		scrolling: false,
		scrollerHeight: 0,
		componentHeight: 0,
		scrollHeight: 5000,
		audioWasPlaying: null,
	}),
	computed: {
		...mapState('ganniFm', ['songs']),
		...mapState('assets', ['intro']),
		...mapState('audio', [
			'audioPlaying',
			'audioProgress',
			'audioDuration',
			'scrollProgress',
			'subtitles',
		]),
		images() {
			return this.intro.filter((i) => i.type === 'image')
		},
		accountedHeight() {
			return this.scrollHeight - this.componentHeight
		},
		activeImage() {
			return Math.round(this.audioProgress * this.images.length)
		},
		scrollerPos() {
			return (
				this.audioProgress * (100 - this.scrollerHeight / this.componentHeight)
			)
		},
		currentSecond() {
			return this.audioDuration * this.audioProgress
		},
		currentSubtitle() {
			const sub = this.subtitles.filter((x) => x.time <= this.currentSecond)

			return sub.length ? lastElement(sub).text : ''
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
		height(idx) {
			return `${getRandomIntHash(idx) * 20 + 80}%`
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