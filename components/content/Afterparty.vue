<template>
	<div class="afterparty">
		<div
			v-for="(item, idx) in content"
			:key="item.slug"
			:class="[
				`afterparty__${
					item.sideBySide ? 'multiple' : idx === 0 ? 'gallery' : 'gallery-2'
				}`,
			]"
		>
			<div class="afterparty__multiple__item" v-if="item.sideBySide">
				<div v-for="i in 7 * 4" :key="'jhdfdfdffjsdf' + i">
					<img
						v-if="!item.cloudinaryUrl[0].video"
						:src="getMediaUrl('image', item.cloudinaryUrl[0].url).src"
						alt=""
					/>
					<video
						v-else
						:src="getMediaUrl('video', item.cloudinaryUrl[0].url).src"
						preload
						muted
						controls
						loop
					/>
				</div>
			</div>
			<div
				class="afterparty__gallery__item"
				v-else
				v-for="(media, i) in item.cloudinaryUrl"
				:key="'jhfjsdf' + i"
			>
				<img
					v-if="!media.video"
					:src="getMediaUrl('image', media.url).src"
					alt=""
				/>
				<video
					v-else
					:src="getMediaUrl('video', media.url).src"
					preload
					muted
					autoplay
					loop
				/>
			</div>
			<horizontal-banner v-if="item.quote" :text="item.quote" />
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import getCloudinaryUrl from '~/utils/get-cloudinary-url'
import HorizontalBanner from '~/components/content/HorizontalBanner.vue'
import { isVideo } from '~/utils/is-video'

export default {
	name: 'afterparty',
	components: {
		HorizontalBanner,
	},
	computed: {
		...mapState('afterparty', ['items']),
		content() {
			return this.items
				.map((item) => {
					return {
						...item,
						cloudinaryUrl: item.cloudinaryUrl.map((url) => {
							return { url, video: isVideo(url) }
						}),
					}
				})
				.sort((a, b) => (a.order > b.order ? 1 : -1))
		},
	},
	methods: {
		getMediaUrl(type, cloudinaryUrl) {
			return {
				src: getCloudinaryUrl(
					this.$cloudinary,
					{ type, cloudinaryUrl },
					{ width: window.innerWidth < 600 ? 150 : 400 }
				),
			}
		},
	},
	mounted() {
		// console.log(this.content)
	},
}
</script>