<template>
	<div :oncontextmenu="__prod__ ? `return false;` : ''">
		<nuxt v-if="rehydrated" />
	</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
	name: 'clean',
	components: {},
	head() {
		return {
			script: [
				{ src: 'https://identity.netlify.com/v1/netlify-identity-widget.js' }
			],
			title: 'Wishlist | GANNI Space'
		}
	},
	data: () => ({}),
	computed: {
		...mapState(['rehydrated']),
		...mapState('utils', ['__prod__'])
	},
	mounted() {
		window.$gtm = this.$gtm
	}
}
</script>
