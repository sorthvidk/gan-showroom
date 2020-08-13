<template>
	<div
		class="wish-list__accordion"
		style="page-break-after: avoid;"
		:class="{'is-active': isActive}"
	>
		<button class="trigger" @click="triggerHandler">
			<img :src="imageUrl" alt />
			<span>
				<p>{{wishListItem.styleItem.name}}</p>
				<em>{{wishListItem.styleItem.styleId}}</em>
			</span>
			<span class="icon" v-if="isActive">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
					<path d="M22.6 19.8L15 12.1l-7.6 7.7-.7-.7 8.3-8.4 8.4 8.4z" />
				</svg>
			</span>
			<span class="icon" v-if="!isActive">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
					<path d="M15 20.2l-8.4-8.4.8-.7 7.6 7.7 7.6-7.7.7.7z" />
				</svg>
			</span>
		</button>

		<div class="content" :key="isActive">
			<div class="inner">
				<button class="button" @click="removeItemHandler">Remove from wishlist</button>

				<table>
					<tbody>
						<tr>
							<th>Color</th>
							<td>{{wishListItem.styleItem.colorNames}}</td>
						</tr>
						<tr>
							<th>Material</th>
							<td>{{wishListItem.styleItem.material}}</td>
						</tr>
						<tr>
							<th>Style #</th>
							<td>{{wishListItem.styleItem.styleId}}</td>
						</tr>
						<tr>
							<th>Program #</th>
							<td>{{wishListItem.styleItem.program}}</td>
						</tr>
						<tr>
							<th>Program name</th>
							<td>{{wishListItem.styleItem.programName}}</td>
						</tr>

						<tr>
							<th>&nbsp;</th>
							<td>&nbsp;</td>
						</tr>

						<tr>
							<th>Wholesale price</th>
							<td>DKK {{wishListItem.styleItem.wholesalePriceDKK}}</td>
						</tr>
						<tr>
							<th>Wholesale price</th>
							<td>EUR {{wishListItem.styleItem.wholesalePriceEUR}}</td>
						</tr>
						<tr>
							<th>Wholesale price</th>
							<td>USD {{wishListItem.styleItem.wholesalePriceUSD}}</td>
						</tr>

						<tr>
							<th>&nbsp;</th>
							<td>&nbsp;</td>
						</tr>

						<tr>
							<th>Suggested retail price</th>
							<td>DKK {{wishListItem.styleItem.retailPriceDKK}}</td>
						</tr>
						<tr>
							<th>Suggested retail price</th>
							<td>EUR {{wishListItem.styleItem.retailPriceEUR}}</td>
						</tr>
						<tr>
							<th>Suggested retail price</th>
							<td>USD {{wishListItem.styleItem.retailPriceUSD}}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
import { vuex, mapActions, mapState } from 'vuex'
import { REMOVE_FROM_WISHLIST } from '~/model/constants'

import getCloudinaryUrl from '~/utils/get-cloudinary-url'

export default {
	name: 'wish-list-accordion',
	props: {
		wishListItem: {
			type: Object,
			default: ''
		},
		largeImages: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			isActive: false
		}
	},
	computed: {
		imageUrl() {
			return getCloudinaryUrl(
				this.$cloudinary,
				this.wishListItem.styleItem.assets[0],
				!this.largeImages ? { width: 30 } : {}
			)
		}
	},
	methods: {
		...mapActions('collection', [REMOVE_FROM_WISHLIST.action]),
		removeItemHandler() {
			this[REMOVE_FROM_WISHLIST.action](this.wishListItem)
		},
		triggerHandler() {
			this.isActive = !this.isActive
		}
	}
}
</script>