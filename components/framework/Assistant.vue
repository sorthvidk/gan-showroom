<template>
	<div class="window window--tight window--assistant">
		
		<div class="window__top">
			<span class="title">🤖 Desktop assistant</span>				
		</div>


		<div class="window__status" v-if="assistantMode == 2">
			<p>
				{{styleName}}
			</p>
			<button class="button previous">❮</button>
			<button class="button next">❯</button>
			<button class="button close">𝗫</button>
		</div>

		<div class="window__content">


			<div class="assistant">
				
				<div v-if="assistantMode == 0">
					<div class="assistant__welcome">
						<h3>Welcome!</h3>
						<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae vero sequi iusto, iste quisquam repellat consectetur reprehenderit illo velit esse dolorem atque tempore veniam possimus cum error nemo, aut optio!</p>
					</div>
				</div>

				<div v-if="assistantMode == 1">
					<div class="assistant__filters">
						<p>Do you have any preferences to the collection? choose from the options here!</p>		
						<div class="assistant__filters__list">						
							<filter-button v-for="(item, key) in filtersList" :name="item.name" :filter-id="item.filterId" />
						</div>
					</div>
				</div>			
				
				<div v-if="assistantMode == 2">
					<div class="assistant__product-details">
						<p>Product info - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt quibusdam sint hic dolore libero quaerat quae perferendis, cupiditate, distinctio delectus aliquid! Magnam quae assumenda neque reiciendis nisi adipisci incidunt et?</p>
					</div>
				</div>

				
				<div class="assistant__ctas">
					<div v-if="assistantMode == 1">
						<button class="button wishlist" @click="wishListClickHandler">
							{{wishListButtonLabel}}
						</button>
					</div>			
					<div v-if="assistantMode == 1">
						<button class="button wishlist" @click="wishListClickHandler">
							{{wishListButtonLabel}}
						</button>
					</div>			
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
			assistantMode: 0,
			associatedWindow: null,
			currentStyle: null
		}
	},
	computed: {
		...mapState({
			filtersList: state => state.collection.filters,
			wishList: state => state.collection.wishList,
			currentStyles: state => state.collection.currentStyles,
			topMostWindow: state => state.topMostWindow
		}),
		wishListButtonLabel() {
			return `View wishlist (${this.wishList.length})`;
		},
		styleName() {
			return this.currentStyle.name;
		}
	},
	watch: {
		topMostWindow(newVal) {
			this.associatedWindow = newVal;

			if ( !this.associatedWindow || !this.associatedWindow.contentComponent ) {
				this.assistantMode = 0;
			}
			else {

				let component = this.associatedWindow.contentComponent,
					componentProps = this.associatedWindow.contentComponentProps;

				switch(component) {
					case ContentTypes.collection.contentComponent:
						this.assistantMode = 1;
						break;
					case ContentTypes.imagePortrait.contentComponent:
					case ContentTypes.imageLandscape.contentComponent:
					case ContentTypes.imageSquare.contentComponent:
						if ( componentProps.asset && componentProps.asset.styleId ) {
							this.assistantMode = 2;
							this.currentStyle = this.currentStyles.filter(e=>e.styleId === componentProps.asset.styleId)[0];
						}
						else {
							this.assistantMode = 0;							
						}
						break;	
					default:					
						this.assistantMode = 0;
						break;	
				}			
			}
		}
	},
	methods: {
		...mapActions([
			'collection/'+SET_CURRENT_FILTER.action
		]),
		wishListClickHandler() {
			//VIEW WISHLIST
		}
	}
};
</script>