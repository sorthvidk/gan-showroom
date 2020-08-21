<template>
	<div class="collection" :class="{'collection--fun': currentLayout == 1}">
		<div class="collection__drop"
			v-for="(drop,dropKey) in dropsList"
			:key="'drop'+dropKey">
			<h4 v-if="dropsList.length > 1">{{drop.label}}</h4>
			<div>
				<collection-item
					v-for="(item, itemKey) in drop.styles"
					:key="'collectionItem'+itemKey"
					v-bind="item"
					v-on="$listeners"
				/>
			</div>
		</div>
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
		currentLayout: { type: Number, default: 0 },
		collectionId: { type: String, default: '' },
	},
	// data() {
	// 	return {
	// 		collectionData: { styles: [] }
	// 	}
	// },
	computed: {
		// ...mapState(['collectionLayout']),
		...mapState('collection', ['list', 'activeFilters']),
		filteredCollection() {
			const currentCollection = this.list.filter(style => style.collectionId === this.collectionId)
			const currentFilter = this.activeFilters[this.collectionId]

			return !currentFilter
				? currentCollection
				: currentCollection.filter(style =>
						style.filters.includes(currentFilter)
				  )
		},
		dropsList() {
			let drops = [];
			let cl = this.filteredCollection.length
			for (var j = 0; j < cl; j++) {
				let collectionItem = this.filteredCollection[j]
				let dropIndex = drops.findIndex(item => item.label === collectionItem.drop)
				if ( dropIndex > -1 ) {
					drops[dropIndex].styles.push(collectionItem)
				} else {
					drops.push( {label:collectionItem.drop, styles:[]});
				}
			}
			
			drops.sort((a,b) =>  a.label > b.label ? 1 : -1)

			console.log("drops",drops)
			return drops;
		},
	},
	// mounted() {
	// 	this.$nextTick(() => {
	// 		this.collectionData = this.data[this.collectionId].styles
	// 	})
	// }
}
</script>