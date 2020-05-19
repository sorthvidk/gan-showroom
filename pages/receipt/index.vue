<template>
	<receipt />
</template>


<script>
import Receipt from '~/components/framework/Receipt.vue'

export default {
	components: {
		Receipt
	},
	head() {
		return {
			script: [
				{ src: 'https://identity.netlify.com/v1/netlify-identity-widget.js' }
			]
		}
	}
}
</script>