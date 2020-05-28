<template>
	<div class="collection">
		<collection-item v-for="(item, key) in collectionItems" :key="'collectionItem'+key" v-bind="{...item}" />
	</div>
</template>

<script>

import { vuex, mapActions, mapState } from 'vuex'

import CollectionItem from '~/components/content/CollectionItem.vue'

import WindowContent from '~/components/framework/WindowContent.vue'

export default {
	extends: WindowContent,
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