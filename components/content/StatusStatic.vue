<template>
	<p>{{text}}</p>
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