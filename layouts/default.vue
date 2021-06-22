<template>
	<nuxt v-if="rehydrated" />
</template>

<script>
import { mapState } from 'vuex'

export default {
	name: 'default',
	computed: {
		...mapState(['rehydrated'])
	},
	mounted() {
		window.$gtm = this.$gtm

		window.GS_LOGS = false // window.location.href.includes('localhost')
	}
}
</script>
