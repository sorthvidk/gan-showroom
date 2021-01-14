<template>
	<div
		class="audio-gallery"
		ref="audio-gallery"
		@mousemove="scrollTo"
		@mouseup="() => (scrolling = false)"
	>
		<div class="audio-player" :class="{ dark: dashboardDark }">
			<button @click="togglePlayback">
				<svg-icon :name="playing ? 'pause' : 'play'" />
			</button>
			<p class="audio-player__name">{{ various.scrollAudio.title }}</p>
			<p class="audio-player__time">{{ currentTime }}</p>
			<audio-spectrum-bars :animate="playing" />
		</div>
		<!-- <audio-player
			v-if="various.scrollAudio"
			:title="various.scrollAudio.title"
			ref="audio-player"
			:autoplay="true"
		/> -->
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
import VueHowler from 'vue-howler'
import getCloudinaryUrl from '~/utils/get-cloudinary-url'
import {
	AUDIO_TRACK,
	AUDIO_PROGRESS,
	AUDIO_DURATION,
	SCROLL_PROGRESS,
	AUDIO_SCROLLABLE,
	AUDIO_IS_PLAYING,
	IS_INTRO,
} from '~/model/constants'
import { clamp } from '~/utils/clamp'
import { MMSS } from '~/utils/HHMMSS'
import { getRandomIntHash } from '~/utils/get-random-int-hash'
import { lastElement } from '~/utils/array-helpers'
import AudioPlayer from './AudioPlayer.vue'
import AudioSpectrumBars from '~/components/content/AudioSpectrumBars.vue'

export default {
	mixins: [VueHowler],
	components: { AudioPlayer, AudioSpectrumBars },
	name: 'audio-scroll-gallery',
	data: () => ({
		scroll: 0,
		// audioProgress: 0,
		scrolling: false,
		scrollable: true,
		scrollerHeight: 0,
		componentHeight: 0,
		scrollHeight: 5000,
		audioWasPlaying: null,
	}),
	computed: {
		...mapState('ganniFm', ['songs']),
		...mapState('utils', ['various']),
		...mapState('utils', ['dashboardDark']),
		...mapState('audio', [
			'scrollImages',
			// 'audioIsPlaying',
			// 'audioProgress',
			// 'audioDuration',
			// 'scrollProgress',
			'subtitles',
			'track',
		]),
		images() {
			return this.scrollImages
		},
		accountedHeight() {
			return this.scrollHeight - this.componentHeight
		},
		activeImage() {
			return Math.round(this.progress * this.images.length)
		},
		scrollerPos() {
			return this.progress * (100 - this.scrollerHeight / this.componentHeight)
		},
		currentSecond() {
			return this.duration * this.progress
		},
		currentTime() {
			return MMSS(this.duration * this.progress)
		},
		currentSubtitle() {
			const sub = this.subtitles.filter((x) => x.time <= this.currentSecond)

			return sub.length ? lastElement(sub).text : ''
		},
	},
	watch: {
		progress() {
			if (this.progress >= 0.99) {
				// this[IS_INTRO.action]()
				this.scrollable = false
				this.$emit('played-through')
			}
		},
	},
	methods: {
		...mapActions('audio', [
			// GALLERY_IS_PLAYING.action,
			AUDIO_TRACK.action,
			SCROLL_PROGRESS.action,
			AUDIO_SCROLLABLE.action,
			AUDIO_IS_PLAYING.action,
			IS_INTRO.action,
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
			const val = this.progress + e.deltaY / this.accountedHeight
			// this[SCROLL_PROGRESS.action](clamp(0, val, 1))

			if (this.scrollable) {
				this.setProgress(val)
			}
		},
		scrollTo(e) {
			if (!this.scrolling) return

			this.setProgress(clamp(0, e.clientY / this.componentHeight, 1))
			// this[SCROLL_PROGRESS.action](
			// 	clamp(0, e.clientY / this.componentHeight, 1)
			// )
		},
		height(idx) {
			return `${getRandomIntHash(idx) * 20 + 80}%`
		},
	},
	mounted() {
		window.addEventListener('wheel', this.onScroll.bind(this))
		this.componentHeight = parseInt(
			getComputedStyle(this.$refs['audio-gallery']).height
		)
	},
	beforeDestroy() {
		window.removeEventListener('wheel', this.onScroll.bind(this))
	},
	// afterDestroy() {
	// 	this[AUDIO_IS_PLAYING.action](this.audioWasPlaying)
	// },
}
</script>