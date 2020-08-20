<template>
	<section
		class="window window--tight window--assistant"
		:class="'assistant-mode--' + assistantMode"
	>
		<div class="window__top">
			<span class="title">Tour guide</span>
		</div>

		<!-- ####################### STATUS ####################### -->

		<div class="window__status" v-if="assistantMode == 1 && viewPortSize.name == 'SMALL'">
			<button class="button expand" @click="toggleContentHandler">
				<span v-if="!assistantExpanded" class="icon">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15">
						<path fill-rule="evenodd" clip-rule="evenodd" d="M7 8v7h1V8h7V7H8V0H7v7H0v1h7z" />
					</svg>
				</span>
				<span v-if="assistantExpanded" class="icon">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15">
						<path d="M0 7h15v1H0V7z" />
					</svg>
				</span>
				<p>{{filterStatusText}}</p>
			</button>
		</div>

		<div class="window__status" v-if="(assistantMode == 2) && viewPortSize.name == 'SMALL'">
			<button class="button expand" @click="toggleContentHandler">
				<span v-if="!assistantExpanded" class="icon">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15">
						<path fill-rule="evenodd" clip-rule="evenodd" d="M7 8v7h1V8h7V7H8V0H7v7H0v1h7z" />
					</svg>
				</span>
				<span v-if="assistantExpanded" class="icon">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15">
						<path d="M0 7h15v1H0V7z" />
					</svg>
				</span>
				<p>{{currentStyle.name}}</p>
			</button>
			<button class="window-button previous" @click="previousStyleHandler">
				<span class="icon">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
						<path d="M17 21.8L10.1 15 17 8.1l.7.8-6.2 6.1 6.2 6.1z" />
					</svg>
				</span>
			</button>
			<button class="window-button next" @click="nextStyleHandler">
				<span class="icon">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
						<path d="M12.7 21.9l-.7-.8 6.1-6.1L12 8.9l.7-.7 6.8 6.8z" />
					</svg>
				</span>
			</button>
			<button class="window-button close" @click="closeStyleHandler">
				<span class="icon">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
						<path
							d="M15.7 15l7.8-7.8-.7-.7-7.8 7.8-7.8-7.8-.7.7 7.8 7.8-7.8 7.8.7.7 7.8-7.8 7.8 7.8.7-.7-7.8-7.8z"
						/>
					</svg>
				</span>
			</button>
		</div>

		<div class="window__status" v-if="assistantMode == 2 && viewPortSize.name == 'LARGE'">
			<p>{{currentStyle.name}}</p>
			<button class="window-button previous" @click="previousStyleHandler">
				<span class="icon">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
						<path d="M17 21.8L10.1 15 17 8.1l.7.8-6.2 6.1 6.2 6.1z" />
					</svg>
				</span>
			</button>
			<button class="window-button next" @click="nextStyleHandler">
				<span class="icon">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
						<path d="M12.7 21.9l-.7-.8 6.1-6.1L12 8.9l.7-.7 6.8 6.8z" />
					</svg>
				</span>
			</button>
			<button class="window-button close" @click="closeStyleHandler">
				<span class="icon">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
						<path
							d="M15.7 15l7.8-7.8-.7-.7-7.8 7.8-7.8-7.8-.7.7 7.8 7.8-7.8 7.8.7.7 7.8-7.8 7.8 7.8.7-.7-7.8-7.8z"
						/>
					</svg>
				</span>
			</button>
		</div>

		<hr
			v-if="(assistantMode == 2) && (viewPortSize.name == 'LARGE' || (viewPortSize.name == 'SMALL' && assistantExpanded))"
		/>

		<!-- ####################### CONTENT ####################### -->

		<div class="window__content">
			<div class="assistant">
				<div class="assistant__content" v-if="assistantMode == 0">
					<div class="assistant__text">
						<h3>WELCOME TO DITTE’S DESKTOP</h3>
						<p>Hey there, how’s it going? I’m your Desktop Assistant and I’ll be showing you around the place. Kick back, relax, pour a drink, explore – I’m here if you need me. Let’s go!</p>
					</div>
				</div>

				<div
					class="assistant__content"
					v-if="assistantMode == 1"
					:class="{'is-collapsed': viewPortSize.name == 'SMALL' && !assistantExpanded}"
				>
					<div class="assistant__filters">
						<h3>{{collectionName}}</h3>
						<p>Browse the full line-up, find out more about each piece, get a close up look at the collection, fall in love.<span v-if="currentCollectionFilters.length > 0"> Skip to the good stuff by choosing from the below:</span></p>
						<div class="assistant__filters__list">
							<filter-button
								v-for="(item, key) in currentCollectionFilters"
								:key="key"
								:name="item.name"
								:filter-id="item.filterId"
							/>
							<span class="filter-button" v-if="currentCollectionFilters.length % 2 > 0">&nbsp;</span>
						</div>
					</div>
				</div>

				<div
					class="assistant__content"
					v-if="assistantMode == 2"
					:class="{'is-collapsed': viewPortSize.name == 'SMALL' && !assistantExpanded}"
				>
					<div class="assistant__product-details">
						<span v-if="currentStyle.responsible" class="responsible">
							<div>I am a certified responsible material —&nbsp;</div>
							<div>I am a certified responsible material —&nbsp;</div>
							<div>I am a certified responsible material —&nbsp;</div>
						</span>

						<table>
							<tbody>
								<tr>
									<th>Color</th>
									<td>{{currentStyle.colorNames}}</td>
								</tr>

								<tr>
									<th>&nbsp;</th>
									<td>&nbsp;</td>
								</tr>

								<tr>
									<th>Material</th>
									<td>{{currentStyle.material}}</td>
								</tr>

								<tr>
									<th>&nbsp;</th>
									<td>&nbsp;</td>
								</tr>
								
								<tr>
									<th>Style #</th>
									<td>{{currentStyle.styleId}}</td>
								</tr>
								<tr>
									<th>Drop</th>
									<td>{{currentStyle.drop}}</td>
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
									<td>DKK {{currentStyle.retailPriceDKK}}</td>
								</tr>
								<tr>
									<th>Suggested retail price</th>
									<td>EUR {{currentStyle.retailPriceEUR}}</td>
								</tr>
								<tr>
									<th>Suggested retail price</th>
									<td>USD {{currentStyle.retailPriceUSD}}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>

				<div class="assistant__content" v-if="assistantMode == 3">
					<div class="assistant__text">
						<p>You know the drill. Add your favourites to your wishlist. When you’re done you can download to see your favorites or share with your team</p>
					</div>
					<div class="assistant__text" v-if="shareUrl">
						<p>Your Wishlist link</p>
						<strong @click="shareUrlClickHandler">{{shortenedReceiptUrl}}</strong>
					</div>
				</div>

				<div class="assistant__content" v-if="assistantMode == 4">
					<div class="assistant__text" v-if="!shareUrl">
						<p>Me again. Don’t forget you’ve got items waiting for you in your wishlist. Have you explored the rest of Ditte’s desktop yet?</p>
					</div>
					<div class="assistant__text" v-if="shareUrl">
						<p>Your Wishlist link</p>
						<strong @click="shareUrlClickHandler">{{shortenedReceiptUrl}}</strong>
					</div>
				</div>

				<!-- ####################### CTA ####################### -->

				<div class="assistant__ctas" v-if="assistantMode == 0 && activeWishlist.length > 0">
					<button class="button view-wishlist" @click="viewWishListClickHandler">
						<p>{{viewWishListButtonLabel}}</p>
					</button>
				</div>

				<div class="assistant__ctas" v-if="assistantMode == 1">
					<button class="button view-wishlist button--half" @click="viewWishListClickHandler">
						<p>{{viewWishListButtonLabel}}</p>
					</button>

					<a
						class="button download-collection button--half"
						@click="downloadCollectionClickHandler"
						:href="pdfDownloadLink"
					>
						<p>{{downloadCollectionButtonLabel}}</p>
					</a>
				</div>

				<div class="assistant__ctas" v-if="assistantMode == 2">
					<button
						class="button show-variants"
						v-if="hasHiddenAssets"
						@click="showAllVariantsClickHandler"
					>
						<span class="icon">
							<img src="/img/gan_color_wheel.png" alt />
						</span>
						<p>Show all variants</p>
					</button>
					<button
						class="button add-to-wishlist button--half"
						:class="{'is-active': styleOnWishList, 'is-animating': styleHasBeenAdded}"
						@click="addToWishListClickHandler"
					>
						<span class="icon">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
								<path class="checkmark" d="M24.75 62l27.5 27.5 51-51" />
							</svg>
						</span>
						<p>{{addToWishListButtonLabel}}</p>
					</button>
					<button class="button view-wishlist button--half" @click="viewWishListClickHandler">
						<p>{{viewWishListButtonLabel}}</p>
					</button>
				</div>

				<div class="assistant__ctas" v-if="assistantMode == 3">
					<a
						class="button download-wishlist button--half"
						@click="downloadWishListClickHandler"
						:href="pdfDownloadLink"
					>
						<p>Download wishlist</p>
					</a>

					<button @click="shareWishListClickHandler" class="button share-wishlist button--half">
						<p v-if="!showClipboardMessage">Share wishlist</p>
						<p v-if="showClipboardMessage" :style="{color: '#1DD000', textDecoration: 'none'}">Link copied</p>
					</button>
				</div>

				<div class="assistant__ctas" v-if="assistantMode == 4">
					<button class="button view-wishlist" @click="viewWishListClickHandler">
						<p>{{viewWishListButtonLabel}}</p>
					</button>
				</div>

				<!-- ####################### COLLAGE ####################### -->

				<div class="window__status" v-if="(assistantMode == 5) && viewPortSize.name == 'SMALL'">
					<button class="button expand" @click="toggleContentHandler">
						<span v-if="!assistantExpanded" class="icon">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15">
								<path fill-rule="evenodd" clip-rule="evenodd" d="M7 8v7h1V8h7V7H8V0H7v7H0v1h7z" />
							</svg>
						</span>
						<span v-if="assistantExpanded" class="icon">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15">
								<path d="M0 7h15v1H0V7z" />
							</svg>
						</span>
						<p>Change clothes</p>
					</button>
				</div>

				<div
					class="assistant__content scroll"
					:class="{'is-collapsed': viewPortSize.name == 'SMALL' && !assistantExpanded}"
				>
					<div class="assistant__text" v-if="assistantMode == 5">
						<ol>
							<li>Take a portrait photo of yourself and upload it.</li>
							<li>Try our new GANNI Pre-Spring 21 collection on for fun.</li>
							<li>Share looks with your team</li>
						</ol>
					</div>

					<div class="assistant__ctas" v-if="assistantMode == 5">
						<div class="collage-buttons">
							<div class="row" v-for="item in Object.keys(clothes)" :key="item">
								<p class="title">{{ item | capitalize }}</p>
								<button class="button button--inline" @click="changeGarment(item, 1)">
									<svg class="left" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
										<path d="M22.6 19.8L15 12.1l-7.6 7.7-.7-.7 8.3-8.4 8.4 8.4z" />
									</svg>
								</button>
								<button class="button button--inline" @click="changeGarment(item, 0)">
									<svg class="right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
										<path d="M22.6 19.8L15 12.1l-7.6 7.7-.7-.7 8.3-8.4 8.4 8.4z" />
									</svg>
								</button>
							</div>
						</div>
					</div>
				</div>
				<div class="row collage-ctas" v-if="assistantMode == 5">
					<button class="button button--half" @click="downloadImageClickHandler">
						<p>Save image</p>
					</button>
					<button class="button button--half" @click="makeBackgroundClickHandler">
						<p>Make background</p>
					</button>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import { vuex, mapActions, mapState } from 'vuex'
