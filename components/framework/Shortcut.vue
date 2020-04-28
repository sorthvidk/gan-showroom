<template>
	<div class="shortcut" :style="{ gridColumn: styleGridColumn, gridRow: styleGridRow }">
		🅰️
	</div>
</template>

<script>
export default {
	name:'shortcut',
	props: {
		positionH: {
			type: Number,
			default: 0,
			required: true
		},
		positionV: {
			type: Number,
			default: 0,
			required: true
		},
		widthSpan: {
			type: Number,
			default: 2,
			required: true	
		}
	},
	computed: {
		styleGridRow() {
			return this.positionV + "/" + (this.positionV+this.widthSpan);
		},
		styleGridColumn() {
			return this.positionH + "/" + (this.positionH+this.widthSpan);
		}
	}
};
</script>