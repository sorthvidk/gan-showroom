<template>
	<div class="reciept">
		<h1 class="reciept__title" style="font-weight: 500;">ganni wishlist</h1>
		<!-- wish-list-accordion - when shown inside .reciept it's heavily restyled -->
		<!-- <wish-list-accordion
			v-for="(item, key) in recieptStyles"
			:key="'wishListItem'+key"
			:wish-list-item="item"
		/>-->
		<reciept-item v-for="(item, key) in recieptStyles" :key="'recieptItem'+key" :reciept-item="item" />
		<a href="//pdfcrowd.com/url_to_pdf/">Save to PDF</a>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import RecieptItem from '~/components/content/RecieptItem.vue'

export default {
	name: 'Reciept',
	components: {
		RecieptItem
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
			return this.urlParams[0] === 'all'
				? this.usableStyles
				: this.usableStyles.filter(
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
			const styles = url.searchParams.get('styles') || 'all'

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