import {
	// SET_CURRENT_FILTER,
	TOGGLE_COLOR_PICKER,
	ADD_TO_WISHLIST,
	REMOVE_FROM_WISHLIST,
	OPEN_CONTENT,
	ALL_ASSETS_VISIBLE,
	CLOSE_WINDOW_GROUP,
	SHOW_NEXT_STYLE,
	SHOW_PREVIOUS_STYLE,
	OPEN_WISH_LIST,
	CLIPBOARD_COPY,
	DOWNLOAD_PREPARING,
	SAVE_COLLAGE,
	MAKE_BACKGROUND,
	CHANGE_COLLAGE
} from '~/model/constants'

import FilterButton from '~/components/content/FilterButton.vue'

import ContentTypes from '~/model/content-types'
import ViewportSizes from '~/model/viewport-sizes'
import AssistantModes from '~/model/assistant-modes'

import getAssetType from '~/utils/asset-type'
import copyToClipboard from '~/utils/copy-to-clipboard'
import addMediaChangeListener from '~/utils/media-change'
import getShortUrl from '~/utils/get-short-url'
import sendTracking from '~/utils/send-tracking'

export default {
	name: 'assistant',
	components: {
		FilterButton
	},
	data() {
		return {
			assistantExpanded: false,
			viewPortSize: ViewportSizes.SMALL,
			assistantMode: AssistantModes.WELCOME,
			associatedWindow: null,
			currentStyle: null,
			hiddenAssetContent: [],
			associatedWindowGroupId: null,
			filterName: null,
			shareUrl: null,
			showClipboardMessage: false,
			styleHasBeenAdded: false,
			shortenedReceiptUrl: null,
			pdfDownloadLink:
				'//pdfcrowd.com/url_to_pdf/?pdf_name=ganni-space-export&width=210mm&height=297mm&hmargin=0mm&vmargin=0mm'
		}
	},
	computed: {
		...mapState([
			'keyPressed',
			'topMostWindow',
			'clipBoardCopyComplete',
			'collageIsOpen'
		]),
		...mapState('collection', [
			'collections',
			'currentCollectionId',
			'data',
			'filters',
			'activeFilters',
			'wishList'
		]),
		...mapState('collage', ['clothes']),
		collectionName() {
			return this.collections.find(collection => collection.collectionId === this.currentCollectionId).name.toUpperCase();
		},
		currentCollectionFilters() {
			return this.data[this.currentCollectionId]
				? this.data[this.currentCollectionId].filters
				: []
		},
		filterStatusText() {
			const activeFilter = this.filters.find(
				filter =>
					filter.filterId === this.activeFilters[this.currentCollectionId]
			)
			return activeFilter ? activeFilter.name : 'Filter'
		},
		activeWishlist() {
			const activeCollections = this.collections
				.filter(c => c.active)
				.map(c => c.collectionId)
			return this.wishList.filter(item =>
				activeCollections.includes(item.styleItem.collectionId)
			)
		},
		viewWishListButtonLabel() {
			return `View wishlist (${this.activeWishlist.length})`
		},
		addToWishListButtonLabel() {
			if (this.styleOnWishList) return 'Added'
			return 'Add to wishlist'
		},
		downloadCollectionButtonLabel() {
			if (this.activeFilters[this.currentCollectionId]) {
				return (
					'Download ' +
					this.filters.find(
						filter =>
							this.activeFilters[this.currentCollectionId] === filter.filterId
					).name
				)
			}
			return 'Download all'
		},
		styleOnWishList() {
			return this.currentStyle.onWishList
		},
		hasHiddenAssets() {
			return this.hiddenAssetContent.length > 0
		},
		wishListUrl() {
			// ex: /export/?styles=K1489~Dutch%20Blue.White,K1446
			return `${window.location}export/?styles=${this.activeWishlist
				.map(({styleItem, chosenColorList = false}) => `${styleItem.styleId + (chosenColorList ? `~${chosenColorList.join('.')}` : '')}`)
				.join(',')}`
		},
		collectionUrl() {
			if (
				this.activeFilters[this.currentCollectionId]
			) {
				return `${window.location}export/?styles=${
					this.currentCollectionId + '_' +
					this.activeFilters[this.currentCollectionId]
				}`
			}
			// /export with no params shows all styles
			return `${window.location}export/?styles=${this.currentCollectionId}`
		}
	},
	watch: {
		clipBoardCopyComplete(newVal) {
			this.showClipboardMessage = newVal
		},
		keyPressed(event) {
			if (event.key === 'ArrowLeft') {
				if (this.assistantMode === AssistantModes.STYLE_DETAILS) {
					this.previousStyleHandler()
				}
			} else if (event.key === 'ArrowRight') {
				if (this.assistantMode === AssistantModes.STYLE_DETAILS) {
					this.nextStyleHandler()
				}
			} else if (event.code === 'Space') {
				if (this.assistantMode === AssistantModes.STYLE_DETAILS) {
					this.addToWishListClickHandler()
				}
			}
		},
		activeFilters: {
			/**
			 * close filter when a new is chosen,
			 * on mobile
			 */
			deep: true,
			handler() {
				this.assistantExpanded = false
			}
		},
		topMostWindow(newVal) {
			this.associatedWindow = newVal
			let noRelevantAssistantContent = false
			this.shareUrl = null
			this.styleHasBeenAdded = false

			if (!this.associatedWindow || !this.associatedWindow.contentComponent) {
				noRelevantAssistantContent = true
			} else {
				this.associatedWindowGroupId = this.associatedWindow.groupId

				let component = this.associatedWindow.contentComponent,
					componentProps = this.associatedWindow.contentComponentProps

				switch (component) {
					case ContentTypes.collection.contentComponent:
						this.assistantMode = AssistantModes.FILTER_COLLECTION
						break
					case ContentTypes.imagePortrait.contentComponent:
					case ContentTypes.imageLandscape.contentComponent:
					case ContentTypes.imageSquare.contentComponent:
					case ContentTypes.videoPortrait.contentComponent:
					case ContentTypes.videoLandscape.contentComponent:
					case ContentTypes.videoSquare.contentComponent:
						if (componentProps.asset && componentProps.asset.styleId) {
							setTimeout(() => {
								this.currentStyle = this.data[
									this.currentCollectionId
								].styles.find(
									style => style.styleId === componentProps.asset.styleId
								)
								this.parseAssets()
							}, 100)
						} else {
							noRelevantAssistantContent = true
						}
						break
					case ContentTypes.wishList.contentComponent:
						this.assistantMode = AssistantModes.WISHLIST
						break
					case ContentTypes.collage.contentComponent:
						this.assistantMode = AssistantModes.COLLAGE
						break
					default:
						//No window type found?
						noRelevantAssistantContent = true
						break
				}
			}

			if (noRelevantAssistantContent) {
				if (this.activeWishlist.length > 0) {
					this.assistantMode = AssistantModes.COLLECTION_SEEN
				} else {
					this.assistantMode = AssistantModes.WELCOME
				}
			}
		},
		activeWishlist(newVal) {
			if (
				newVal.length == 0 &&
				this.assistantMode == AssistantModes.COLLECTION_SEEN
			) {
				this.assistantMode = AssistantModes.WELCOME
			}
		},
		collageIsOpen(open) {
			if (open) {
				this.assistantMode = AssistantModes.COLLAGE
			}
		}
	},
	filters: {
		capitalize(value) {
			if (!value) return ''
			value = value.toString()
			return value.charAt(0).toUpperCase() + value.slice(1)
		}
	},
	methods: {
		...mapActions([
			OPEN_CONTENT.action,
			CLOSE_WINDOW_GROUP.action,
			OPEN_WISH_LIST.action,
			CLIPBOARD_COPY.action,
			DOWNLOAD_PREPARING.action,
			SAVE_COLLAGE.action,
			MAKE_BACKGROUND.action,
			CHANGE_COLLAGE.action
		]),
		...mapActions('collection', [
			ALL_ASSETS_VISIBLE.action,
			TOGGLE_COLOR_PICKER.action,
			ADD_TO_WISHLIST.action,
			REMOVE_FROM_WISHLIST.action,
			SHOW_PREVIOUS_STYLE.action,
			SHOW_NEXT_STYLE.action
		]),
		viewWishListClickHandler() {
			//VIEW WISHLIST
			this[OPEN_WISH_LIST.action]()
		},
		previousStyleHandler() {
			this[SHOW_PREVIOUS_STYLE.action](this.currentStyle.styleId)
		},
		nextStyleHandler() {
			this[SHOW_NEXT_STYLE.action](this.currentStyle.styleId)
		},
		closeStyleHandler() {
			this[CLOSE_WINDOW_GROUP.action]()
		},
		showAllVariantsClickHandler() {
			this[ALL_ASSETS_VISIBLE.action](this.currentStyle)
			this[OPEN_CONTENT.action]({
				windowContent: this.hiddenAssetContent,
				addToGroupId: this.associatedWindowGroupId
			})
			this.hiddenAssetContent = []
		},
		addToWishListClickHandler() {
			let colorList = this.currentStyle.colorNames.split(', ')
			console.log('colorList', colorList)
			if (colorList.length > 1) {
				this[TOGGLE_COLOR_PICKER.action]({
					styleItem: this.currentStyle,
					chosenColorList: colorList,
					callbackFunction: this.executeAddToWishList
				})
			} else {
				this.executeAddToWishList(colorList)
			}
		},
		executeAddToWishList(styleItem, chosenColorList) {
			console.log('executeAddToWishList', chosenColorList)
			if (!this.styleOnWishList) {
				this[ADD_TO_WISHLIST.action]({
					styleItem: this.currentStyle,
					chosenColorList: chosenColorList
				})

				this.styleHasBeenAdded = true
				setTimeout(() => {
					this.styleHasBeenAdded = false
				}, 4000)

				sendTracking('Add to wish list', this.currentStyle.styleId)
			} else {
				// this[REMOVE_FROM_WISHLIST.action](this.currentStyle)
			}
		},
		downloadCollectionClickHandler() {
			if (window.GS_LOGS) console.log('Download collection')
			history.pushState({}, '', this.collectionUrl)
			setTimeout(() => history.back(), 30000) // revert url after 30 sec
			this[DOWNLOAD_PREPARING.action](true)
		},
		downloadWishListClickHandler() {
			if (window.GS_LOGS) console.log('Download wishlist')
			history.pushState({}, '', this.wishListUrl)
			setTimeout(() => history.back(), 30000) // revert url after 30 sec
			this[DOWNLOAD_PREPARING.action](true)
		},
		shareWishListClickHandler() {
			if (window.GS_LOGS) console.log('Share wishlist', this.wishListUrl)

			getShortUrl(this.wishListUrl).then(shortenedUrl => {
				if (window.GS_LOGS) console.log('shortenedUrl', shortenedUrl)
				if (typeof shortenedUrl === 'string' && shortenedUrl != '')
					this.shortenedReceiptUrl = shortenedUrl

				copyToClipboard(
					this.shortenedReceiptUrl,
					this.copyToClipboardComplete.bind(this)
				)
				let wLS = this.wishList.map(style => style.styleId).join(',')
				sendTracking('Share wish list', wLS)
			})
		},
		copyToClipboardComplete(success) {
			if (window.GS_LOGS)
				console.log('copyToClipboardComplete. success?', success)
			this.shareUrl = this.wishListUrl
			this[CLIPBOARD_COPY.action](success)
		},
		parseAssets() {
			let al = (this.currentStyle && this.currentStyle.assets.length) || 0

			this.hiddenAssetContent = []

			//backwards loop to ensure asset [0] gets on top (as sorted in $store)
			for (var i = al - 1; i >= 0; i--) {
				let asset = this.currentStyle.assets[i]

				if (!asset.visible) {
					let type = getAssetType(asset)
					this.hiddenAssetContent.push({
						title: asset.name,
						contentId: asset.assetId,
						type: type,
						canOverride: false,
						windowProps: type.defaultWindowProps,
						contentComponentProps: { asset: asset },
						statusComponentProps: type.defaultStatusComponentProps
					})
				}
			}

			//ready to show details
			this.assistantMode = AssistantModes.STYLE_DETAILS
		},
		isSmallViewport() {
			this.viewPortSize = ViewportSizes.SMALL
		},
		isLargeViewport() {
			this.viewPortSize = ViewportSizes.LARGE
		},
		toggleContentHandler() {
			this.assistantExpanded = !this.assistantExpanded
		},
		shareUrlClickHandler(event) {
			let node = event.currentTarget

			if (document.body.createTextRange) {
				const range = document.body.createTextRange()
				range.moveToElementText(node)
				range.select()
			} else if (window.getSelection) {
				const selection = window.getSelection()
				const range = document.createRange()
				range.selectNodeContents(node)
				selection.removeAllRanges()
				selection.addRange(range)
			} else {
				console.warn('Could not select text in node: Unsupported browser.')
			}
		},
		downloadImageClickHandler() {
			this[SAVE_COLLAGE.action]()
		},
		makeBackgroundClickHandler() {
			this[MAKE_BACKGROUND.action]()
		},
		changeGarment(type, val) {
			// trigger used to inform watchers to re-run
			this[CHANGE_COLLAGE.action]({ trigger: Math.random(), type, val })
		}
	},
	mounted() {
		let isMobile = addMediaChangeListener(
			this.isSmallViewport,
			this.isLargeViewport
		)
		if (!isMobile) {
			this.assistantExpanded = false
			this.viewPortSize = ViewportSizes.LARGE
		}
	}
}
</script>