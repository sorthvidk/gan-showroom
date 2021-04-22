<template>
	<div class="collection-header">
		<!-- :style="{ '--count': group.cloudinaryUrl && group.cloudinaryUrl.length }" -->
		<!-- :class="{ [mode]: mode }" -->
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
				<!-- <img
					v-if="!group.cloudinaryUrl || !group.cloudinaryUrl.length"
					:src="greyPixel"
				/> -->
				<img
					v-for="(image, idx) in group.cloudinaryUrl"
					:key="image"
					:src="getImage(image).src"
					@click="showNextImage"
					v-show="idx === activeIndex"
				/>
				<!-- <img
					:key="activeIndex"
					:src="getImage(group.cloudinaryUrl[activeIndex]).src"
				/> -->
				<div
					class="timeline"
					:style="{
						width: `${100 / group.cloudinaryUrl.length}%`,
						left: `${(100 / group.cloudinaryUrl.length) * activeIndex}%`,
					}"
				></div>
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
		greyPixel,
		loaded: 0,
		activeIndex: 0,
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
		},
	},
}
</script>