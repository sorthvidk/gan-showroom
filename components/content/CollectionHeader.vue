<template>
	<div class="collection-header">
		<div class="inner">
			<div class="text">
				<h1 v-if="group.headline">{{ group.headline }}</h1>
				<countdown
					v-if="group.deadline"
					:preText="'That is in '"
					:deadline="group.deadline.split(',')"
				/>
				<p v-if="group.text" v-html="group.text" />
			</div>
			<div class="image">
				<img
					v-for="(image, idx) in group.cloudinaryUrl"
					:key="image"
					:src="getImage(image).src"
					@click="showNextImage(true)"
					v-show="idx === activeIndex"
				/>

				<div
					class="timeline"
					:style="{
						gridTemplateColumns: `repeat(${group.cloudinaryUrl.length}, 1fr)`,
					}"
				>
					<div
						v-for="(x, idx) in group.cloudinaryUrl"
						:key="'jfdkdjfkdjfk' + x"
						class="line"
						:style="{
							'--progress':
								idx < activeIndex ? 1 : idx === activeIndex ? progress : 0,
						}"
					></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Countdown from '~/components/elements/Countdown.vue'
import getCloudinaryUrl from '~/utils/get-cloudinary-url'
import { greyPixel } from '~/utils/placeholders'
import { nextIndex } from '~/utils/array-helpers'

export default {
	name: 'collection-header',
	components: {
		Countdown,
	},
	props: {
		mode: {
			type: String,
			default: 'carousel',
		},
		group: {
			type: Object,
			default: () => ({}),
		},
	},
	data: () => ({
		speed: 300,
		greyPixel,
		loaded: 0,
		activeIndex: 0,
		progress: 0,
	}),
	methods: {
		getImage(src) {
			return {
				src: getCloudinaryUrl(this.$cloudinary, { cloudinaryUrl: src }),
				loading: greyPixel,
			}
		},
		isLoaded() {
			return this.loaded++
		},
		showNextImage() {
			this.activeIndex = nextIndex(this.group.cloudinaryUrl, this.activeIndex)
			this.progress = 0
		},
		tick() {
			requestAnimationFrame(this.tick)
			this.progress += 1 / this.speed
			if (this.progress > 1) {
				this.showNextImage()
			}
		},
	},
	mounted() {
		this.tick()
	},
}
</script>