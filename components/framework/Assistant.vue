<template>
	<section class="window window--tight window--assistant">
		
		<div class="window__top">
			<span class="title">🤖 Desktop assistant</span>				
		</div>


		<div class="window__status" v-if="assistantMode == 1 && viewPortSize == 0">
			<button class="button expand" @click="expandContentHandler">
				<span v-if="!assistantExpanded">+</span>
				<span v-if="assistantExpanded">-</span>
				<p>{{filterStatusText}}</p>
			</button>
		</div>

		<div class="window__status" v-if="assistantMode == 2">
			<p>
				{{currentStyle.name}}
			</p>
			<button class="button previous" @click="previousStyleHandler">❮</button>
			<button class="button next" @click="nextStyleHandler">❯</button>
			<button class="button close" @click="closeStyleHandler">𝗫</button>
		</div>

		<hr  v-if="assistantMode == 2" />

		<div class="window__content">


			<div class="assistant">
				
				<div class="assistant__content" v-if="assistantMode == 0">
					<div class="assistant__welcome">
						<h3>Welcome!</h3>
						<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae vero sequi iusto, iste quisquam repellat consectetur reprehenderit illo velit esse dolorem atque tempore veniam possimus cum error nemo, aut optio!</p>
					</div>
				</div>

				<div class="assistant__content" v-if="assistantMode == 1" :class="{'is-active': viewPortSize == 1 || assistantExpanded}">
					<div class="assistant__filters">
						<p>Do you have any preferences to the collection? choose from the options here!</p>		
						<div class="assistant__filters__list">						
							<filter-button v-for="(item, key) in filtersList" :key="key" :name="item.name" :filter-id="item.filterId" />
						</div>
					</div>
				</div>			
				
				<div class="assistant__content" v-if="assistantMode == 2" :class="{'is-active': viewPortSize == 1 || assistantExpanded}">
					<div class="assistant__product-details">
						<p>{{currentStyle.description}}</p>
						<table>
							<tbody>
								<tr>
									<th>Color</th>
									<td>{{currentStyle.colorNames}}
										<span v-if="hasHiddenAssets">
											<button class="link" @click="showAllVariantsClickHandler">&nearr; Show all variants</button>
										</span>
									</td>
								</tr>
							
								<tr>
									<th>&nbsp;</th>
									<td>&nbsp;</td>
								</tr>
							
								<tr>
									<th>Materiel</th>
									<td>{{currentStyle.material}}</td>
								</tr>
								<tr>
									<th>Style #</th>
									<td>{{currentStyle.styleId}}</td>
								</tr>
								<tr>
									<th>Program #</th>
									<td>{{currentStyle.program}}</td>
								</tr>
								<tr>
									<th>Program name</th>
									<td>{{currentStyle.programName}}</td>
								</tr>

								<tr>
									<th>&nbsp;</th>
									<td>&nbsp;</td>
								</tr>

								<tr>
									<th>Wholesale price</th>
									<td>DKK {{currentStyle.wholesalePriceDKK}}</td>
								</tr>
								<tr>
									<th>Wholesale price</th>
									<td>EUR {{currentStyle.wholesalePriceEUR}}</td>
								</tr>
								<tr>
									<th>Wholesale price</th>
									<td>USD {{currentStyle.wholesalePriceUSD}}</td>
								</tr>

								<tr>
									<th>&nbsp;</th>
									<td>&nbsp;</td>
								</tr>

								<tr>
									<th>Suggested retail price</th>
									<td>DKK {{currentStyle.suggestedRetailPriceDKK}}</td>
								</tr>
								<tr>
									<th>Suggested retail price</th>
									<td>EUR {{currentStyle.suggestedRetailPriceEUR}}</td>
								</tr>
								<tr>
									<th>Suggested retail price</th>
									<td>USD {{currentStyle.suggestedRetailPriceUSD}}</td>
								</tr>
							</tbody>
						</table>
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
	</section>
</template>

<script>

import { vuex, mapActions, mapState } from 'vuex'
import { 
	SET_CURRENT_FILTER,
	ADD_TO_WISHLIST,
	REMOVE_FROM_WISHLIST, 
	OPEN_CONTENT,
	ALL_ASSETS_VISIBLE,
	CLOSE_WINDOW_GROUP,
	SHOW_NEXT_STYLE,
	SHOW_PREVIOUS_STYLE,
} from '~/model/constants'

import ContentTypes from '~/model/content-types'
import ViewportSizes from '~/model/viewport-sizes'
import getAssetType from '~/utils/asset-type'
import addMediaChangeListener from '~/utils/media-change'
import isMobile from '~/utils/is-mobile'
import FilterButton from '~/components/content/FilterButton.vue'


