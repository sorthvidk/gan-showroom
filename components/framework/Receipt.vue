<template>
	<div class="receipt">
		<h1 class="receipt__title" style="font-weight: 500;">ganni wishlist</h1>
		<receipt-item v-for="(item, key) in receiptStyles" :key="'receiptItem'+key" :receipt-item="item" />
		<!-- <a href="//pdfcrowd.com/url_to_pdf/">Save to PDF</a> -->
	</div>
</template>

<script>
import { mapState } from 'vuex'
import ReceiptItem from '~/components/content/ReceiptItem.vue'

export default {
	name: 'Receipt',
	components: {
		ReceiptItem
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
		receiptStyles() {
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

			// /receipt <- shows all styles
			// /receipt/?styles=F5987334,F8907234,F1121095 <- shows those three styles
			// /receipt/?styles=c1 <- shows that filter/category
			// /receipt/?styles=F5987334,LEOPARD%20PRINT <- shows that style, and all leopard-print-styles

			this.urlParams = styles.split(',')
		}
	},
	mounted() {
		this.parseUrl()
	}
}
</script>