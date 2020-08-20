<template>
	<table class="receipt-item">
		<tbody class="receipt-item__content">
			<tr>
				<td rowspan="11" class="image">
					<img style="width: 3.6cm;" :src="imageUrl" alt />
				</td>
				<td colspan="2" class="title">{{receiptItem.name}}</td>
			</tr>
			<!-- <tr>
			</tr>-->
			<tr>
				<td style="color: #666; padding-right: 5em;">Color</td>
				<td>{{receiptItem.colorNames}}</td>
			</tr>
			<tr>
				<td style="color: #666;">Style #</td>
				<td>{{receiptItem.styleId}}</td>
			</tr>
			<tr>
				<td style="color: #666;">Program name</td>
				<td>{{receiptItem.programName}}</td>
			</tr>
			<tr>
				<td style="color: #666;">Collection</td>
				<td>{{receiptItem.collectionId}}</td>
			</tr>
			
			<tr>
				<td style="color: #666;">Wholesale price</td>
				<td>DKK {{receiptItem.wholesalePriceDKK}}</td>
			</tr>
			<tr>
				<td style="color: #666;">Wholesale price</td>
				<td>EUR {{receiptItem.wholesalePriceEUR}}</td>
			</tr>
			<tr>
				<td style="color: #666;">Wholesale price</td>
				<td>USD {{receiptItem.wholesalePriceUSD}}</td>
			</tr>
			<tr>
				<td style="color: #666;">Retail price</td>
				<td>DKK {{receiptItem.retailPriceDKK}}</td>
			</tr>
			<tr>
				<td style="color: #666;">Retail price</td>
				<td>EUR {{receiptItem.retailPriceEUR}}</td>
			</tr>
			<tr>
				<td style="color: #666;">Retail price</td>
				<td>USD {{receiptItem.retailPriceUSD}}</td>
			</tr>
		</tbody>
	</table>
</template>

<script>
import getCloudinaryUrl from '~/utils/get-cloudinary-url'

export default {
	name: 'receipt-item',
	props: {
		receiptItem: {
			type: Object,
			default: ''
		}
	},
	computed: {
		imageUrl() {
			return getCloudinaryUrl(this.$cloudinary, this.receiptItem.assets[0], {
				width: 196
			})
		}
	}
}
</script>