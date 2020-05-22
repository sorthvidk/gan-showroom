<template>
	<table class="receipt-item">
		<tbody class="receipt-item__content">
			<tr>
				<td rowspan="4" class="image">
					<img style="width: 4cm;" :src="receiptItem.assets[0].cloudinaryUrl" alt />
				</td>
				<td class="title">{{receiptItem.name}}</td>
			</tr>
			<!-- <tr>
			</tr>-->
			<tr style="height: 1em;">
				<td style="color: #666;">Color</td>
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
export default {
	name: 'receipt-item',
	props: {
		receiptItem: {
			type: Object,
			default: ''
		}
	}
}
</script>