<template>
	<transition name="fade">
		<div class="lookbook-slideshow">
			<div class=""></div>
			<img
				v-if="activeContent.type === 'image'"
				v-lazy="getMediaUrl(activeContent.type, activeContent.cloudinaryUrl)"
				alt=""
			/>
			<video
				v-if="activeContent.type === 'video'"
				:src="getMediaUrl(activeContent.type, activeContent.cloudinaryUrl)"
				preload
				muted
				controls
			/>

			<button class="lookbook-slideshow__button" @click="prev">prev</button>
			<button class="lookbook-slideshow__button" @click="next">next</button>
		</div>
	</transition>
</template>

<script>
import { vuex, mapActions, mapState } from 'vuex'

import getCloudinaryUrl from '~/utils/get-cloudinary-url'
import WindowContent from '~/components/framework/WindowContent.vue'
import Loading from '~/components/content/Loading.vue'

export default {
	extends: WindowContent,
	components: { Loading },
	name: 'look-book',
	props: {
		contentId: { type: String, default: 'lookBook', required: true },
	},
	data: () => ({
		idx: 0,
	}),
	computed: {
		// weird syntax to get state dynamically based on props.contentId
		content() {
			return this.$store.state.assets[this.contentId]
		},
		activeContent() {
			return this.content[this.idx]
		},
	},
	methods: {
		getMediaUrl(type, cURL) {
			return getCloudinaryUrl(
				this.$cloudinary,
				{ type: type, cloudinaryUrl: cURL },
				{ width: 500 },
				2
			)
		},

		next() {},
		prev() {},
	},
}
</script>