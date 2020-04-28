<template>
	<div class="shortcut" :style="{ gridColumn: styleGridColumn, gridRow: styleGridRow }">
		<button @click="onClick">
			✅
		</button>
	</div>
</template>

<script>
export default {
	name:'shortcut',
	props: {
		contentComponent: {
			type: String,
			default: '',
			required: true
		},
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
	},
	methods: {
		onClick() {
			console.log("this.component",this.contentComponent);
		}
	}
};
</script>