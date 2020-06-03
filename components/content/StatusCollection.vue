<template>
	<div class="window__status--collection">		
		<p>{{text}}</p>

		<div class="layout-buttons">
			<button class="button layout-fun" :class="{'is-active': collectionLayout == 1}" @click="layoutFunClickHandler">☺︎</button>
			<button class="button layout-grid" :class="{'is-active': collectionLayout == 0}" @click="layoutGridClickHandler">⌗</button>
		</div>
	</div>
</template>

<script>

import { vuex, mapActions, mapState } from 'vuex'

import CollectionLayouts from '~/model/collection-layouts'

import { 
	COLLECTION_LAYOUT_CHANGE 
} from '~/model/constants'

export default {
	name:'status-collection',
	computed: {
		...mapState({
			collectionLayout: state => state.collectionLayout,
			currentStyles: state => state.collection.currentStyles
		}),
		text() {
			return this.currentStyles.length + ' items';
		}
	},
	methods: {
		...mapActions([
			COLLECTION_LAYOUT_CHANGE.action
		]),
		layoutGridClickHandler() {
			this[COLLECTION_LAYOUT_CHANGE.action](CollectionLayouts.GRID)
		},
		layoutFunClickHandler() {
			this[COLLECTION_LAYOUT_CHANGE.action](CollectionLayouts.FUN)
		}
	}
};
</script>