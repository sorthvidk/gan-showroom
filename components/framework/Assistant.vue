<template>
	<div class="assistant">
		<div class="window window--tight">
			<div class="window__top">
				<span class="title">Desktop assistant</span>				
			</div>
			<div class="window__content">
				<div class="filters">					
					<filter-button v-for="(item, key) in filtersList" :name="item.name" :filter-id="item.filterId" />
				</div>			
			</div>			
		</div>
	</div>
</template>

<script>

import { vuex, mapActions, mapState } from 'vuex'
import { SET_CURRENT_FILTER } from '~/model/constants'


import FilterButton from '~/components/content/FilterButton.vue'


export default {
	name:'assistant',
	components: {
		FilterButton
	},
	computed: {
		...mapState({
			filtersList: state => state.collection.filters,
		})
	},
	methods: {
		...mapActions([
			'collection/'+SET_CURRENT_FILTER.action
		])
	}
};
</script>