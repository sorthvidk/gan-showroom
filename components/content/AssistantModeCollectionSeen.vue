<template>
	<div>
		<div class="assistant__content">
			<div class="assistant__text" v-if="!shortenedReceiptUrl">
				<p>
					Me again. Don’t forget you’ve got items waiting for you in your
					wishlist. Have you explored the rest of Ditte’s desktop yet?
				</p>
			</div>

			<div class="assistant__text" v-else>
				<p>Your Wishlist link</p>
				<strong @click="shareUrlClickHandler">{{ shortenedReceiptUrl }}</strong>
			</div>
		</div>

		<div class="assistant__ctas">
			<button class="button view-wishlist" @click="viewWishListClickHandler">
				<p>{{ viewWishListButtonLabel }}</p>
			</button>
		</div>
	</div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { OPEN_WISH_LIST } from '~/model/constants'
import selectText from '~/utils/select-text'

export default {
	name: 'assistant-mode-collection-seen',
	computed: {
		...mapState('utils', ['shortenedReceiptUrl']),

		...mapGetters('collection', ['wishListUrl']),
		...mapGetters('assistant', ['viewWishListButtonLabel'])
	},
	methods: {
		...mapActions([OPEN_WISH_LIST.action]),

		shareUrlClickHandler(event) {
			selectText(event)
		},
		viewWishListClickHandler() {
			//VIEW WISHLIST
			this[OPEN_WISH_LIST.action]()
		}
	}
}
</script>