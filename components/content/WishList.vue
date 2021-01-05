<template>
	<div class="wish-list">
		<div class="wish-list__overview" v-if="!isMobile">
			<div
				v-for="(value, key, index) in sortedWishlist"
				:key="'wishListGroup' + index"
				:style="{
					display: 'flex',
					flexDirection: 'column',
				}"
			>
				<div class="label">
					{{ authorizedGroups.find((g) => g.groupId === key).name }}
				</div>
				<div
					class="wish-list__overview__item"
					v-for="(item, index) in value"
					:key="'wishListItem' + index"
				>
					<!-- :class="{ 'is-active': currentWishListIndex == index }" -->
					<button
						v-if="item.assets && item.assets.length > 0"
						class="button activate"
						@click="overviewItemActivateHandler(index)"
					>
						<img :src="getImageUrl(index)" alt />
						<p>{{ item.name }}</p>
					</button>
					<button
						class="button remove"
						@click.stop="overviewItemRemoveHandler(index)"
					>
						&times;
					</button>
				</div>
			</div>
		</div>
		<transition name="fade" mode="in-out">
			<div class="wish-list__details" v-if="!isMobile">
				<vue-bar>
					<div class="inner" v-if="wishList.length < 1">
						<p>Your wish list is empty!</p>
					</div>
					<div
						class="inner"
						v-if="
							currentWishListItem &&
							currentWishListItem.assets &&
							currentWishListItem.assets.length > 0
						"
						:key="currentWishListIndex"
					>
						<single-image
							:asset="currentWishListItem.assets[0]"
							:parent-window-id="parentWindowId"
						/>

						<h3>{{ currentWishListItem.name }}</h3>
						<button class="button" @click="removeItemHandler">
							Remove from wishlist
						</button>

						<style-info :item="currentWishListItem" />
					</div>
				</vue-bar>
			</div>
		</transition>
		<div v-if="isMobile">
			<wish-list-accordion
				v-for="(item, key) in wishList"
				:key="'wishListItem' + key"
				:wish-list-item="item"
			/>
		</div>
	</div>
</template>

<script>
import { vuex, mapActions, mapState } from 'vuex'

import { REMOVE_FROM_WISHLIST } from '~/model/constants'

import getCloudinaryUrl from '~/utils/get-cloudinary-url'

import SingleImage from '~/components/content/SingleImage.vue'
import WishListAccordion from '~/components/content/WishListAccordion.vue'
import ViewportSizes from '~/model/viewport-sizes'
import addMediaChangeListener from '~/utils/media-change'

import WindowContent from '~/components/framework/WindowContent.vue'
import VueBar from '~/components/content/VueBar.vue'
import StyleInfo from '~/components/content/StyleInfo.vue'

export default {
	extends: WindowContent,
	name: 'wish-list',
	components: {
		WishListAccordion,
		SingleImage,
		VueBar,
		StyleInfo,
	},
	computed: {
		// ...mapState(['SHOW_WHOLESALE_PRICE']),
		...mapState('utils', ['isMobile']),
		...mapState('collection', ['wishList', 'authorizedGroups']),

		currentWishListItem() {
			if (this.wishList.length > 0)
				return this.wishList[this.currentWishListIndex]
			else this.currentWishListIndex = -1
			return {}
		},

		sortedWishlist() {
			return this.wishList.reduce((acc, cur) => {
				acc[cur.groupId] = acc[cur.groupId] || []
				acc[cur.groupId] = [...acc[cur.groupId], cur]
				return acc
			}, {})
		},
	},
	data() {
		return {
			currentWishListIndex: 0,
			accordionStates: [],
			viewPortSize: ViewportSizes.SMALL,
		}
	},
	methods: {
		...mapActions(['collection/' + REMOVE_FROM_WISHLIST.action]),
		overviewItemActivateHandler(key) {
			this.currentWishListIndex = key
		},
		overviewItemRemoveHandler(key) {
			let styleId = this.wishList[key].styleId
			this.currentWishListIndex = 0
			this['collection/' + REMOVE_FROM_WISHLIST.action](styleId)
		},

		removeItemHandler() {
			let styleId = this.currentWishListItem.styleId
			this.currentWishListIndex = 0
			this['collection/' + REMOVE_FROM_WISHLIST.action](styleId)
		},
		getImageUrl(index) {
			return getCloudinaryUrl(
				this.$cloudinary,
				this.wishList[index].assets[0],
				{ width: 30 }
			)
		},
	},
	mounted() {
		console.log(this.sortedWishlist)
	},
}
</script>
