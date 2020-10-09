<template>
	<div>
		<div class="assistant__content">
			<div class="assistant__text">
				<h3>WELCOME TO DITTE’S DESKTOP</h3>
				<p>
					Hey there, how’s it going? I’m your Desktop Assistant and I’ll be
					showing you around the place. Kick back, relax, pour a drink, explore
					– I’m here if you need me. Let’s go!
				</p>
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