<template>
	<div>
		<div class="assistant__content">
			<div class="assistant__text">
				<h3>{{ texts.default.headline }}</h3>
				<p>{{ texts.default.bodyText }}</p>
			</div>
		</div>
		<div class="assistant__ctas" v-if="wishList.length > 0">
			<button class="button view-wishlist" @click="viewWishList">
				<p>{{ viewWishListButtonLabel }}</p>
			</button>
		</div>
	</div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { OPEN_WISH_LIST } from '~/model/constants'

export default {
	name: 'assistant-mode-welcome',
	computed: {
		...mapState('collection', ['wishList']),
		...mapState('assistant', ['texts']),
		...mapGetters('assistant', ['viewWishListButtonLabel'])
	},
	methods: {
		...mapActions([OPEN_WISH_LIST.action]),
		viewWishList() {
			this[OPEN_WISH_LIST.action]()
		}
	}
}
</script>