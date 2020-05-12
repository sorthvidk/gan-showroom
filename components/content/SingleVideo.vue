<template>
	<div class="single-video">
		<transition name="fade">
			<video-player :video-url="assetUrl"/>
		</transition>
	</div>
</template>

<script>

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
		}
	}
};
</script>