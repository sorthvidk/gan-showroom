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

				
				<div class="assistant__ctas" v-if="assistantMode == 1">
					<button class="button view-wishlist" @click="viewWishListClickHandler">
						{{viewWishListButtonLabel}}
					</button>
				</div>			
				<div class="assistant__ctas" v-if="assistantMode == 2">
					<button class="button add-to-wishlist" :class="{'is-active': styleOnWishList}" @click="addToWishListClickHandler">
						{{addRemoveWishListButtonLabel}}
					</button>
					<button class="button view-wishlist" @click="viewWishListClickHandler">
						{{viewWishListButtonLabel}}
					</button>
				</div>			
			</div>			
		</div>
	</div>
</template>

<script>

import { vuex, mapActions, mapState } from 'vuex'
import { 
	SET_CURRENT_FILTER,
	ADD_TO_WISHLIST,
	REMOVE_FROM_WISHLIST, 
} from '~/model/constants'

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
		viewWishListButtonLabel() {
			return `View wishlist (${this.wishList.length})`;
		},
		addRemoveWishListButtonLabel() {
			if ( this.styleOnWishList ) return 'Remove from list';
 			return 'Add to wishlist';
		},
		styleName() {
			return this.currentStyle.name;
		},
		styleOnWishList() {
			return this.currentStyle.onWishList;
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
			'collection/'+SET_CURRENT_FILTER.action,
			'collection/'+ADD_TO_WISHLIST.action,
			'collection/'+REMOVE_FROM_WISHLIST.action
		]),
		viewWishListClickHandler() {
			//VIEW WISHLIST
		},
		addToWishListClickHandler() {
			if ( this.styleOnWishList ) {
				this['collection/'+REMOVE_FROM_WISHLIST.action](this.currentStyle);
			}
			else {
				this['collection/'+ADD_TO_WISHLIST.action](this.currentStyle);
			}
		}
	}
};
</script>