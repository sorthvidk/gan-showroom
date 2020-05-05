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
		windowContent: {
			type: Array,
			default: [],
			required: true	
		},
		action: {
			type: String,
			default: null,
			required: false	
		},
		actionParam: {
			type: String,
			default: null,
			required: false	
		},
	},
	computed: {
		styleGridRow() {
			return this.positionV + "/" + (this.positionV+1);
		},
		styleGridColumn() {
			return this.positionH + "/" + (this.positionH+1);
		}
	},
	methods: {
		...mapActions([
			OPEN_CONTENT.action
		]),
		onClick() {
			this[OPEN_CONTENT.action](this.windowContent);

			setTimeout(()=>{
				if ( this.action ) {
					if ( this.actionParam ) this.$store.dispatch(this.action,this.actionParam)
					else this.$store.dispatch(this.action);
				}				
			}, 200);
		}
	}
};
</script>