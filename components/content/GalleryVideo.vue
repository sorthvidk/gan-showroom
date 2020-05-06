<template>
	<div class="gallery-video">
		VIDEO
	</div>
</template>

<script>
import getCloudinaryUrl from '~/utils/cloudinary-url'

export default {
	name:'gallery-video',
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
	mounted() {
		if ( this.focused ) {
			this.$el.scrollIntoView();
		}
	}
};
</script>