<template>
	<div class="wish-list">
		<div class="wish-list__overview" v-if="viewPortSize == 1">
			<div v-for="(item, key) in wishList" :key="'wishListItem'+key">
				<button
					v-if="item.assets && item.assets.length > 0"
					class="button"
					:class="{'is-active': currentWishListIndex == key}"
					@click="overviewItemHandler(key)"
				>
					<img :src="item.assets[0].cloudinaryUrl" alt />
					<p>{{item.name}}</p>
				</button>
			</div>
		</div>
		<transition name="fade" mode="in-out">
			<div class="wish-list__details" v-if="viewPortSize == 1">
				<div class="inner" v-if="wishList.length < 1">
					<p>Your wish list is empty!</p>
				</div>
				<div
					class="inner"
					v-if="currentWishListItem.assets && currentWishListItem.assets.length > 0"
					:key="currentWishListIndex"
				>
					<single-image :asset="currentWishListItem.assets[0]" />

					<h3>{{currentWishListItem.name}}</h3>
					<button class="button" @click="removeItemHandler">Move to trash</button>

					<table>
						<tbody>
							<tr>
								<th>Name</th>
								<td>{{currentWishListItem.name}}</td>
							</tr>
							<tr>
								<th>Color</th>
								<td>{{currentWishListItem.colorNames}}</td>
							</tr>
							<tr>
								<th>Materiel</th>
								<td>{{currentWishListItem.material}}</td>
							</tr>
							<tr>
								<th>Style #</th>
								<td>{{currentWishListItem.styleId}}</td>
							</tr>
							<tr>
								<th>Program #</th>
								<td>{{currentWishListItem.program}}</td>
							</tr>
							<tr>
								<th>Program name</th>
								<td>{{currentWishListItem.programName}}</td>
							</tr>

							<tr>
								<th>&nbsp;</th>
								<td>&nbsp;</td>
							</tr>

							<tr>
								<th>Wholesale price</th>
								<td>DKK {{currentWishListItem.wholesalePriceDKK}}</td>
							</tr>
							<tr>
								<th>Wholesale price</th>
								<td>EUR {{currentWishListItem.wholesalePriceEUR}}</td>
							</tr>
							<tr>
								<th>Wholesale price</th>
								<td>USD {{currentWishListItem.wholesalePriceUSD}}</td>
							</tr>

							<tr>
								<th>&nbsp;</th>
								<td>&nbsp;</td>
							</tr>

							<tr>
								<th>Suggested retail price</th>
								<td>DKK {{currentWishListItem.suggestedRetailPriceDKK}}</td>
							</tr>
							<tr>
								<th>Suggested retail price</th>
								<td>EUR {{currentWishListItem.suggestedRetailPriceEUR}}</td>
							</tr>
							<tr>
								<th>Suggested retail price</th>
								<td>USD {{currentWishListItem.suggestedRetailPriceUSD}}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</transition>
		<div v-if="viewPortSize == 0">
			<wish-list-accordion
				v-for="(item, key) in wishList"
				:key="'wishListItem'+key"
				:wish-list-item="item"
			/>
		</div>
	</div>
</template>

<script>
import { vuex, mapActions, mapState } from 'vuex'

import { REMOVE_FROM_WISHLIST } from '~/model/constants'

import SingleImage from '~/components/content/SingleImage.vue'
import WishListAccordion from '~/components/content/WishListAccordion.vue'
import ViewportSizes from '~/model/viewport-sizes'
import addMediaChangeListener from '~/utils/media-change'

export default {
	name: 'wish-list',
	components: {
		WishListAccordion,
		SingleImage
	},
	computed: {
		...mapState({
			wishList: state => state.collection.wishList
		}),
		currentWishListItem() {
			if (this.wishList.length > 0)
				return this.wishList[this.currentWishListIndex]
			else this.currentWishListIndex = -1
			return {}
		}
	},
	data() {
		return {
			currentWishListIndex: 0,
			accordionStates: [],
			viewPortSize: ViewportSizes.SMALL
		}
	},
	methods: {
		...mapActions(['collection/' + REMOVE_FROM_WISHLIST.action]),
		overviewItemHandler(key) {
			this.currentWishListIndex = key
		},
		removeItemHandler() {
			let removeItem = this.currentWishListItem
			this.currentWishListIndex = 0
			this['collection/' + REMOVE_FROM_WISHLIST.action](removeItem)
		},
		isSmallViewport() {
			this.viewPortSize = ViewportSizes.SMALL
		},
		isLargeViewport() {
			this.viewPortSize = ViewportSizes.LARGE
		}
	},
	mounted() {
		let isMobile = addMediaChangeListener(
			this.isSmallViewport,
			this.isLargeViewport
		)
		if (!isMobile) {
			this.viewPortSize = ViewportSizes.LARGE
		}
	}
}
</script>