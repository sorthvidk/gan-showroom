<template>
	<table class="receipt-item">
		<tbody class="receipt-item__content">
			<tr>
				<td rowspan="4" class="image">
					<img style="width: 3.5cm;" :src="imageUrl" alt />
				</td>
				<td colspan="2" class="title">{{receiptItem.name}}</td>
			</tr>
			<!-- <tr>
			</tr>-->
			<tr style="height: 1em;">
				<td style="color: #666; padding-right: 5em;">Color</td>
				<td>{{receiptItem.colorNames}}</td>
				<!-- <th>Program #</th> -->
			</tr>
			<tr>
				<td class="bottom" style="color: #666;">Style #</td>
				<td class="bottom">{{receiptItem.styleId}}</td>
				<!-- <th>{{receiptItem.program}}</th> -->
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