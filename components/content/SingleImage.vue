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
import getCloudinaryUrl from '~/utils/get-cloudinary-url'

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
			let transform = {}
			if ( this.asset.aspect === 'portrait' ) transform = {width:274, height:417}
			if ( this.asset.aspect === 'landscape' ) transform = {width:417, height:274}
			if ( this.asset.aspect === 'square' ) transform = {width:320, height:320}
			return getCloudinaryUrl(this.$cloudinary, this.asset, transform);
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