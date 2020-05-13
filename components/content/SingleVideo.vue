<template>
	<div class="single-video" :class="{'is-interactive': this.belongsToStyle}">
		<transition name="fade">
			<div @click="clickHandler">				
				<video-player :video-url="assetUrl" v-bind="{...videoAttributes}"/>
			</div>
		</transition>
	</div>
</template>

<script>

import { vuex, mapActions, mapState } from 'vuex'
import { OPEN_GALLERY } from '~/model/constants'
import VideoPlayer from '~/components/content/VideoPlayer.vue'
import getCloudinaryUrl from '~/utils/cloudinary-url'

export default {
	name:'single-video',
	components: {
		VideoPlayer
	},
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
				return this.asset.videoUrl;
			}
		},
		videoAttributes() {
			if ( this.belongsToStyle ) {
				return { 
					autoPlay:true, 
					muted:true,
					loop:true
				};
			}
			else {
				return { 
					controls:true
				};
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