<template>
	<div class="window__status--collection">
		<p class="count">{{ text }}</p>

		<div class="group-navigation">
			<button class="group-navigation__prev" @click="groupPrevHandler">
				<span>←</span>
			</button>
			<p>{{ groupName }}</p>
			<button class="group-navigation__next" @click="groupNextHandler">
				<span>→</span>
			</button>
		</div>

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
	</div>
</template>

<script>
import { vuex, mapActions, mapState } from 'vuex'

import CollectionLayouts from '~/model/collection-layouts'

import {
	COLLECTION_LAYOUT_CHANGE,
	SET_NEXT_GROUP,
	SET_PREVIOUS_GROUP
} from '~/model/constants'

export default {
	name: 'status-collection',
	computed: {
		...mapState({
			collectionLayout: state => state.collectionLayout,
			currentStyles: state => state.collection.currentStyles,
			collectionGroups: state => state.collection.groups,
			activeGroup: state => state.collection.activeGroup
		}),
		text() {
			return this.currentStyles.length + ' items'
		},
		groupName() {
			if (this.activeGroup) {
				return this.activeGroup.name
			} else {
				return 'All styles'
			}
		}
	},
	methods: {
		...mapActions([
			COLLECTION_LAYOUT_CHANGE.action,
			'collection/' + SET_PREVIOUS_GROUP.action,
			'collection/' + SET_NEXT_GROUP.action
		]),
		layoutGridClickHandler() {
			this[COLLECTION_LAYOUT_CHANGE.action](CollectionLayouts.GRID)
		},
		layoutFunClickHandler() {
			this[COLLECTION_LAYOUT_CHANGE.action](CollectionLayouts.FUN)
		},
		groupPrevHandler() {
			this['collection/' + SET_PREVIOUS_GROUP.action]()
		},
		groupNextHandler() {
			this['collection/' + SET_NEXT_GROUP.action]()
		}
	}
}
</script>
