<template>
	<div class="window__status--collection">
		<!-- <p class="count">{{ text }}</p> -->

		<group-navigation />

		<!--
		<div class="layout-buttons">
			<button
				class="button layout-grid"
				:class="{ 'is-active': collectionLayout == 0 }"
				@click="layoutGridClickHandler"
			>
				<span class="icon">
					<svg
						viewBox="0 0 30 30"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							stroke="#000"
							d="M7.5 7.5h6v6h-6zM15.5 7.5h6v6h-6zM7.5 15.5h6v6h-6zM15.5 15.5h6v6h-6z"
						/>
					</svg>
				</span>
			</button>
			<button
				class="button layout-fun"
				:class="{ 'is-active': collectionLayout == 1 }"
				@click="layoutFunClickHandler"
			>
				<span class="icon">
					<svg
						viewBox="0 0 30 30"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							stroke="#000"
							d="M8.5 7.5h6v6h-6zM8.5 15.5h6v6h-6zM16.5 11.5h6v6h-6z"
						/>
					</svg>
				</span>
			</button>
		</div>
		--></div>
</template>

<script>
import { vuex, mapActions, mapState } from 'vuex'

import CollectionLayouts from '~/model/collection-layouts'
import GroupNavigation from '~/components/content/GroupNavigation.vue'

import { COLLECTION_LAYOUT_CHANGE } from '~/model/constants'

export default {
	name: 'status-collection',
	components: {
		GroupNavigation
	},
	computed: {
		...mapState('collection', ['collectionLayout', 'currentStyles']),
		text() {
			return this.currentStyles.length + ' items'
		}
	},
	methods: {
		...mapActions('collection', [COLLECTION_LAYOUT_CHANGE.action]),
		layoutGridClickHandler() {
			this[COLLECTION_LAYOUT_CHANGE.action](CollectionLayouts.GRID)
		},
		layoutFunClickHandler() {
			this[COLLECTION_LAYOUT_CHANGE.action](CollectionLayouts.FUN)
		}
	}
}
</script>
