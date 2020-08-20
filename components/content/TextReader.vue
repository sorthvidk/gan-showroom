<template>
	<div class="text-reader">
		<p v-html="textContent"></p>
	</div>
</template>

<script>
import WindowContent from '~/components/framework/WindowContent.vue'

export default {
	extends: WindowContent,
	name:'text-reader',
	props: {
		text: {
			type: String,
			default: ''
		},
		asset: {
			type: Object,
			required: true
		}
	},
	computed: {
		textContent() {
			if ( this.asset && this.asset.text ) return this.asset.text
			else return this.text
		}
	}
};
</script>