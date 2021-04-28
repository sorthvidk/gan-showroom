<template>
	<div class="about-ganni">
		<div v-for="(item, index) in items" :key="index" class="about-ganni__item">
			<div
				v-if="item.title"
				class="about-ganni__headline"
				v-html="item.title"
			></div>
			<div v-if="item.text" v-html="item.text"></div>
			<div class="about-ganni__images">
				<img
					v-for="(image, index) in item.cloudinaryUrl"
					:key="index"
					:src="getMediaUrl(image.type, image.cloudinaryUrl).src"
					alt=""
				/>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import getCloudinaryUrl from '~/utils/get-cloudinary-url'

export default {
	name: 'about-ganni',
	components: {},
	computed: {
		...mapState('aboutGanni', ['items'])
	},
	methods: {
		getMediaUrl(type, cloudinaryUrl, { thumbnail } = {}) {
			return {
				src: getCloudinaryUrl(
					this.$cloudinary,
					{ type, cloudinaryUrl },
					{ width: thumbnail ? 100 : window.innerWidth < 600 ? 300 : 900 }
				)
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
