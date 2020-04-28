<template>
	<div class="shortcut" :style="{ gridColumn: styleGridColumn, gridRow: styleGridRow }">
		<button @click="onClick">
			✅
		</button>
	</div>
</template>

<script>
import { vuex, mapActions, mapState } from 'vuex'
import { ACTIVATE_SHORTCUT } from '~/store/constants'

export default {
	name:'shortcut',
	props: {
		isActivated: {
			type: Boolean,
			default: false,
			required: true
		},
		contentComponent: {
			type: String,
			default: '',
			required: true
		},	
		contentProps: {
			type: Object,
			default: null,
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
		},
		id: {
			type: String
		}
	},
	data() {
		return {
			activated: false
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
			ACTIVATE_SHORTCUT.action
		]),
		onClick() {
			this[ACTIVATE_SHORTCUT.action](this.id);
		}
	}
};
</script>