<template>
	<div class="warm-up">
		<music-player
			:showAudioVisualizer="false"
			:src="various.scrollAudio.src"
			:title="various.scrollAudio.title"
			@progress="onProgress"
			:autoplay="true"
		/>

		<div class="subtitle">
			<p>
				<span>{{ currentSubtitle }}</span>
			</p>
		</div>

		<div class="images" v-if="currentLayout">
			<!-- Three of the same images next to each other -->
			<div
				class="one"
				v-if="!currentLayout.shouldBeRandom && !currentLayout.sideBySide"
			>
				<img
					v-lazy="imageUrl(shuffledImages[randomIndex(currentIndex)])"
					class="fade"
				/>
				<img
					v-lazy="imageUrl(shuffledImages[randomIndex(currentIndex)])"
					class="fade"
				/>
				<img
					v-lazy="imageUrl(shuffledImages[randomIndex(currentIndex)])"
					class="fade"
				/>
			</div>

			<!-- Three different images next to each other -->
			<div
				class="two"
				v-if="currentLayout.shouldBeRandom && !currentLayout.sideBySide"
			>
				<img v-lazy="imageUrl(shuffledImages[randomIndex()])" class="fade" />
				<img v-lazy="imageUrl(shuffledImages[randomIndex()])" class="fade" />
				<img v-lazy="imageUrl(shuffledImages[randomIndex()])" class="fade" />
			</div>

			<!-- Grid of the same image -->
			<div
				class="three"
				v-if="!currentLayout.shouldBeRandom && currentLayout.sideBySide"
			>
				<img
					v-for="idx in 28"
					:key="idx"
					v-lazy="imageUrl(shuffledImages[randomIndex(currentIndex)])"
					class="fade"
				/>
			</div>

			<!-- Grid of the two different images -->
			<div
				class="four"
				v-if="currentLayout.shouldBeRandom && currentLayout.sideBySide"
			>
				<img
					v-for="idx in 28"
					:key="idx"
					v-lazy="
						imageUrl(
							shuffledImages[
								idx % 2 === 0
									? randomIndex(currentIndex)
									: randomIndex(currentIndex + 1)
							]
						)
					"
					class="fade"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { ASSISTANT_MODE, ASSISTANT_TEXT } from '~/model/constants'
import AssistantModes from '~/model/assistant-modes'
import getCloudinaryUrl from '~/utils/get-cloudinary-url'
import { shuffle } from '~/utils/shuffle'
import { MMSS } from '~/utils/HHMMSS'
import MusicPlayer from '~/components/content/MusicPlayer.vue'
import { lastElement } from '~/utils/array-helpers'
import { getRandomInt } from '~/utils/get-random-int'
import { getRandomIntHash } from '~/utils/get-random-int-hash'

export default {
	name: 'warm-up-page',
	components: { MusicPlayer },
	data: () => ({
		shuffledImages: [],
		layouts: {
			shouldBeRandom: null,
			sideBySide: null
		},

		duration: 0,
		progress: 0,
		playing: false
	}),
	computed: {
		...mapState('warm-up', ['images']),
		...mapState('utils', ['various']),
		...mapState('audio', ['subtitles']),
		currentTime() {
			return MMSS(this.duration * this.progress)
		},
		currentSubtitle() {
			const sub = this.subtitles.filter(x => x.time <= this.progress)

			return sub.length ? lastElement(sub).subtitle : ''
		},
		currentIndex() {
			return Math.floor((this.progress / 5) % this.layouts.length)
		},
		currentLayout() {
			return this.layouts[this.currentIndex]
		}
	},
	methods: {
		...mapActions('assistant', [ASSISTANT_MODE.action, ASSISTANT_TEXT.action]),
		imageUrl(url) {
			return getCloudinaryUrl(
				this.$cloudinary,
				{ cloudinaryUrl: url },
				{ width: 600 }
			)
		},
		generateLayout() {
			this.layouts = [...Array(20)].map((_, idx) => ({
				// pick one image, or multiple
				shouldBeRandom: Math.random() < 0.5,
				// either three large images or many side by side
				sideBySide: idx % 2 === 0
			}))

			// shuffle the images
			this.shuffledImages = shuffle(this.images)
		},
		onProgress(progress) {
			this.progress = progress
		},
		randomIndex(hash) {
			return Math.floor(getRandomIntHash(hash) * (this.images.length - 1))
		}
	},
	mounted() {
		this[ASSISTANT_MODE.action](AssistantModes.CUSTOM)
		this[ASSISTANT_TEXT.action]('warm-up')

		this.generateLayout()
	}
}
</script>
