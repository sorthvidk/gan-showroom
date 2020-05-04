<template>
	<div class="container">
		<nuxt />
	</div>
</template>


<script>
import { vuex, mapActions, mapState } from 'vuex'
import { 
	CONNECT_ASSETS,
	FILTER_COLLECTION
} from '~/model/constants'

export default {
	name: 'default',
	methods: {
		...mapActions([
			CONNECT_ASSETS.action,
			FILTER_COLLECTION.action
		])
	},
	mounted() {
		this[CONNECT_ASSETS.action]();
		this[FILTER_COLLECTION.action]();
	}
};
</script>