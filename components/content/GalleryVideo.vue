<template>
	<div class="gallery-video">
		<video-player videoUrl="videoUrl" />
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
		videoUrl() {
			return getCloudinaryUrl(this.asset);
		}
	},
	mounted() {
		if ( this.focused ) {
			this.$el.scrollIntoView();
		}
	}
};
</script>