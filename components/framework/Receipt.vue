<template>
	<div class="receipt">
		<h1 class="receipt__title" style="font-weight: 500;">ganni export</h1>
		<receipt-item
			v-for="(item, key) in receiptStyles"
			:key="'receiptItem' + key"
			:receipt-item="item"
		/>
		<receipt-watermark />
		<!-- <a href="//pdfcrowd.com/url_to_pdf/">Save to PDF</a> -->
	</div>
</template>

<script>
import { mapState } from 'vuex'
import ReceiptItem from '~/components/content/ReceiptItem.vue'
import ReceiptWatermark from '~/components/content/ReceiptWatermark.vue'

export default {
	name: 'Receipt',
	components: {
		ReceiptItem,
		ReceiptWatermark
	},
	data() {
		return {
			group: null,
			filter: null,
			styles: null,
			urlParams: []
		}
	},
	computed: {
		...mapState('collection', ['allStyles']),
		usableStyles() {
			return this.allStyles.filter(s => !s.styleId.includes('TEST')) // [fix this] - weird check..?
		},
		filterGroup() {
			this.group
				? this.usableStyles.filter(s => s.groupId === this.group)
				: this.usableStyles
		},
		filterFilter() {
			this.filter
				? this.filterGroup.filter(s => s.filterId === this.filter)
				: this.filterGroup
		},
		filterStyles() {
			this.styles
				? this.filterFilter.filter(s => this.styles.includes(s.styleId))
				: this.filterFilter
		},
		receiptStyles() {
			return this.filterStyles
		}
	},
	methods: {
		parseUrl() {
			const url = new URL(window.location.href)
			const styles = url.searchParams.get('styles')
			this.filter = url.searchParams.get('filter')
			this.group = url.searchParams.get('group')

			// /receipt <- shows all styles
			// /receipt/?styles=F5987334,F8907234,F1121095 <- shows those three styles
			// /receipt/?styles=c1 <- shows that filter/category
			// /receipt/?styles=F5987334,LEOPARD%20PRINT <- shows that style, and all leopard-print-styles

			console.log(this.filter, this.group)

			this.styles = styles && styles.split(',')
		}
	},
	mounted() {
		this.parseUrl()
	}
}
</script>
