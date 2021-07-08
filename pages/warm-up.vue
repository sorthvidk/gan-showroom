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

		<div class="images">
			<!-- Three of the same images next to each other -->
			<div class="one" v-if="!shouldBeRandom && !sideBySide">
				<img v-lazy="imageUrl(shuffledImages[0])" />
				<img v-lazy="imageUrl(shuffledImages[0])" />
				<img v-lazy="imageUrl(shuffledImages[0])" />
			</div>

			<!-- Three different images next to each other -->
			<div class="two" v-if="shouldBeRandom && !sideBySide">
				<img v-lazy="imageUrl(shuffledImages[0])" />
				<img v-lazy="imageUrl(shuffledImages[1])" />
				<img v-lazy="imageUrl(shuffledImages[2])" />
			</div>

			<!-- Grid of the same image -->
			<div class="three" v-if="!shouldBeRandom && sideBySide">
				<img
					v-for="idx in 28"
					:key="idx"
					v-lazy="imageUrl(shuffledImages[0])"
				/>
			</div>

			<!-- Grid of the two different images -->
			<div class="four" v-if="shouldBeRandom && sideBySide">
				<img
					v-for="idx in 28"
					:key="idx"
					v-lazy="imageUrl(shuffledImages[idx % 2 === 0 ? 0 : 1])"
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

export default {
	name: 'warm-up-page',
	components: { MusicPlayer },
	data: () => ({
		shouldBeRandom: null,
		shuffledImages: [],
		sideBySide: null,

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
		}
	},
	methods: {
		...mapActions('assistant', [ASSISTANT_MODE.action, ASSISTANT_TEXT.action]),
		imageUrl(url) {
			return getCloudinaryUrl(
				this.$cloudinary,
				{ cloudinaryUrl: url },
				{ width: 1200 }
			)
		},
		generateLayout() {
			// pick one image, or multiple
			this.shouldBeRandom = Math.random() < 0.5
			// shuffle the images
			this.shuffledImages = shuffle(this.images)
			// either three large images or many side by side
			this.sideBySide = Math.random() < 0.5
		},
		onProgress(progress) {
			this.progress = progress
		}
	},
	mounted() {
		this[ASSISTANT_MODE.action](AssistantModes.CUSTOM)
		this[ASSISTANT_TEXT.action]('warm-up')

		this.generateLayout()
	}
}
</script>
