<template>
	<div class="container">
		<nuxt />
	</div>
</template>


<script>

export default {
	name: 'default',
	mounted() {
		window.$gtm = this.$gtm
	}
};
</script>