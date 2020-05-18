<template>
	<div class="reciept-item" style="padding: 1em;">
		<img
			style="width: 4cm; float: left; padding-bottom: 1em;"
			:src="recieptItem.assets[0].cloudinaryUrl"
			alt
		/>

		<p style="padding-left: 1em; font-size: 2em; float: left;">{{recieptItem.name}}</p>
		<table width="100%" style="text-align: left;">
			<tr style="color: #666;">
				<th>Color</th>
				<th>Style #</th>
				<th>Program #</th>
			</tr>
			<tr>
				<th>{{recieptItem.styleId}}</th>
				<th>{{recieptItem.colorNames}}</th>
				<th>{{recieptItem.program}}</th>
			</tr>
		</table>
	</div>
</template>

<script>
export default {
	name: 'reciept-item',
	props: {
		recieptItem: {
			type: Object,
			default: ''
		}
	}
}
</script>