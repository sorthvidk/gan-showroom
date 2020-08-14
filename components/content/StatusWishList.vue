<template>
	<p>{{text}}</p>
</template>

<script>
import { vuex, mapActions, mapState } from 'vuex'

export default {
	name: 'status-wish-list',
	computed: {
		...mapState('collection', ['collections', 'wishList']),
		activeWishlist() {
			const activeCollections = this.collections
				.filter(c => c.active)
				.map(c => c.collectionId)
			return this.wishList.filter(item =>
				activeCollections.includes(item.styleItem.collectionId)
			)
		},
		text() {
			return this.activeWishlist.length + ' items'
		}
	}
}
</script>