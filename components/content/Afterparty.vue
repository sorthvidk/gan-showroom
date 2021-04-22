<template>
	<div class="afterparty">
		<div
			:class="[`afterparty__${item.sideBySide ? 'multiple' : 'gallery'}`]"
			v-for="item in items"
			:key="item.slug"
		>
			<div class="afterparty__multiple__item" v-if="item.sideBySide">
				<img
					v-for="i in 7 * 4"
					:key="'jhdfdfdffjsdf' + i"
					:src="getMediaUrl('image', sideBySide.cloudinaryUrl).src"
					alt=""
				/>
			</div>
			<div
				class="afterparty__gallery__item"
				v-else
				v-for="(image, i) in item.cloudinaryUrl"
				:key="'jhfjsdf' + i"
			>
				<img :src="getMediaUrl('image', image).src" alt="" />
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

export default {
	name: 'afterparty',
	components: {
		HorizontalBanner,
	},
	computed: {
		...mapState('assets', ['lookBook']),
		...mapState('afterparty', ['items']),
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
	mounted() {
		console.log('afterparty-items', this.items)
	},
}
</script>