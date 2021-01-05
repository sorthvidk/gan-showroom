<template>
	<div class="collection-header">
		<div class="inner">
			<img :src="image" />
			<p v-html="group.text || group.name" />
		</div>
	</div>
</template>

<script>
import getCloudinaryUrl from '~/utils/get-cloudinary-url'
export default {
	name: 'collection-header',
	props: {
		group: {
			type: Object,
			default: () => ({}),
		},
	},
	computed: {
		image() {
			return getCloudinaryUrl(this.$cloudinary, this.group)
		},
	},
}
</script>