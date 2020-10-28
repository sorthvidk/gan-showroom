<template>
	<div class="progress-bar">
		<p>
			<strong>{{ progressPct }}% COMPLETE - </strong>{{ text }}
		</p>
		<span class="fill" :style="{ width: progressPct + '%' }">&nbsp;</span>
	</div>
</template>

<script>
import { vuex, mapActions, mapState } from 'vuex'

export default {
	name: 'progress-bar',
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
		...mapState('progressBar', ['progressPct']),
		text() {
			if (this.progressPct == 0) return this.textStart
			else if (this.progressPct == 100) return this.textEnd
			else return this.textProgress
		}
	}
}
</script>