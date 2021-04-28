<template>
	<div class="collection-header">
		<div class="inner" @click="toggleImages">
			<div class="text">
				<h1 v-if="group.headline">{{ group.headline }}</h1>
				<countdown
					v-if="group.deadline"
					:preText="'That is in '"
					:deadline="group.deadline.split(',')"
					:slim="true"
				/>
				<p v-if="group.text" v-html="group.text" />
			</div>
			<div
				class="image"
				@click="showNextImage"
				:class="{ 'in-view': showImages }"
			>
				<img
					v-for="(image, idx) in group.cloudinaryUrl"
					:key="image"
					:src="getImage(image).src"
					v-show="idx === activeIndex"
				/>

				<div
					class="timeline"
					v-if="group.cloudinaryUrl.length > 1"
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
import { mapState } from 'vuex'
import Countdown from '~/components/elements/Countdown.vue'
import getCloudinaryUrl from '~/utils/get-cloudinary-url'
import { greyPixel } from '~/utils/placeholders'
import { nextIndex, prevIndex } from '~/utils/array-helpers'

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
		showImages: false,
	}),
	computed: { ...mapState('user', ['mousepos', 'screenSize']) },
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
		showNextImage(click) {
			this.activeIndex =
				click && this.mousepos.x < this.screenSize.width / 2
					? prevIndex(this.group.cloudinaryUrl, this.activeIndex)
					: nextIndex(this.group.cloudinaryUrl, this.activeIndex)
			this.progress = 0
		},
		tick() {
			if (this.showImages) {
				requestAnimationFrame(this.tick)
			}

			this.progress += 1 / this.speed

			if (this.progress > 1) {
				this.showNextImage()
			}
		},
		toggleImages(e) {
			console.log(e)
			this.showImages = e.deltaY ? false : true

			if (this.showImages && this.group.cloudinaryUrl.length > 1) {
				this.tick()
			}
		},
	},
	mounted() {},
}
</script>