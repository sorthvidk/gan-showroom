<template>
	<div class="collection">
		<collection-item v-for="(item, key) in collectionItems" v-bind="{...item}" />
	</div>
</template>

<script>

import { vuex, mapActions, mapState } from 'vuex'

import CollectionItem from '~/components/content/CollectionItem.vue'

export default {
	name:'collection',
	components: {
		CollectionItem
	},
	computed: {
		...mapState({
			collectionItems: state => state.collection.currentStyles
		})
	}
};

</script>