<template>
	<div class="afterparty">
		<div
			:class="[`afterparty__${item.sideBySide ? 'multiple' : 'gallery'}`]"
			v-for="item in content"
			:key="item.slug"
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
			<horizontal-banner v-if="item.quote">
				<div class="afterparty__quote">
					<figure>
						<blockquote>
							<p>
								<span>
									{{ item.quote }}
								</span>
							</p>
						</blockquote>
						<figcaption>
							<cite><span>- Ditte Reffstrup</span></cite>
						</figcaption>
					</figure>
				</div>
			</horizontal-banner>
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
				.sort((item) => (!item.sideBySide < item.sideBySide ? 1 : -1))
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