<template>
	<div class="status-bar">
		<p><strong>{{completePct}}% COMPLETE - </strong>{{text}}</p>
		<span class="fill" :style="{width: completePct+'%'}">&nbsp;</span>
	</div>
</template>

<script>

import { vuex, mapActions, mapState } from 'vuex'
import { PROGRESS_UPDATE } from '~/model/constants'

export default {
	name:'status-bar',
	props: {
		textStart: {
			type: String,
			default: ''
		},
		textProgress: {
			type: String,
			default: ''
		},
		textEnd: {
			type: String,
			default: ''
		}
	},	
	computed: {
		...mapState({
			completePct: state => state.collection.completedPct
		}),
		text() {
			if ( this.completePct == 0 ) return this.textStart;
			else if (this.completePct == 100 ) return this.textProgress;
			else return this.textEnd;
		}
	}
};
</script>