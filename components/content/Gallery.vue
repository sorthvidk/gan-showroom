<template>
	<div class="gallery" :key="currentStyle ? currentStyle.styleId : ''">
		<gallery-image
			class="gallery__item"
			v-for="(asset, key) in images"
			:key="'galleryImage' + key"
			:asset="asset"
			:focused="focusedAssetId === asset.assetId"
		/>
		<gallery-video
			class="gallery__item"
			v-for="(asset, key) in videos"
			:key="'galleryVideo' + key"
			:asset="asset"
			:focused="focusedAssetId === asset.assetId"
		/>
	</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

// import getAssetType from '~/utils/asset-type'
import GalleryImage from '~/components/content/GalleryImage.vue'
import GalleryVideo from '~/components/content/GalleryVideo.vue'

import WindowContent from '~/components/framework/WindowContent.vue'
import { CLOSE_WINDOW } from '~/model/constants'
import { isVideo } from '~/utils/is-video'

export default {
	extends: WindowContent,
	name: 'gallery',
	components: {
		GalleryImage,
		GalleryVideo
	},
	props: {
		parentWindowId: {
			type: String,
			default: '',
			required: true
		},
		contentId: {
			type: String,
			default: '',
			required: true
		},
		styleId: {
			type: String,
			default: '',
			required: true
		},
		focusedAssetId: {
			type: String,
			default: '',
			required: true
		}
	},
	data: () => ({
		isVideo
	}),
	computed: {
		...mapState('collection', ['allStyles', 'currentStyle']),
		assets() {
			let style = this.allStyles.find(e => e.styleId === this.styleId)
			if (style && style.assets) return style.assets
			return []
		},
		images() {
			return this.assets.flat().filter(asset => !isVideo(asset))
		},
		videos() {
			return this.assets.flat().filter(asset => isVideo(asset))
		}
	},
	// watch: {
	// 	currentStyle: {
	// 		deep: true,
	// 		handler() {
	// 			this[CLOSE_WINDOW.action]({
	// 				windowId: this.parentWindowId,
	// 				contentId: this.contentId
	// 			})
	// 		}
	// 	}
	// },
	methods: {
		...mapActions([CLOSE_WINDOW.action])
	}
	// mounted() {
	// 	console.log(this.assets, this.styleId)
	// }
}
</script>
