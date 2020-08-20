<template>
	<div class="window__status--collection">
		<p>{{text}}</p>

		<div class="layout-buttons">
			<button
				class="button layout-grid"
				:class="{'is-active': currentLayout == 0}"
				@click="changeLayout(CollectionLayouts.GRID)"
			>
				<span class="icon">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
					  <path d="M14 14H7V7h7V14zM8 13h5V8H8V13zM22 14h-7V7h7V14zM16 13h5V8h-5V13zM14 22H7v-7h7V22zM8 21h5v-5H8V21zM22 22h-7v-7h7V22zM16 21h5v-5h-5V21z"/>
					</svg>
				</span>
			</button>
			<button
				class="button layout-fun"
				:class="{'is-active': currentLayout == 1}"
				@click="changeLayout(CollectionLayouts.FUN)"
			>
				<span class="icon">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
					  <path d="M23 18h-7v-7h7V18zM17 17h5v-5h-5V17zM15 22H8v-7h7V22zM9 21h5v-5H9V21zM15 14H8V7h7V14zM9 13h5V8H9V13z"/>
					</svg>
				</span>
			</button>
		</div>
	</div>
</template>

<script>
import { vuex, mapActions, mapState } from 'vuex'

import CollectionLayouts from '~/model/collection-layouts'

// import { COLLECTION_LAYOUT_CHANGE } from '~/model/constants'

export default {
	name: 'status-collection',
	props: {
		currentLayout: { type: Number, default: 0 },
		collectionId: { type: String, default: '' }
	},
	data: () => ({
		CollectionLayouts,
	}),
	computed: {
		// ...mapState(['collectionLayout']),
		...mapState('collection', ['data']),
		text() {
			return this.data[this.collectionId].styles.length + ' items'
		}
	},
	methods: {
		// ...mapActions([COLLECTION_LAYOUT_CHANGE.action]),
		// layoutGridClickHandler() {
		// 	this[COLLECTION_LAYOUT_CHANGE.action](CollectionLayouts.GRID)
		// },
		// layoutFunClickHandler() {
		// 	this[COLLECTION_LAYOUT_CHANGE.action](CollectionLayouts.FUN)
		// },
		changeLayout(val) {
			this.$emit('layout-change', val)
		}
	}
}
</script>