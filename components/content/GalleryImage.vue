<template>
	<div class="gallery-image">
		<img v-lazy="imageUrl" alt="img">
	</div>
</template>

<script>

import getCloudinaryUrl from '~/utils/cloudinary-url'

export default {
	name:'gallery-image',
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
		imageUrl() {
			return getCloudinaryUrl(this.$cloudinary, this.asset);
		}
	},
	mounted() {
		if ( this.focused ) {
			setTimeout(()=> this.$el.scrollIntoView({behavior:'smooth'}), 500);
		}
	}
};
</script>