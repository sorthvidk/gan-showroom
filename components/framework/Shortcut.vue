<template>
	<div class="shortcut" :style="{ gridColumn: styleGridColumn, gridRow: styleGridRow }">
		<button @click="onClick">
			📂
		</button>
	</div>
</template>

<script>
import { vuex, mapActions, mapState } from 'vuex'
import { OPEN_CONTENT } from '~/store/constants'

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
		},
		shortcutId: {
			type: String,
			default: null,
			required: true	
		},
		contentId: {
			type: String,
			default: null,
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
		...mapActions([
			OPEN_CONTENT.action
		]),
		onClick() {
			this[OPEN_CONTENT.action]([this.contentId]);
		}
	}
};
</script>