<template>
	<p v-html="text"></p>
</template>

<script>

export default {
	name:'status-static',
	props: {
		text: {
			type: String,
			default: ''
		}
	}
};
</script>