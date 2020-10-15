<template>
	<div class="slide-show">
		<div class="col" v-for="(col, i) in [...Array(4)]" :key="'grid-column' + i">
			<div v-for="(foo, j) in [1, 2]" :key="'wrap-overlap' + j">
				<img
					v-for="asset in filteredLookBook(i === 1 || i === 2 ? i : i + 1)"
					:key="asset.assetId"
					:src="getMediaUrl(asset.type, asset.cloudinaryUrl)"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import getCloudinaryUrl from '~/utils/get-cloudinary-url'

export default {
	name: 'login-slide-show',
	computed: {
		...mapState('assets', ['lookBook'])
	},
	methods: {
		getMediaUrl(type, cloudinaryUrl) {
			return getCloudinaryUrl(
				this.$cloudinary,
				{ type, cloudinaryUrl },
				{ width: 300 },
				2
			)
		},
		filteredLookBook(n) {
			return this.lookBook.filter((item, i) => (n + i) % 2 === 0)
		}
	}
}
</script>