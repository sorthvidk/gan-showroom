<template>
	<div class="wish-list">
		<div class="wish-list__overview" v-if="viewPortSize.name == 'LARGE'">
			<div class="wish-list__overview__item" v-for="(item, index) in wishList" :key="'wishListItem'+index" :class="{'is-active': currentWishListIndex == index}">
				<button v-if="item.styleItem.assets && item.styleItem.assets.length > 0" class="button activate" @click="overviewItemActivateHandler(index)">
					<img :src="getImageUrl(index)" alt />
					<p>{{item.styleItem.name}}</p>
				</button>
				<button class="button remove" @click.stop="overviewItemRemoveHandler(index)">
					<span class="icon">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
							<path
								d="M15.7 15l7.8-7.8-.7-.7-7.8 7.8-7.8-7.8-.7.7 7.8 7.8-7.8 7.8.7.7 7.8-7.8 7.8 7.8.7-.7-7.8-7.8z"
							/>
						</svg>
					</span>
				</button>
			</div>
		</div>
		<transition name="fade" mode="in-out">
			<div class="wish-list__details" v-if="viewPortSize.name == 'LARGE'">
				<div class="inner" v-if="wishList.length < 1">
					<p>Your wish list is empty!</p>
				</div>
				<div
					class="inner"
					v-if="currentWishListItem && currentWishListItem.styleItem && currentWishListItem.styleItem.assets && currentWishListItem.styleItem.assets.length > 0"
					:key="currentWishListIndex"
				>
					<single-image :asset="currentWishListItem.styleItem.assets[0]" :parent-window-id="parentWindowId" />

					<h3>{{currentWishListItem.name}}</h3>
					<button class="button" @click="removeItemHandler">Remove from wishlist</button>

					<table>
						<tbody>
							<tr>
								<th>Name</th>
								<td>{{currentWishListItem.styleItem.name}}</td>
							</tr>
							<tr>
								<th>Color<span v-if="hasMoreColors">(s)</span></th>
								<td>
									<span v-if="hasMoreColors" v-for="(item, key) in currentWishListItem.chosenColorList" :key="item"><span v-if="key > 0">, </span>{{item}}</span>
									<button v-if="hasMoreColors" class="button" @click="editColorsHandler">Edit colors</button>
									<span v-else>{{currentWishListItem.styleItem.colorNames}}</span>
								</td>										
							</tr>
							<tr>
								<th>Material</th>
								<td>{{currentWishListItem.styleItem.material}}</td>
							</tr>
							<tr>
								<th>Style #</th>
								<td>{{currentWishListItem.styleItem.styleId}}</td>
							</tr>
							<tr>
								<th>Program #</th>
								<td>{{currentWishListItem.styleItem.program}}</td>
							</tr>
							<tr>
								<th>Program name</th>
								<td>{{currentWishListItem.styleItem.programName}}</td>
							</tr>

							<tr>
								<th>&nbsp;</th>
								<td>&nbsp;</td>
							</tr>

							<tr>
								<th>Wholesale price</th>
								<td>DKK {{currentWishListItem.styleItem.wholesalePriceDKK}}</td>
							</tr>
							<tr>
								<th>Wholesale price</th>
								<td>EUR {{currentWishListItem.styleItem.wholesalePriceEUR}}</td>
							</tr>
							<tr>
								<th>Wholesale price</th>
								<td>USD {{currentWishListItem.styleItem.wholesalePriceUSD}}</td>
							</tr>

							<tr>
								<th>&nbsp;</th>
								<td>&nbsp;</td>
							</tr>

							<tr>
								<th>Suggested retail price</th>
								<td>DKK {{currentWishListItem.styleItem.retailPriceDKK}}</td>
							</tr>
							<tr>
								<th>Suggested retail price</th>
								<td>EUR {{currentWishListItem.styleItem.retailPriceEUR}}</td>
							</tr>
							<tr>
								<th>Suggested retail price</th>
								<td>USD {{currentWishListItem.styleItem.retailPriceUSD}}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</transition>
		<div v-if="viewPortSize.name == 'SMALL'">
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

import { UPDATE_WISHLIST, REMOVE_FROM_WISHLIST, TOGGLE_COLOR_PICKER } from '~/model/constants'

import getCloudinaryUrl from '~/utils/get-cloudinary-url'

import SingleImage from '~/components/content/SingleImage.vue'
import WishListAccordion from '~/components/content/WishListAccordion.vue'
import ViewportSizes from '~/model/viewport-sizes'
import addMediaChangeListener from '~/utils/media-change'

import WindowContent from '~/components/framework/WindowContent.vue'

export default {
	extends: WindowContent,
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
		},
		hasMoreColors() {
			console.log("this.currentWishListIndex",this.currentWishListIndex)
			let colorList = this.currentWishListItem.styleItem.colorNames.split(', ');
			return colorList.length > 1
		}
	},
	watch: {
		wishList(newVal) {
			//wishlist updated
			if ( newVal ) {
				this.overviewItemActivateHandler(0)
			}
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
		...mapActions([
			'collection/' + UPDATE_WISHLIST.action,
			'collection/' + TOGGLE_COLOR_PICKER.action,
			'collection/' + REMOVE_FROM_WISHLIST.action
		]),
		overviewItemActivateHandler(key) {
			this.currentWishListIndex = key
		},
		overviewItemRemoveHandler(key) {
			let removeItem = this.wishList[key].styleItem
			this.currentWishListIndex = 0
			this['collection/' + REMOVE_FROM_WISHLIST.action](removeItem)
		},
		removeItemHandler() {
			let removeItem = this.currentWishListItem.styleItem
			this.currentWishListIndex = 0
			this['collection/' + REMOVE_FROM_WISHLIST.action](removeItem)
		},
		isSmallViewport() {
			this.viewPortSize = ViewportSizes.SMALL
		},
		isLargeViewport() {
			this.viewPortSize = ViewportSizes.LARGE
		},
		getImageUrl(index) {
			return getCloudinaryUrl(this.$cloudinary, this.wishList[index].styleItem.assets[0], {width: 30});
		},
		editColorsHandler() {
			this['collection/' + TOGGLE_COLOR_PICKER.action]({
				styleItem: this.currentWishListItem.styleItem,
				chosenColorList: this.currentWishListItem.chosenColorList,
				callbackFunction: this.colorsEditingDone
			})
		},
		colorsEditingDone(styleItem, chosenColorList) {
			console.log("colorsEditingDone",styleItem, chosenColorList)
			this['collection/' + UPDATE_WISHLIST.action]( {styleItem:styleItem, chosenColorList:chosenColorList} )
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