<template>
	<button class="filter-button" :class="{'is-active': isActive}" @click="clickHandler"><span>{{name}}</span>&nbsp;<em>({{count}})</em></button>
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
			default: '',
			required: true
		},
		count: {
			type: Number,
			required: true
		},
		filterId: {
			type: String,
			default: '',
			required: true
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