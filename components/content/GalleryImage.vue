<template>
	<div class="gallery-image shimmer">
		<!-- <loading /> -->
		<img v-lazy="imageUrl" alt="img" />
	</div>
</template>

<script>
import getCloudinaryUrl from '~/utils/get-cloudinary-url'
import Loading from '~/components/content/Loading.vue'

export default {
	name: 'gallery-image',
	components: { Loading },
	props: {
		asset: {
			type: Object,
			required: true,
		},
		focused: {
			type: Boolean,
			default: false,
		},
	},
	computed: {
		imageUrl() {
			return getCloudinaryUrl(this.$cloudinary, this.asset, {
				width: window.innerWidth,
			})
		},
	},
	mounted() {
		if (this.focused) {
			setTimeout(() => this.$el.scrollIntoView({ behavior: 'smooth' }), 500)
		}
	},
}
</script>