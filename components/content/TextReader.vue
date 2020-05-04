<template>
	<div class="text-reader">
		<p v-html="text"></p>
	</div>
</template>

<script>

export default {
	name:'text-reader',
	props: {
		text: {
			type: String,
			default: ''
		}
	}
};
</script>