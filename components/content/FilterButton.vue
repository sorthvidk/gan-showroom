<template>
	<button class="filter-button" :class="{'is-active': isActive}" @click="clickHandler">
		<span>{{name}}</span>
		<em>({{count}})</em>
	</button>
</template>

<script>
import { vuex, mapActions, mapState } from 'vuex'
import { SET_CURRENT_FILTER } from '~/model/constants'

import sendTracking from '~/utils/send-tracking'

export default {
	name: 'filter-button',
	props: {
		name: {
			type: String,
			default: '',
			required: true
		},
		filterId: {
			type: String,
			default: '',
			required: true
		}
	},
	computed: {
		...mapState('collection', ['data', 'activeFilters', 'currentCollectionId']),
		count() {
			return this.data[this.currentCollectionId].styles.filter(style =>
				style.filters.includes(this.filterId)
			).length
		},
		isActive() {
			return this.activeFilters[this.currentCollectionId] === this.filterId
		}
	},
	methods: {
		...mapActions('collection', [SET_CURRENT_FILTER.action]),
		clickHandler() {
			this[SET_CURRENT_FILTER.action](this.isActive ? '' : this.filterId)

			if (!this.activeFilters[this.currentCollectionId]) {
				sendTracking('Filter added', this.name)
			}
		}
	}
}
</script>