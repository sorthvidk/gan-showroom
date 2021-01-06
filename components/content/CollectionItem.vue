<template>
	<button class="collection-item" @click.stop="onItemClick">
		<img v-lazy="imageUrl" :alt="`An image of ${imageName}`" />
		<!-- <img :src="imageUrl.src" :alt="`An image of ${imageName}`" /> -->

		<div v-if="imageUrl2" class="collection-item__extra">
			<img
				v-if="assets[1].type === 'image'"
				v-lazy="imageUrl2"
				:alt="imageName"
			/>
			<video
				autoplay="true"
				muted="true"
				loop="true"
				v-if="assets[1].type === 'video'"
				:src="imageUrl2.src"
			></video>
		</div>
		<p>{{ imageName }}</p>

		<responsible-icon v-if="responsible" />

		<span class="on-wishlist" v-if="onWishList">
			<svg
				class="checkmark"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 78.4 78.4"
			>
				<path
					d="M78 19L29.5 67.6a1 1 0 01-1.6 0L.3 40a1 1 0 010-1.5L7 31.8c.5-.5 1.1-.5 1.6 0l20 20 41.2-41c.4-.5 1.1-.5 1.5 0l6.7 6.7a1 1 0 010 1.5z"
				/>
			</svg>
		</span>
	</button>
</template>


<script>
import { vuex, mapActions, mapState } from 'vuex'
import { OPEN_STYLE_CONTENT } from '~/model/constants'
import CollectionItemModel from '~/model/collection-item'
import capitalize from 'lodash/capitalize'

import ResponsibleIcon from '~/components/content/ResponsibleIcon.vue'
import VideoPlayer from '~/components/content/VideoPlayer.vue'

import getCloudinaryUrl from '~/utils/get-cloudinary-url'
import sendTracking from '~/utils/send-tracking'
import { greyPixel } from '~/utils/placeholders'

export default {
	name: 'collectionItem',
	components: { ResponsibleIcon, VideoPlayer },
	props: CollectionItemModel,
	computed: {
		...mapState({
			wishList: (state) => state.collection.wishList,
		}),
		imageUrl() {
			if (!this.assets || !this.assets.length) {
				return ''
			}

			return {
				src: getCloudinaryUrl(this.$cloudinary, this.assets[0], {
					width: Math.floor(window.innerWidth / 4),
				}),
				loading:
					'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8df3KfwAIngOGGPuXAwAAAABJRU5ErkJggg==',
			}
		},
		imageUrl2() {
			if (!this.assets || this.assets.length < 2) {
				return
			}

			return {
				src: getCloudinaryUrl(this.$cloudinary, this.assets[1], {
					width: Math.floor(window.innerWidth / 4),
				}),
				loading: greyPixel,
			}
		},
		imageName() {
			if (this.assets && this.assets[0]) return this.name
			return this.name + " | 0 assets, can't open"
		},
		onWishList() {
			return this.wishList.filter((e) => e.styleId === this.styleId).length > 0
		},
	},
	methods: {
		...mapActions([OPEN_STYLE_CONTENT.action]),
		onItemClick() {
			sendTracking('Product click', this.styleId)

			this[OPEN_STYLE_CONTENT.action](this.styleId)
		},
	},
	mounted() {},
}
</script>