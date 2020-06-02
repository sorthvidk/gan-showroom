<template>
	<section
		class="window window--tight window--assistant"
		:class="'assistant-mode--' + assistantMode"
	>
		<div class="window__top">
			<span class="title">Desktop assistant</span>
		</div>

		<!-- ####################### STATUS ####################### -->

		<div class="window__status" v-if="assistantMode == 1 && viewPortSize == 0">
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

		<div class="window__status" v-if="assistantMode == 2 && viewPortSize == 0">
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

		<div class="window__status" v-if="assistantMode == 2 && viewPortSize == 1">
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

		<hr v-if="assistantMode == 2 && (viewPortSize == 1 || (viewPortSize == 0 && assistantExpanded))" />

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
					:class="{'is-collapsed': viewPortSize == 0 && !assistantExpanded}"
				>
					<div class="assistant__filters">
						<h3>PS21 COLLECTION</h3>
						<p>Browse the full line-up, find out more about each piece, get a close up look at the collection, fall in love. Skip to the good stuff by choosing from the below:</p>
						<div class="assistant__filters__list">
							<filter-button
								v-for="(item, key) in filtersList"
								:key="key"
								:name="item.name"
								:count="item.styleIds.length"
								:filter-id="item.filterId"
							/>
							<span class="filter-button" v-if="filtersList.length % 2 > 0">&nbsp;</span>
						</div>
					</div>
				</div>

				<div
					class="assistant__content"
					v-if="assistantMode == 2"
					:class="{'is-collapsed': viewPortSize == 0 && !assistantExpanded}"
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

				<div class="assistant__content" v-if="assistantMode == 3">
					<div class="assistant__text">
						<p>You know the drill. Add your favourites to your wishlist. When you’re done you can download to see your favorites or share with your team</p>
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

				<div class="assistant__ctas" v-if="assistantMode == 0 && wishList.length > 0">
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
						<p>Download collection</p>
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
						<span class="icon">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10">
								<path d="M8.4 5.4v-.9L5.3 7.2V.6h-.6v6.6L1.6 4.5v.9l3.4 3zM1 9.4h8v.6H1z" />
							</svg>
						</span>
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
	OPEN_WISH_LIST,
	CLIPBOARD_COPY,
	DOWNLOAD_PREPARING
} from '~/model/constants'

import FilterButton from '~/components/content/FilterButton.vue'

import ContentTypes from '~/model/content-types'
import ViewportSizes from '~/model/viewport-sizes'
import AssistantModes from '~/model/assistant-modes'

import getAssetType from '~/utils/asset-type'
import copyToClipboard from '~/utils/copy-to-clipboard'
import addMediaChangeListener from '~/utils/media-change'
import getShortUrl from '~/utils/get-short-url'
import isMobile from '~/utils/is-mobile'
import sendTracking from '~/utils/send-tracking'

