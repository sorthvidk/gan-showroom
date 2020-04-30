<template>
	<div class="status-bar">
		<p><strong>{{completePct}}% COMPLETE - </strong>{{text}}</p>
	</div>
</template>

<script>

export default {
	name:'status-bar',
	props: {
		text: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			completePct: 42
		}
	}
};
</script>