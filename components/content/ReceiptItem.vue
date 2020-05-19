<template>
	<div class="receipt-item" style="padding: 1em;">
		<img
			style="width: 4cm; float: left; padding-bottom: 1em;"
			:src="receiptItem.assets[0].cloudinaryUrl"
			alt
		/>

		<p style="padding-left: 1em; font-size: 2em; float: left;">{{receiptItem.name}}</p>
		<table width="100%" style="text-align: left;">
			<tr style="color: #666;">
				<th>Color</th>
				<th>Style #</th>
				<th>Program #</th>
			</tr>
			<tr>
				<th>{{receiptItem.styleId}}</th>
				<th>{{receiptItem.colorNames}}</th>
				<th>{{receiptItem.program}}</th>
			</tr>
		</table>
	</div>
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