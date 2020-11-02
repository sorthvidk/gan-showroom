<template>
	<div class="receipt">
		<h1 class="receipt__title" style="font-weight: 500;">ganni export</h1>
		<receipt-item
			v-for="(item, key) in receiptStyles"
			:key="'receiptItem' + key"
			:receipt-item="item"
		/>
		<receipt-watermark />
		<a :href="pdfDownloadLink">Save to PDF</a>
		<a
			href="//pdfcrowd.com/url_to_pdf/?pdf_name=ganni-space-export&width=210mm&height=297mm&hmargin=0mm&vmargin=0mm"
			onclick="if(!this.p)href+='&url='+encodeURIComponent(location.href);this.p=1"
		>
			Save to PDF
		</a>
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
		...mapState('assistant', ['pdfDownloadLink']),
		...mapState('collection', ['allStyles']),
		usableStyles() {
			return this.allStyles.filter(s => !s.styleId.includes('TEST')) // [fix this] - weird check..?
		},
		filterGroup() {
			return this.group
				? this.usableStyles.filter(s => s.groupId === this.group)
				: this.usableStyles
		},
		filterFilter() {
			return this.filter
				? this.filterGroup.filter(s => s.filters.includes(this.filter))
				: this.filterGroup
		},
		filterStyles() {
			return this.styles
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
			this.styles = styles && styles.split(',')

			// example urls to show all styles with filter in a group:
			// http://localhost:3000/export/?filter=rtw10&group=drop1-nov

			// example to show a list of styles:
			// http://localhost:3000/export/?styles=T2685,T2692
		}
	},
	mounted() {
		this.parseUrl()
	}
}
</script>
