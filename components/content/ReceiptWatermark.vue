<template>
	<div class="receipt-watermark" :style="{background}"></div>
</template>

<script>
export default {
	name: 'receipt-watermark',
	data() {
		return {
			text: 'FOR INTERNAL USE ONLY',
			height: '1300',
			fontSize: '65',
			rotate: `transform='rotate(-35)'`
		}
	},
	computed: {
		background() {
			return `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' height='${
				this.height
			}' width='100%'><text x='-350' y='${this.height / 2}' fill='black' ${
				this.rotate
			} font-size='${
				this.fontSize
			}' font-family='Helvetica Neue, Arial, sans-serif'>${
				this.text
			}</text></svg>")`
		}
	}
}
</script>