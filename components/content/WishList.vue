<template>
	<div class="wish-list">
		<div class="wish-list__overview">
			<div v-for="(item, key) in wishList">
				<button v-if="item.assets && item.assets.length > 0" class="button" :class="{'is-active': currentWishListIndex == key}" @click="overviewItemHandler(key)">
					<img :src="item.assets[0].defaultImageUrl" alt="">
					<p>{{item.name}}</p>
				</button>
			</div>
		</div>
		<div class="wish-list__details">
			<transition name="fade" mode="in-out">
				<div class="inner" v-if="currentWishListItem.assets && currentWishListItem.assets.length > 0" :key="currentWishListIndex">
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
			</transition>
		</div>
	</div>
</template>

<script>

import { vuex, mapActions, mapState } from 'vuex'

import { 
	REMOVE_FROM_WISHLIST
} from '~/model/constants'

import SingleImage from '~/components/content/SingleImage.vue'

export default {
	name:'wish-list',
	components: {
		SingleImage
	},
	computed: {
		...mapState({
			wishList: state => state.collection.wishList
		}),
		currentWishListItem() {
			if ( this.wishList.length > 0 ) return this.wishList[this.currentWishListIndex];
			else this.currentWishListIndex = -1;
			return {};
		}
	},
	data() {
		return {
			currentWishListIndex: 0
		}
	},
	methods: {
		...mapActions([
			'collection/'+REMOVE_FROM_WISHLIST.action
		]),
		overviewItemHandler(key) {
			this.currentWishListIndex = key;
		},
		removeItemHandler() {
			let removeItem = this.currentWishListItem;
			this.currentWishListIndex = 0;
			this['collection/'+REMOVE_FROM_WISHLIST.action](removeItem);
		}
	}
};

</script>