<template>
	<div class="wish-list">
		WISHLIST LENGTH: {{wishList.length}}
	</div>
</template>

<script>

import { vuex, mapActions, mapState } from 'vuex'

// import CollectionItem from '~/components/content/CollectionItem.vue'

export default {
	name:'wish-list',
	components: {
		// CollectionItem
	},
	computed: {
		...mapState({
			wishList: state => state.collection.wishList
		})
	}
};

</script>