<template>
	<nuxt v-show="rehydrated" />
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
	}
}
</script>