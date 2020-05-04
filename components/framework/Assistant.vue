<template>
	<div class="assistant">
		<div class="window window--tight">
			<div class="window__top">
				<span class="title">🤖 Desktop assistant</span>				
			</div>
			<div class="window__content">
				<div v-if="assistantMode == 0">
					<h3>Welcome!</h3>
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae vero sequi iusto, iste quisquam repellat consectetur reprehenderit illo velit esse dolorem atque tempore veniam possimus cum error nemo, aut optio!</p>
				</div>

				<div v-if="assistantMode == 1" class="filters">					
					<filter-button v-for="(item, key) in filtersList" :name="item.name" :filter-id="item.filterId" />
				</div>			
				<div v-if="assistantMode == 2">	
					<p>Product info - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt quibusdam sint hic dolore libero quaerat quae perferendis, cupiditate, distinctio delectus aliquid! Magnam quae assumenda neque reiciendis nisi adipisci incidunt et?</p>
				</div>				
			</div>			
		</div>
	</div>
</template>

<script>

import { vuex, mapActions, mapState } from 'vuex'
import { SET_CURRENT_FILTER } from '~/model/constants'

import ContentTypes from '~/model/content-types'

import FilterButton from '~/components/content/FilterButton.vue'


export default {
	name:'assistant',
	components: {
		FilterButton
	},
	data() {
		return {
			assistantMode: 0
		}
	},
	computed: {
		...mapState({
			filtersList: state => state.collection.filters,
			topMostWindow: state => state.topMostWindow
		})
	},
	watch: {
		topMostWindow(newVal) {
			if ( !newVal || !newVal.contentType ) {
				this.assistantMode = 0;
			}
			else {
				switch(newVal.contentType.component) {
					case ContentTypes.collection.component:
						this.assistantMode = 1;
						break;
					case ContentTypes.imagePortrait.component:
					case ContentTypes.imageLandscape.component:
					case ContentTypes.imageSquare.component:				
						this.assistantMode = 2;
						break;						
				}			
			}
		}
	},
	methods: {
		...mapActions([
			'collection/'+SET_CURRENT_FILTER.action
		])
	}
};
</script>