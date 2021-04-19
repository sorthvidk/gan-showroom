<template>
	<div
		class="collection-header"
		:class="{ [mode]: mode }"
		:style="{ '--count': group.cloudinaryUrl && group.cloudinaryUrl.length }"
	>
		<div class="inner">
			<div class="text">
				<h1>{{ group.name }}</h1>
				<p v-if="group.text" v-html="group.text" />
				<countdown
					:preText="'That is in '"
					:deadline="[2021, 8, 15, 0, 0, 0]"
				/>
				<!-- <p>{{ loaded }}</p> -->
			</div>
			<div class="image">
				<!-- v-for="i in mode === 'carousel' ? 2 : 1"
					:key="`lakjshdf${i}`" -->
				<!-- <div class="effect"> -->
				<img
					v-if="!group.cloudinaryUrl || !group.cloudinaryUrl.length"
					:src="greyPixel"
				/>
				<img
					v-else
					v-for="image in group.cloudinaryUrl"
					:key="image"
					:src="getImage(image).src"
				/>
				<!-- v-show="loaded === group.cloudinaryUrl.length" -->
				<!-- @load="isLoaded" -->
				<!-- </div> -->
			</div>
		</div>
	</div>
</template>

<script>
import Countdown from '~/components/elements/Countdown.vue'
import getCloudinaryUrl from '~/utils/get-cloudinary-url'
import { greyPixel } from '~/utils/placeholders'
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
	},
}
</script>