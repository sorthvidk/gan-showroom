<template>
	<div class="fullpage-slide-show">
		<div class="col" v-for="(_, i) in [...Array(cols)]" :key="`col${i}`">
			<div
				v-for="(_, j) in [1, 2]"
				:key="`wrap-overlap${j}`"
				:style="{ animationPlayState: animate ? 'running' : 'paused' }"
			>
				<div class="gap" />
				<div
					v-for="(asset, x) in filteredContent(i === 1 || i === 2 ? i : i + 1)"
					:key="asset.assetId"
					:class="{ withGap: randomNumbers[i + 1 * x] > 0.5 }"
				>
					<img
						v-if="asset.type === 'image'"
						:src="getMediaUrl(asset.type, asset.cloudinaryUrl)"
					/>
					<video
						v-if="asset.type === 'video'"
						:src="getMediaUrl(asset.type, asset.cloudinaryUrl)"
						preload
						loop
						muted
						autoplay
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import getCloudinaryUrl from '~/utils/get-cloudinary-url'

export default {
	name: 'fullpage-slide-show',
	props: { animate: { type: Boolean, defaults: false, required: false } },
	data: () => ({ cols: 4 }),
	computed: {
		...mapState('collection', ['allMediaAssets']),
		randomNumbers() {
			// first element always 0
			return [0, ...[...Array(200)].map(Math.random)]
		}
	},
	methods: {
		getMediaUrl(type, cloudinaryUrl) {
			return getCloudinaryUrl(
				this.$cloudinary,
				{ type, cloudinaryUrl },
				{ width: 200 },
				2
			)
		},
		// used for demo, to give each col random images
		filteredContent(n) {
			return this.allMediaAssets.filter((item, i) => (n + i) % 2 === 0)
		}
	}
}
</script>