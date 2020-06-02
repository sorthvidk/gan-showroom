<template>
	<div class="gallery">
		<gallery-image
			class="gallery__item"
			v-for="(asset,key) in images"
			 :key="'galleryImage'+key"
			:asset="asset"
			:focused="focusedAssetId === asset.assetId"
		/>
		<gallery-video
			class="gallery__item"
			v-for="(asset,key) in videos"
			 :key="'galleryVideo'+key"
			:asset="asset"
			:focused="focusedAssetId === asset.assetId"
		/>
	</div>
</template>

<script>
import { vuex, mapActions, mapState } from 'vuex'

import getAssetType from '~/utils/asset-type'
import GalleryImage from '~/components/content/GalleryImage.vue'
import GalleryVideo from '~/components/content/GalleryVideo.vue'

import WindowContent from '~/components/framework/WindowContent.vue'

export default {
	extends: WindowContent,
	name: 'gallery',
	components: {
		GalleryImage,
		GalleryVideo
	},
	props: {
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
	computed: {
		...mapState({
			collection: state => state.collection.list
		}),
		assets() {
			let styleRef = this.collection.filter(e => e.styleId === this.styleId)[0]
			if (styleRef.assets) return styleRef.assets
			return []
		},
		images() {
			let i = this.assets.filter(asset => asset.type === 'image')
			console.warn("GALLERY | " + i.length + " IMAGES")
			return i;
		},
		videos() {
			let i = this.assets.filter(asset => asset.type === 'video')
			console.warn("GALLERY | " + i.length + " VIDEOS")
			return i;
		}
	},
	methods: {}
};
</script>