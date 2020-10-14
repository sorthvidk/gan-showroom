<template>
	<div>
		<div
			class="assistant__content"
			:class="{
				'is-collapsed': isMobile && !expanded
			}"
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
							<td>{{ currentStyle.colorNames }}</td>
						</tr>

						<tr>
							<th>&nbsp;</th>
							<td>&nbsp;</td>
						</tr>

						<tr>
							<th>Material</th>
							<td>{{ currentStyle.material }}</td>
						</tr>
						<tr>
							<th>Style #</th>
							<td>{{ currentStyle.styleId }}</td>
						</tr>
						<tr>
							<th>Program #</th>
							<td>{{ currentStyle.program }}</td>
						</tr>
						<tr>
							<th>Program name</th>
							<td>{{ currentStyle.programName }}</td>
						</tr>

						<tr>
							<th>&nbsp;</th>
							<td>&nbsp;</td>
						</tr>

						<tr>
							<th>Wholesale price</th>
							<td>DKK {{ currentStyle.wholesalePriceDKK }}</td>
						</tr>
						<tr>
							<th>Wholesale price</th>
							<td>EUR {{ currentStyle.wholesalePriceEUR }}</td>
						</tr>
						<tr>
							<th>Wholesale price</th>
							<td>USD {{ currentStyle.wholesalePriceUSD }}</td>
						</tr>
						<tr v-if="currentStyle.wholesalePriceGBP">
							<th>Wholesale price</th>
							<td>GBP {{ currentStyle.wholesalePriceGBP }}</td>
						</tr>

						<tr>
							<th>&nbsp;</th>
							<td>&nbsp;</td>
						</tr>

						<tr>
							<th>Suggested retail price</th>
							<td>DKK {{ currentStyle.retailPriceDKK }}</td>
						</tr>
						<tr>
							<th>Suggested retail price</th>
							<td>EUR {{ currentStyle.retailPriceEUR }}</td>
						</tr>
						<tr>
							<th>Suggested retail price</th>
							<td>USD {{ currentStyle.retailPriceUSD }}</td>
						</tr>
						<tr v-if="currentStyle.retailPriceGBP">
							<th>Suggested retail price</th>
							<td>GBP {{ currentStyle.retailPriceGBP }}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>

		<div class="assistant__ctas">
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
				:class="{
					'is-active': styleOnWishList,
					'is-animating': styleHasBeenAdded
				}"
				@click="addToWishListClickHandler"
			>
				<span class="icon">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
						<path class="checkmark" d="M24.75 62l27.5 27.5 51-51" />
					</svg>
				</span>
				<p>{{ addToWishListButtonLabel }}</p>
			</button>
			<button
				class="button view-wishlist button--half"
				@click="viewWishListClickHandler"
			>
				<p>{{ viewWishListButtonLabel }}</p>
			</button>
		</div>
	</div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import {
	ALL_ASSETS_VISIBLE,
	ADD_TO_WISHLIST,
	OPEN_CONTENT,
	OPEN_WISH_LIST,
	SHOW_PREVIOUS_STYLE,
	SHOW_NEXT_STYLE,
	SET_HIDDEN_ASSETS
} from '~/model/constants'
import sendTracking from '~/utils/send-tracking'

export default {
	name: 'assistant-mode-style-details',
	data: () => ({ styleHasBeenAdded: false }),
	computed: {
		...mapState('utils', ['isMobile']),
		...mapState('user', ['keyPressed']),
		...mapState('assistant', ['assistantMode', 'expanded']),
		...mapState('collection', [
			'currentStyle',
			'wishList',
			'hiddenAssetContent'
		]),
		...mapGetters('assistant', ['viewWishListButtonLabel']),
		hasHiddenAssets() {
			return this.hiddenAssetContent.length > 0
		},
		styleOnWishList() {
			return this.wishList.find(s => s.styleId === this.currentStyle.styleId)
		},
		addToWishListButtonLabel() {
			if (this.styleOnWishList) return 'Added to wishlist'
			return 'Add to wishlist'
		}
	},
	watch: {
		keyPressed(event) {
			if (event.key === 'ArrowLeft') {
				this.previousStyleHandler()
			}

			if (event.key === 'ArrowRight') {
				this.nextStyleHandler()
			}

			if (event.code === 'Space') {
				this.addToWishListClickHandler()
			}
		}
	},
	methods: {
		...mapActions([]),
		...mapActions('collection', [
			OPEN_CONTENT.action,
			ALL_ASSETS_VISIBLE.action,
			SHOW_PREVIOUS_STYLE.action,
			SHOW_NEXT_STYLE.action,
			OPEN_WISH_LIST.action,
			ADD_TO_WISHLIST.action,
			SET_HIDDEN_ASSETS.action
		]),
		showAllVariantsClickHandler() {
			this[ALL_ASSETS_VISIBLE.action](this.currentStyle)
			this[OPEN_CONTENT.action]({
				windowContent: this.hiddenAssetContent,
				addToGroupId: this.topMostWindow.groupId
			})
			this[SET_HIDDEN_ASSETS.action](false)
		},
		addToWishListClickHandler() {
			if (!this.styleOnWishList) {
				this[ADD_TO_WISHLIST.action](this.currentStyle.styleId)

				this.styleHasBeenAdded = true
				setTimeout(() => {
					this.styleHasBeenAdded = false
				}, 4000)

				sendTracking('Add to wish list', this.currentStyle.styleId)
			}
		},
		previousStyleHandler() {
			this[SHOW_PREVIOUS_STYLE.action](this.currentStyle.styleId)
		},
		nextStyleHandler() {
			this[SHOW_NEXT_STYLE.action](this.currentStyle.styleId)
		},
		viewWishListClickHandler() {
			this[OPEN_WISH_LIST.action]()
		}
	}
}
</script>