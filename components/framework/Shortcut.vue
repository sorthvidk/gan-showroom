<template>
	<button @click="onClick" class="shortcut" :style="{ gridColumn: styleGridColumn, gridRow: styleGridRow }">
		<span class="icon">{{icon}}</span>
		<span class="text">{{label}}</span>
	</button>
</template>

<script>
import { vuex, mapActions, mapState } from 'vuex'
import { OPEN_CONTENT } from '~/model/constants'

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
		icon: {
			type: String,
			default: null,
			required: true	
		},
		label: {
			type: String,
			default: null,
			required: true	
		},
		shortcutId: {
			type: String,
			default: null,
			required: true	
		},
		content: {
			type: Array,
			default: [],
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
			this[OPEN_CONTENT.action](this.content);
			console.log("this.content", this.content)
			if ( this.content.action ) {
				if ( this.content.actionParams ) this.$store.dispatch(this.content.action,this.content.actionParams)
				else this.$store.dispatch(this.content.action);
			}
		}
	}
};
</script>