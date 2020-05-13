<template>
	<div class="gallery-video">
		<video-player :video-url="assetUrl" :controls="true" />
	</div>
</template>

<script>
import VideoPlayer from '~/components/content/VideoPlayer.vue'
import getCloudinaryUrl from '~/utils/cloudinary-url'

export default {
	name:'gallery-video',
	components: {
		VideoPlayer
	},
	props: {
		asset: {
			type: Object,
			required: true
		},
		focused: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		assetUrl() {
			return getCloudinaryUrl(this.asset);
		}
	},
	mounted() {
		if ( this.focused ) {
			setTimeout(()=> this.$el.scrollIntoView({behavior:'smooth'}), 500);
		}
	}
};
</script>