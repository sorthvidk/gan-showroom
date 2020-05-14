<template>
	<reciept />
</template>


<script>
import Reciept from '~/components/framework/Reciept.vue'

export default {
	components: {
		Reciept
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