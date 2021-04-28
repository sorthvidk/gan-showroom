<template>
	<div class="about-ganni">
		<div v-for="(item, index) in items" :key="index" class="about-ganni__item">
			<div
				v-if="item.headline"
				class="about-ganni__headline"
				v-html="item.headline"
			></div>
			<div v-if="item.bodyText" v-html="item.bodyText"></div>
			<div
				:class="
					`about-ganni__images ${
						index === 1 ? 'about-ganni__images--with-smiley' : ''
					}`
				"
			>
				<img
					class="about-ganni__smiley"
					src="/img/smiley.png"
					v-if="index === 1"
				/>
				<img
					v-for="(image, i) in item.cloudinaryUrl"
					:key="i"
					:src="getImage(image).src"
					alt=""
				/>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import getCloudinaryUrl from '~/utils/get-cloudinary-url'
import { greyPixel } from '~/utils/placeholders'

export default {
	name: 'about-ganni',
	components: {},
	computed: {
		...mapState('aboutGanni', ['items'])
	},
	methods: {
		getImage(src) {
			return {
				src: getCloudinaryUrl(this.$cloudinary, { cloudinaryUrl: src }),
				loading: greyPixel
			}
		},

		itemClass(item) {
			return {
				'about-ganni__item': true,
				'about-ganni__item-media': item.type === 'image',
				'about-ganni__item-text': item.type === 'text'
			}
		}
	}
}
</script>
