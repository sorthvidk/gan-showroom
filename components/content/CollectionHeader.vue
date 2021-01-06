<template>
	<div class="collection-header">
		<div class="inner">
			<div class="image">
				<img v-if="!group.cloudinaryUrl" :src="greyPx" />
				<img v-else v-lazy="image" />
			</div>
			<p v-html="group.text || group.name" />
		</div>
	</div>
</template>

<script>
import getCloudinaryUrl from '~/utils/get-cloudinary-url'
import { greyPx } from '~/utils/grey-px'
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
			return {
				src: getCloudinaryUrl(this.$cloudinary, this.group),
				loading: greyPx,
			}
		},
	},
}
</script>