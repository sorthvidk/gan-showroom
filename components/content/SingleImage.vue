<template>
	<div class="single-image" :class="{'is-interactive': this.belongsToStyle}">
		<transition name="fade">
			<img :src="assetUrl" alt="img" @click="clickHandler">
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
		belongsToStyle() {
			return this.asset.styleId ? true : false;
		},
		assetUrl() {
			if ( this.belongsToStyle ) {
				return getCloudinaryUrl(this.asset);
			}
			else {
				return this.asset.imageUrl;
			}
		}
	},
	methods: {
		...mapActions([
			OPEN_GALLERY.action
		]),	
		clickHandler() {
			if ( this.belongsToStyle ) {
				this[OPEN_GALLERY.action](this.asset);
			}
		}
	}

};
</script>