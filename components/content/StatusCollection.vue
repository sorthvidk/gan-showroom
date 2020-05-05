<template>
	<p>{{text}}</p>
</template>

<script>

import { vuex, mapActions, mapState } from 'vuex'

export default {
	name:'status-collection',
	computed: {
		...mapState({
			currentStyles: state => state.collection.currentStyles
		}),
		text() {
			return this.currentStyles.length + ' items';
		}
	},
};
</script>