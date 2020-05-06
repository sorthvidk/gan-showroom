<template>
	<div class="gallery">
		<gallery-image class="gallery__item" v-for="(asset,key) in assets" v-if="asset.type === 'image'" :asset="asset" :focused="focusedAsset.assetId === asset.assetId" />
		<gallery-video class="gallery__item" v-for="(asset,key) in assets" v-if="asset.type === 'video'" :asset="asset" :focused="focusedAsset.assetId === asset.assetId" />
	</div>
</template>

<script>

import { vuex, mapActions, mapState } from 'vuex'

import getAssetType from '~/utils/asset-type'
import GalleryImage from '~/components/content/GalleryImage.vue'
import GalleryVideo from '~/components/content/GalleryVideo.vue'

export default {
	name:'gallery',
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
		focusedAsset: {
			type: Object,
			default: null,
			required: true
		}
	},
	computed: {
		...mapState({
			collection: state => state.collection.list
		}),
		assets() {
			let styleRef = this.collection.filter(e=>e.styleId === this.styleId)[0];
			if ( styleRef.assets ) return styleRef.assets;
			return [];
		}
	},
	methods: {

	}
};
</script>