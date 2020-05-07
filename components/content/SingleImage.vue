<template>
	<div class="single-image" :class="{'is-interactive': this.canOpenGallery}">
		<transition name="fade">
			<img :src="imageUrl" alt="img" @click="clickHandler">
		</transition>
	</div>
</template>

<script>

import { vuex, mapActions, mapState } from 'vuex'
import { OPEN_GALLERY } from '~/model/constants'
import getCloudinaryUrl from '~/utils/cloudinary-url'

export default {
	name:'single-image',
	props: {
		asset: {
			type: Object,
			required: true
		}
	},
	computed: {
		canOpenGallery() {
			return this.asset.styleId ? true : false;
		},
		imageUrl() {
			if ( this.canOpenGallery ) {
				return getCloudinaryUrl(this.asset);
			}
			else {
				return this.asset.defaultImageUrl;
			}
		}
	},
	methods: {
		...mapActions([
			OPEN_GALLERY.action
		]),	
		clickHandler() {
			if ( this.canOpenGallery ) {
				this[OPEN_GALLERY.action](this.asset);
			}
		}
	}

};
</script>