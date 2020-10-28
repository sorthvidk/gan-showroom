<template>
	<receipt />
</template>

<script>
import Receipt from '~/components/framework/Receipt.vue'

import { INDEX_COLLECTION_DATA } from '~/model/constants'

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
	},
	mounted() {
		this.$store.commit('collection/' + INDEX_COLLECTION_DATA.mutation)
	}
}
</script>
