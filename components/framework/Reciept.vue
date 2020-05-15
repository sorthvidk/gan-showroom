<template>
	<div class="reciept">
		<h1 class="reciept__title">ganni wishlist</h1>
		<!-- wish-list-accordion - when shown inside .reciept it's heavily restyled -->
		<wish-list-accordion
			v-for="(item, key) in recieptStyles"
			:key="'wishListItem'+key"
			:wish-list-item="item"
		/>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import WishListAccordion from '~/components/content/WishListAccordion.vue'

export default {
	name: 'Reciept',
	components: {
		WishListAccordion
	},
	data() {
		return {
			urlParams: []
		}
	},
	computed: {
		...mapState({
			allStyles: state => state.collection.list
		}),
		usableStyles() {
			return this.allStyles.filter(s => !s.styleId.includes('TEST')) // [fix this] - weird check..?
		},
		recieptStyles() {
			// go through all the styles in the DB
			return this.usableStyles.filter(
				// return style if:
				s =>
					this.urlParams.includes(s.styleId) || // url includes the specific styleID
					this.urlParams.find(param => s.filters.includes(param)) // url includes any of a style's filters
			)
		}
	},
	methods: {
		parseUrl() {
			const url = new URL(window.location.href)
			const styles = url.searchParams.get('styles') || ''

			// /reciept <- shows all styles
			// /reciept/?styles=F5987334,F8907234,F1121095 <- shows those three styles
			// /reciept/?styles=c1 <- shows that filter/category
			// /reciept/?styles=F5987334,LEOPARD%20PRINT <- shows that style, and all leopard-print-styles

			this.urlParams = styles.split(',')
		}
	},
	mounted() {
		this.parseUrl()
	}
}
</script>