export default {
	name:'assistant',
	components: {
		FilterButton
	},
	data() {
		return {
			assistantExpanded: true,
			viewPortSize: 0,
			assistantMode: 0,
			associatedWindow: null,
			currentStyle: null,
			hiddenAssetContent: [],
			associatedWindowGroupId: null,
			filterName: null
		}
	},
	computed: {
		...mapState({
			filtersList: state => state.collection.filters,
			wishList: state => state.collection.wishList,
			currentStyles: state => state.collection.currentStyles,
			topMostWindow: state => state.topMostWindow,
			activeFilter: state => state.collection.activeFilter
		}),
		viewWishListButtonLabel() {
			return `View wishlist (${this.wishList.length})`;
		},
		addRemoveWishListButtonLabel() {
			if ( this.styleOnWishList ) return 'Remove from list';
 			return 'Add to wishlist';
		},
		styleOnWishList() {
			return this.currentStyle.onWishList;
		},
		hasHiddenAssets() {
			return this.hiddenAssetContent.length > 0;
		},
		filterStatusText() {
			if ( this.filterName ) return filterName;
			return 'Filter';
		}
	},
	watch: {
		activeFilter(newVal) {
			if ( newVal && newVal.name != '' ) this.filterName = newVal.name;
			else this.filterName = null;
		},
		topMostWindow(newVal) {

			this.associatedWindow = newVal;

			if ( !this.associatedWindow || !this.associatedWindow.contentComponent ) {
				this.assistantMode = 0;			
			}
			else {
				this.associatedWindowGroupId = this.associatedWindow.groupId;

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
							this.currentStyle = this.currentStyles.filter(e=>e.styleId === componentProps.asset.styleId)[0];
							this.parseAssets();
							
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
			OPEN_CONTENT.action,
			CLOSE_WINDOW_GROUP.action,
			'collection/'+ALL_ASSETS_VISIBLE.action,
			'collection/'+SET_CURRENT_FILTER.action,
			'collection/'+ADD_TO_WISHLIST.action,
			'collection/'+REMOVE_FROM_WISHLIST.action,
			'collection/'+SHOW_PREVIOUS_STYLE.action,
			'collection/'+SHOW_NEXT_STYLE.action,
		]),
		viewWishListClickHandler() {
			//VIEW WISHLIST
		},
		previousStyleHandler() {
			this['collection/'+SHOW_PREVIOUS_STYLE.action]( this.currentStyle.styleId );
		},
		nextStyleHandler() {
			this['collection/'+SHOW_NEXT_STYLE.action]( this.currentStyle.styleId );
		},
		closeStyleHandler() {
			this[CLOSE_WINDOW_GROUP.action]( );
		},
		showAllVariantsClickHandler() {
			this['collection/'+ALL_ASSETS_VISIBLE.action](this.currentStyle);
			this[OPEN_CONTENT.action]( {windowContent:this.hiddenAssetContent, addToGroupId:this.associatedWindowGroupId} );
			this.hiddenAssetContent = [];
		},
		addToWishListClickHandler() {
			if ( this.styleOnWishList ) {
				this['collection/'+REMOVE_FROM_WISHLIST.action](this.currentStyle);
			}
			else {
				this['collection/'+ADD_TO_WISHLIST.action](this.currentStyle);
			}
		},
		parseAssets() {
			let al = this.currentStyle.assets.length;

			this.hiddenAssetContent = [];

			//backwards loop to ensure asset [0] gets on top (as sorted in $store)
			for (var i = al-1; i >= 0; i--) {
				let asset = this.currentStyle.assets[i];

				if ( !asset.visible ) {
					let type = getAssetType(asset);
					this.hiddenAssetContent.push({
						title: asset.name,
						contentId: asset.assetId,
						type: type,
						canOverride: false,
						windowProps: type.defaultWindowProps,
						contentComponentProps: { asset: asset },
						statusComponentProps: type.defaultStatusComponentProps
					});
				}
			}

			console.log("HIDDEN ASSET COUNT: "+this.hiddenAssetContent.length)
			
			//ready to show details
			this.assistantMode = 2;
		},
		isSmallViewport() {
			console.log("isSmallViewport")
			this.viewPortSize = ViewportSizes.small;
		},
		isLargeViewport() {
			console.log("isLargeViewport")
			this.viewPortSize = ViewportSizes.large;			
		}
	},
	mounted() {
		addMediaChangeListener(this.isSmallViewport, this.isLargeViewport, 768);
		if ( isMobile() ) {
			this.assistantExpanded = false;
			this.viewPortSize = ViewportSizes.small;
		}
	}
};
</script>