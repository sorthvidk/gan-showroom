<template>
	<button class="collection-item" @click.stop="onItemClick" ref="parent">
		<img
			v-if="!canvasHover"
			v-lazy="imageUrl"
			:alt="`An image of ${imageName}`"
		/>
		<!-- <img :src="imageUrl.src" :alt="`An image of ${imageName}`" /> -->

		<div v-if="!canvasHover && imageUrl2" class="collection-item__extra">
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

		<responsible-icon v-if="responsible === true || responsible === 'SAND'" />

		<span class="on-wishlist" v-if="onWishList">
			<svg-icon name="checkmark" />
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
import { hoverEffect } from '~/components/transitions/hover'
import displacementImage from '~/static/img/smiley-bw.png'

export default {
	name: 'collectionItem',
	components: { ResponsibleIcon, VideoPlayer },
	props: {
		...CollectionItemModel,
		canvasHover: { type: Boolean, default: false },
	},
	data: () => ({
		greyPixel,
	}),
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
				loading: this.greyPixel,
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

			console.log(this.assets)
		},
	},
	mounted() {
		if (this.canvasHover && this.imageUrl2) {
			console.log('canvasHover', this.styleId)
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