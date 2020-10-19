<template>
	<div class="text-reader" :style="{ backgroundColor }">
		<p v-html="text"></p>
	</div>
</template>

<script>
import WindowContent from '~/components/framework/WindowContent.vue'

export default {
	extends: WindowContent,
	name: 'text-reader',
	props: {
		text: {
			type: String,
			default: ''
		}
	},
	data: () => ({
		backgroundColors: ['#fdef76', '#7581e3', '#e63755'],
		backgroundColor: ''
	}),
	methods: {
		shuffle(arr) {
			return arr
				.map(a => ({ sort: Math.random(), value: a }))
				.sort((a, b) => a.sort - b.sort)
				.map(a => a.value)
		}
	},
	mounted() {
		// suuuuper random
		this.backgroundColor = this.shuffle(this.backgroundColors)[
			Math.floor(Math.random() * this.backgroundColors.length)
		]
	}
}
</script>