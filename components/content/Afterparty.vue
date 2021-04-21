<template>
	<div class="afterparty">
		<div class="afterparty__gallery">
			<div
				v-for="(item, i) in lookBook.filter((_, i) => i < 20)"
				:key="'jhfjsdf' + i"
			>
				<img
					v-if="item.type === 'image'"
					:src="getMediaUrl(item.type, item.cloudinaryUrl).src"
					alt=""
				/>
				<video
					v-if="item.type === 'video'"
					:src="getMediaUrl(item.type, item.cloudinaryUrl).src"
					preload
					muted
					autoplay
					loop
				/>
			</div>
		</div>
		<div class="afterparty__multiple">
			<div v-for="i in 7 * 4" :key="'jhdfdfdffjsdf' + i">
				<img
					v-if="sideBySide.type === 'image'"
					:src="getMediaUrl(sideBySide.type, sideBySide.cloudinaryUrl).src"
					alt=""
				/>
				<video
					v-if="sideBySide.type === 'video'"
					:src="getMediaUrl(sideBySide.type, sideBySide.cloudinaryUrl).src"
					preload
					muted
					autoplay
					loop
				/>
			</div>
		</div>
		<horizontal-banner>
			<div class="afterparty__quote">
				<figure>
					<blockquote>
						<p>
							<span>
								The dancefloor is where the root of my ideas spring from. I
								can't count how many times I have been inspired by beautiful
								people having a great time.
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
</template>
    
<script>
import { mapState } from 'vuex'
import getCloudinaryUrl from '~/utils/get-cloudinary-url'
import HorizontalBanner from '~/components/content/HorizontalBanner.vue'

export default {
	name: 'afterparty',
	components: {
		HorizontalBanner,
	},
	computed: {
		...mapState('assets', ['lookBook']),
		sideBySide() {
			return this.lookBook[20]
		},
	},
	methods: {
		getMediaUrl(type, cloudinaryUrl, { thumbnail } = {}) {
			return {
				src: getCloudinaryUrl(
					this.$cloudinary,
					{ type, cloudinaryUrl },
					{ width: thumbnail ? 100 : window.innerWidth < 600 ? 300 : 900 }
				),
			}
		},
	},
}
</script>