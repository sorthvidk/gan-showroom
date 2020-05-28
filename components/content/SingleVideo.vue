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
import getCloudinaryUrl from '~/utils/get-cloudinary-url'
import WindowContent from '~/components/framework/WindowContent.vue'

export default {
	extends: WindowContent,
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
			return getCloudinaryUrl(this.$cloudinary, this.asset);
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
			if ( this.belongsToStyle && this.inFocus ) {
				this[OPEN_GALLERY.action](this.asset);
			}
		}
	}
};
</script>