<template>
	<button class="collection-item" @click.stop="onItemClick" ref="parent">
		<img
			v-if="!canvasHover"
			v-lazy="imageUrl"
			:alt="`An image of ${imageName}`"
		/>
		<!-- <img :src="imageUrl.src" :alt="`An image of ${imageName}`" /> -->

		<div v-if="!canvasHover && imageUrl2" class="collection-item__extra">
			<img v-if="!isVideo(assets[1])" v-lazy="imageUrl2" :alt="imageName" />
			<video autoplay muted loop v-else :src="imageUrl2.src"></video>
		</div>
		<p>{{ imageName }}</p>

		<responsible-icon v-if="responsible === true || responsible === 'SAND'" />

		<span class="on-wishlist" v-if="onWishList">
			<svg-icon name="checkmark" />
		</span>
	</button>
</template>


<script>
import { mapActions, mapState } from 'vuex'
import { OPEN_STYLE_CONTENT } from '~/model/constants'
import CollectionItemModel from '~/model/collection-item'

import ResponsibleIcon from '~/components/content/ResponsibleIcon.vue'
import VideoPlayer from '~/components/content/VideoPlayer.vue'

import getCloudinaryUrl from '~/utils/get-cloudinary-url'
import sendTracking from '~/utils/send-tracking'
import { greyPixel } from '~/utils/placeholders'
import { hoverEffect } from '~/components/transitions/hover'
import displacementImage from '~/static/img/smiley-bw.png'
import { isVideo } from '~/utils/is-video'

export default {
	name: 'collectionItem',
	components: { ResponsibleIcon, VideoPlayer },
	props: {
		...CollectionItemModel,
		canvasHover: { type: Boolean, default: false },
	},
	data: () => ({
		greyPixel,
		isVideo,
	}),
	computed: {
		...mapState('collection', ['wishList']),
		imageUrl() {
			if (!this.assets || !this.assets.length) {
				return ''
			}

			return {
				src: getCloudinaryUrl(this.$cloudinary, this.assets[0], {
					width: window.innerWidth < 600 ? 320 : 720,
				}),
				loading: this.greyPixel,
			}
		},
		imageUrl2() {
			if (!this.assets || this.assets.length < 2) {
				return
			}

			return {
				src: getCloudinaryUrl(this.$cloudinary, this.assets[1], {
					width: window.innerWidth < 600 ? 320 : 720,
				}),
				loading: this.greyPixel,
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

			// console.log(this.assets)
		},
	},
	mounted() {
		if (this.canvasHover && this.imageUrl2) {
			// console.log('canvasHover', this.styleId)
			new hoverEffect({
				parent: this.$refs.parent,
				image1: this.imageUrl.src,
				image2: this.imageUrl2.src,
				displacementImage,
				intensity: 0.2,
				// speedIn: 0.6,
				// speedOut: 0.6,
			})
		}
	},
}
</script>