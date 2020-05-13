<template>
	<p>{{text}}</p>
</template>

<script>

import { vuex, mapActions, mapState } from 'vuex'

export default {
	name:'status-wish-list',
	computed: {
		...mapState({
			wishList: state => state.collection.wishList
		}),
		text() {
			return this.wishList.length + ' items';
		}
	},
};
</script>