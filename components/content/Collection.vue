<template>
	<div class="collection" :class="{'collection--fun': collectionLayout == 1}">
		<collection-item
			v-for="(item, key) in filteredCollection"
			:key="'collectionItem'+key"
			v-bind="item"
		/>
	</div>
</template>

<script>
import { vuex, mapActions, mapState } from 'vuex'
import CollectionItem from '~/components/content/CollectionItem.vue'
import WindowContent from '~/components/framework/WindowContent.vue'

export default {
	extends: WindowContent,
	name: 'collection',
	components: {
		CollectionItem
	},
	props: {
		collectionId: { type: String, default: '' }
	},
	computed: {
		...mapState(['collectionLayout']),
		...mapState('collection', ['data', 'activeFilters', 'currentCollectionId']),
		filteredCollection() {
			const currentCollection = this.data[this.collectionId].styles
			const currentFilter = this.activeFilters[this.collectionId]

			return !currentFilter
				? currentCollection
				: currentCollection.filter(style =>
						style.filters.includes(currentFilter)
				  )
		}
	}
}
</script>