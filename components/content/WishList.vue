<template>
	<div class="wish-list">
		<div class="wish-list__overview" v-if="!isMobile">
			<div
				v-for="(list, groupId, index) in sortedWishlist"
				:key="'wishListGroup' + index"
				:style="{
					display: 'flex',
					flexDirection: 'column',
				}"
			>
				<div class="label">
					{{ authorizedGroups.find((g) => g.groupId === groupId).name }}
				</div>
				<div
					class="wish-list__overview__item"
					v-for="(item, index) in list"
					:key="'wishListItem' + index"
				>
					<!-- :class="{ 'is-active': currentWishListIndex == index }" -->
					<button
						v-if="item.assets && item.assets.length > 0"
						class="button activate"
						@click="overviewItemActivateHandler(groupId, index)"
					>
						<img :src="getImageUrl(groupId, index)" alt />
						<p>{{ item.name }}</p>
					</button>
					<button
						class="button remove"
						@click.stop="overviewItemRemoveHandler(groupId, index)"
					>
						<svg-icon name="cross" />
					</button>
				</div>
			</div>
		</div>
		<transition name="fade" mode="in-out">
			<div class="wish-list__details" v-if="!isMobile">
				<div class="inner empty" v-if="wishList.length < 1">
					<p>Your wish list is empty!</p>
				</div>
				<div
					class="inner"
					v-if="curStyle && curStyle.assets && curStyle.assets.length > 0"
					:key="'wishlist-details-' + curStyle.styleId"
				>
					<single-image
						:asset="curStyle.assets[0]"
						:parent-window-id="parentWindowId"
						:lazy="true"
					/>

					<h3>{{ curStyle.name }}</h3>
					<button class="button" @click="removeItemHandler">
						Remove from wishlist
					</button>

					<style-info :item="curStyle" />
				</div>
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
import { firstIndex } from '~/utils/array-helpers'

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

		sortedWishlist() {
			return this.wishList.reduce((acc, cur) => {
				acc[cur.groupId] = acc[cur.groupId] || []
				acc[cur.groupId] = [...acc[cur.groupId], cur]
				return acc
			}, {})
		},

		curStyle() {
			console.log('curStyle', Object.keys(this.sortedWishlist))
			if (!Object.keys(this.sortedWishlist).length) return

			const [firstStyle] = Object.values(this.sortedWishlist)[0]
			if (!this.cur.groupId) return firstStyle
			return this.sortedWishlist[this.cur.groupId][this.cur.idx]
		},
	},
	data() {
		return {
			cur: 0,
			accordionStates: [],
			viewPortSize: ViewportSizes.SMALL,
		}
	},
	methods: {
		...mapActions(['collection/' + REMOVE_FROM_WISHLIST.action]),
		overviewItemActivateHandler(groupId, idx) {
			this.cur = { groupId, idx }
			console.log(this.cur, this.curStyle)
		},
		overviewItemRemoveHandler(groupId, idx) {
			let styleId = this.sortedWishlist[groupId][idx].styleId
			this.cur = { groupId: '', idx: 0 }
			this['collection/' + REMOVE_FROM_WISHLIST.action](styleId)
		},

		removeItemHandler() {
			let styleId = this.cur.styleId
			this.cur = { groupId: '', idx: 0 }
			this['collection/' + REMOVE_FROM_WISHLIST.action](styleId)
		},
		getImageUrl(groupId, index) {
			return getCloudinaryUrl(
				this.$cloudinary,
				this.sortedWishlist[groupId][index].assets[0],
				{ width: 30 }
			)
		},
	},
	mounted() {
		console.log(this.sortedWishlist)
	},
}
</script>
