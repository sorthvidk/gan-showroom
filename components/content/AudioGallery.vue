<template>
	<div
		class="audio-gallery"
		ref="audio-gallery"
		@mousemove="
			(e) => {
				scrollTo(e)
				moveCursor(e)
			}
		"
		@mouseup="() => (scrolling = false)"
		@wheel="onScroll"
		@click="togglePlayback"
	>
		<div class="audio-player" :class="{ dark: dashboardDark }">
			<button @click="togglePlayback">
				<svg-icon :name="playing ? 'pause' : 'play'" />
			</button>
			<p class="audio-player__name">{{ various.scrollAudio.title }}</p>
			<p class="audio-player__time">{{ currentTime }}</p>
			<audio-spectrum-bars :animate="playing" />
		</div>
		<div
			v-if="!playing && cursorPos"
			class="audio-gallery__cursor"
			:style="{ transform: cursorPos }"
		>
			<p>Click to play</p>
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
				:style="{
					transform: `scaleY(${scrollerPos / 100})`,
					height: componentHeight + 'px',
				}"
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
		scrolling: false,
		scrollable: true,

		componentHeight: 0,
		scrollHeight: 5000,
		cursorPos: '',
	}),
	computed: {
		...mapState('ganniFm', ['songs']),
		...mapState('utils', ['dashboardDark', 'various']),
		...mapState('audio', ['scrollImages', 'subtitles', 'track']),
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
			return this.progress * 100
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
				this.scrollable = false
				this.stop()
				this.$emit('played-through')
			}
		},
	},
	methods: {
		getMediaUrl(type, cloudinaryUrl) {
			return getCloudinaryUrl(
				this.$cloudinary,
				{ type, cloudinaryUrl },
				{ width: 500 },
				2
			)
		},
		moveCursor({ clientX, clientY }) {
			this.cursorPos = `translate(calc(${clientX}px - 50%), calc(${clientY}px + 25px))`
		},
		onScroll(event) {
			// cross-browser wheel delta
			// Chrome / IE: both are set to the same thing - WheelEvent for Chrome, MouseWheelEvent for IE
			// Firefox: first one is undefined, second one is MouseScrollEvent
			var e = window.event || event
			// Chrome / IE: first one is +/-120 (positive on mouse up), second one is zero
			// Firefox: first one is undefined, second one is -/+3 (negative on mouse up)
			var delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail))

			const val = clamp(
				0,
				this.progress - e.wheelDelta / this.accountedHeight,
				0.99
			)

			if (this.scrollable) {
				this.setProgress(val)
			}

			e.preventDefault()
		},
		scrollTo(e) {
			if (!this.scrolling) return

			this.setProgress(clamp(0, e.clientY / this.componentHeight, 0.99))
		},
		height(idx) {
			return `${getRandomIntHash(idx) * 20 + 80}%`
		},
	},
	mounted() {
		this.componentHeight = parseInt(
			getComputedStyle(this.$refs['audio-gallery']).height
		)
	},
}
</script>