export default {
	name: 'assistant',
	components: {
		FilterButton
	},
	data() {
		return {
			assistantExpanded: true,
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
				'//pdfcrowd.com/url_to_pdf/?pdf_name=ganni-wishlist&width=210mm&height=297mm&hmargin=0mm&vmargin=0mm'
		}
	},
	computed: {
		...mapState({
			keyPressed: state => state.keyPressed,
			filtersList: state => state.collection.filters,
			wishList: state => state.collection.wishList,
			currentStyles: state => state.collection.currentStyles,
			topMostWindow: state => state.topMostWindow,
			activeFilter: state => state.collection.activeFilter,
			clipBoardCopyComplete: state => state.clipBoardCopyComplete
		}),
		viewWishListButtonLabel() {
			return `View wishlist (${this.wishList.length})`
		},
		addToWishListButtonLabel() {
			if (this.styleOnWishList) return 'Added to wishlist'
			return 'Add to wishlist'
		},
		styleOnWishList() {
			console.log("this.currentStyle.onWishList??", this.currentStyle.onWishList)
			return this.currentStyle.onWishList
		},
		hasHiddenAssets() {
			return this.hiddenAssetContent.length > 0
		},
		filterStatusText() {
			if (this.filterName) return this.filterName
			return 'Filter'
		},
		wishListUrl() {
			return `${window.location}export/?styles=${this.wishList
				.map(style => style.styleId)
				.join(',')}`
		},
		collectionUrl() {
			return `${window.location}export/?styles=${this.currentStyles
				.map(style => style.styleId)
				.join(',')}`
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
		activeFilter(newVal) {
			if (newVal && newVal.name != '') this.filterName = newVal.name
			else this.filterName = null
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
							this.currentStyle = this.currentStyles.filter(
								e => e.styleId === componentProps.asset.styleId
							)[0]
							this.parseAssets()
						} else {
							noRelevantAssistantContent = true
						}
						break
					case ContentTypes.wishList.contentComponent:
						this.assistantMode = AssistantModes.WISHLIST
						break
					default:
						//No window type found?
						noRelevantAssistantContent = true
						break
				}
			}

			if (noRelevantAssistantContent) {
				if (this.wishList.length > 0) {
					this.assistantMode = AssistantModes.COLLECTION_SEEN
				} else {
					this.assistantMode = AssistantModes.WELCOME
				}
			}
		},
		wishList(newVal) {
			if ( newVal.length == 0 && this.assistantMode == AssistantModes.COLLECTION_SEEN ) {
				this.assistantMode = AssistantModes.WELCOME
			}
		}
	},
	methods: {
		...mapActions([
			OPEN_CONTENT.action,
			CLOSE_WINDOW_GROUP.action,
			OPEN_WISH_LIST.action,
			CLIPBOARD_COPY.action,
			DOWNLOAD_PREPARING.action,
			'collection/' + ALL_ASSETS_VISIBLE.action,
			'collection/' + SET_CURRENT_FILTER.action,
			'collection/' + ADD_TO_WISHLIST.action,
			'collection/' + REMOVE_FROM_WISHLIST.action,
			'collection/' + SHOW_PREVIOUS_STYLE.action,
			'collection/' + SHOW_NEXT_STYLE.action
		]),
		viewWishListClickHandler() {
			//VIEW WISHLIST
			this[OPEN_WISH_LIST.action]()
		},
		previousStyleHandler() {
			this['collection/' + SHOW_PREVIOUS_STYLE.action](
				this.currentStyle.styleId
			)
		},
		nextStyleHandler() {
			this['collection/' + SHOW_NEXT_STYLE.action](this.currentStyle.styleId)
		},
		closeStyleHandler() {
			this[CLOSE_WINDOW_GROUP.action]()
		},
		showAllVariantsClickHandler() {
			this['collection/' + ALL_ASSETS_VISIBLE.action](this.currentStyle)
			this[OPEN_CONTENT.action]({
				windowContent: this.hiddenAssetContent,
				addToGroupId: this.associatedWindowGroupId
			})
			this.hiddenAssetContent = []
		},
		addToWishListClickHandler() {
			if (!this.styleOnWishList) {
				this['collection/' + ADD_TO_WISHLIST.action](this.currentStyle)


				this.styleHasBeenAdded = true
				setTimeout(() => {
					this.styleHasBeenAdded = false
				}, 4000)


				sendTracking('Add to wish list', this.currentStyle.styleId)
			} else {
				// this['collection/' + REMOVE_FROM_WISHLIST.action](this.currentStyle)
			}
		},
		downloadCollectionClickHandler() {
			console.log('Download collection')
			history.pushState({}, '', this.collectionUrl)
			setTimeout(() => history.back(), 30000) // revert url after 30 sec
			this[DOWNLOAD_PREPARING.action](true)
		},
		downloadWishListClickHandler() {
			console.log('Download wishlist')
			history.pushState({}, '', this.wishListUrl)
			setTimeout(() => history.back(), 30000) // revert url after 30 sec
			this[DOWNLOAD_PREPARING.action](true)
		},
		shareWishListClickHandler() {
			console.log('Share wishlist', this.wishListUrl)

			getShortUrl(this.wishListUrl).then(shortenedUrl => {
				console.log('shortenedUrl', shortenedUrl)
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
		}
	},
	mounted() {
		let isMobile = addMediaChangeListener(
			this.isSmallViewport,
			this.isLargeViewport
		)
		if (!isMobile) {
			this.assistantExpanded = true
			this.viewPortSize = ViewportSizes.LARGE
		}
	}
}
</script>