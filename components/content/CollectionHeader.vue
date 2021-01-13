<template>
	<div class="collection-header" :class="{ [mode]: mode }">
		<div class="inner">
			<div class="image">
				<div
					class="effect"
					v-for="i in mode === 'carousel' ? 2 : 1"
					:key="`lakjshdf${i}`"
				>
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
				</div>
			</div>
			<p v-html="group.text || group.name" />
		</div>
	</div>
</template>

<script>
import getCloudinaryUrl from '~/utils/get-cloudinary-url'
import { greyPixel } from '~/utils/placeholders'
export default {
	name: 'collection-header',
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
	}),
	methods: {
		getImage(src) {
			return {
				src: getCloudinaryUrl(this.$cloudinary, { cloudinaryUrl: src }),
				loading: greyPixel,
			}
		},
	},
}
</script>