<template>
	<div class="style-info">
		<span v-if="item.responsible" class="responsible">
			<div v-for="_ in 4" :key="`banner-item${_}`">
				<!-- I am a certified responsible material —&nbsp; -->
				<svg-icon name="ganni-smiley--inv" />&nbsp; responsible &nbsp;
			</div>
		</span>
		<span v-if="item['re-runner']" class="re-runner">
			<div v-for="_ in 5" :key="`banner-item-2${_}`">
				<!-- I am a certified responsible material —&nbsp; -->
				<svg-icon name="ganni-smiley" />&nbsp; re-runner &nbsp;
			</div>
		</span>

		<div class="style-info__row">
			<span>Color</span>
			<span>{{ item.colorNames }}</span>
		</div>
		<div class="style-info__row">
			<span>Material</span>
			<span>{{ item.material }}</span>
		</div>
		<div class="style-info__row">
			<span>Style #</span>
			<span>{{ item.styleId }}</span>
		</div>
		<div class="style-info__row">
			<span>Program #</span>
			<span>{{ item.program }}</span>
		</div>

		<div v-if="item.feature_text" class="style-info__row">
			<span>Features</span>
			<span>{{ item.feature_text }}</span>
		</div>

		<div class="style-info__row">
			<span>Program name</span>
			<span>{{ item.programName }}</span>
		</div>
		<div class="style-info__row" v-if="SHOW_WHOLESALE_PRICE">
			<span>Wholesale price</span>
			<span
				>DKK {{ item.wholesalePriceDKK }}<br />
				EUR {{ item.wholesalePriceEUR }}<br />
				USD {{ item.wholesalePriceUSD }}<br />
				GBP {{ item.wholesalePriceGBP }}</span
			>
		</div>

		<div class="style-info__row">
			<span>Suggested retail price</span>
			<span
				>DKK {{ item.retailPriceDKK }}<br />
				EUR {{ item.retailPriceEUR }}<br />
				USD {{ item.retailPriceUSD }}<br />
				<div v-if="item.retailPriceGBP">
					GBP {{ item.retailPriceGBP }}
				</div></span
			>
		</div>
	</div>
</template>
<script>
import { mapState } from 'vuex'
export default {
	name: 'style-info',
	props: {
		item: {
			type: Object,
			default: () => ({}),
		},
	},
	computed: {
		...mapState(['SHOW_WHOLESALE_PRICE']),
	},
}
</script>