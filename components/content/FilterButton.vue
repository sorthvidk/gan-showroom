<template>
	<button class="filter-button" :class="{'is-active': isActive}" @click="clickHandler">{{name}}</button>
</template>

<script>

import { vuex, mapActions, mapState } from 'vuex'
import { SET_CURRENT_FILTER } from '~/model/constants'

import sendTracking from '~/utils/send-tracking'

export default {
	name:'filter-button',
	props: {
		name: {
			type: String,
			default: ''
		},
		filterId: {
			type: String,
			default: ''
		}
	},
	watch: {
		activeFilter(newVal) {
			this.isActive = newVal.filterId === this.filterId;
		}
	},
	computed: {
		...mapState({
			activeFilter: state => state.collection.activeFilter,
		})
	},
	data() {
		return {
			isActive: false
		}
	},
	methods: {
		...mapActions([
			'collection/'+SET_CURRENT_FILTER.action
		]),
		clickHandler() {
			if ( this.isActive ) {
				this['collection/'+SET_CURRENT_FILTER.action]();
			}
			else {
				this['collection/'+SET_CURRENT_FILTER.action](this.filterId);	

				sendTracking('Filter added',this.name)
			}
		}
	}
};
</script>