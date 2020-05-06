<template>
	<div class="gallery-image">
		<img :src="imageUrl" alt="img">
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
			return getCloudinaryUrl(this.asset);
		}
	},
	mounted() {
		console.log("this.focused",this.focused)
		if ( this.focused ) {
			this.$el.scrollIntoView();
		}
	}
};
</script>