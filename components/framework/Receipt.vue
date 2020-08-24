<template>
	<div class="receipt">
		<h1 class="receipt__title" style="font-weight: 500;">ganni export</h1>
		
		<!-- <pre>{{ receiptStyles }}</pre> -->

		<receipt-item v-for="(item, key) in sortedItems" :key="'receiptItem'+key" :receipt-item="item" />
		<receipt-watermark />
		<!-- <a href="//pdfcrowd.com/url_to_pdf/">Save to PDF</a> -->
	</div>
</template>

<script>
import { mapState } from 'vuex'
import ReceiptItem from '~/components/content/ReceiptItem.vue'
import ReceiptWatermark from '~/components/content/ReceiptWatermark.vue'

import sortArrayMultiple from '~/utils/sort-array-multiple'

export default {
	name: 'Receipt',
	components: {
		ReceiptItem,
		ReceiptWatermark
	},
	data() {
		return {
			filter: null,
			urlParams: [],
		}
	},
	computed: {
		...mapState('collection', ['list', 'collections']),
		usableStyles() {
			return this.list.filter(s => !s.styleId.includes('TEST')) // [fix this] - weird check..?
		},
		urlIds() {
			return this.urlParams.map(({id}) => id)
		},
		isCollection() {
			return this.collections.find(c => this.urlParams.length && this.urlParams[0].id === c.collectionId)
		},
		receiptStyles() {
			// go through all the styles in the DB
			return this.urlParams[0] === 'all'
				? this.usableStyles
				: this.usableStyles.filter(
						// return style if:
						(s) =>
							this.urlIds.includes(s.styleId) || // url includes the specific styleID
							this.urlIds.find(param => s.filters.includes(param)) || // url includes any of a style's filters
							(this.filter ? (s.filters.includes(this.filter) && this.urlIds.includes(s.collectionId)) : this.urlIds.includes(s.collectionId))
					)
		},
		colorsFiltered() {
			if(this.isCollection) {
				return this.receiptStyles
			}

			return this.receiptStyles.map(item => {
				const currentItem = this.urlParams.find(({ id }) => id === item.styleId)
				const itemCopy = {...item}
				// we just overwrite the org colors with the ones passed in the url
				itemCopy.colorNames = currentItem.colors ? currentItem.colors.join(', ') : itemCopy.colorNames
				return itemCopy
			})
		},
		sortedItems() {
			return sortArrayMultiple(this.colorsFiltered, 'drop')
		}
	},
	methods: {
		parseUrl() {
			const url = new URL(window.location.href)
			let styles = url.searchParams.get('styles') || 'all'

			// /receipt <- shows all styles
			// /receipt/?styles=F5987334,F8907234,F1121095 <- shows those three styles
			// /receipt/?styles=c1 <- shows that filter/category
			// /receipt/?styles=F5987334,LEOPARD%20PRINT <- shows that style, and all leopard-print-styles
			// /receipt/?styles=collectionId <- shows all style in the given collection

			if(styles.includes('_')) {
				this.filter = styles.split('_')[1]
				styles = styles.split('_')[0]
			}

			this.urlParams = styles.split(',').map(style => {
				const [id, colors] = style.split('~')
				return {
					id,
					colors: colors && colors.split('.')
				}
			})
		}
	},
	mounted() {
		this.parseUrl()
	}
}
</script>