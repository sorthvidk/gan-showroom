<template>
	<div id="puzzle" />
</template>

<script>
import { mapState } from 'vuex'
import headbreaker from 'headbreaker'

export default {
	name: 'puzzle',
	computed: {
		...mapState('puzzle', ['images', 'curIndex'])
	},
	watch: {
		curIndex() {
			this.init()
		}
	},
	methods: {
		init() {
			let image = new Image()
			image.src = this.images[this.curIndex]
			image.onload = () => {
				const autogen = new headbreaker.Canvas('puzzle', {
					width: 800,
					height: 800,
					proximity: 20,
					fixed: true,
					pieceSize: 100,
					borderFill: 10,
					lineSoftness: 0.2,
					strokeWidth: 1,
					strokeColor: '#fff',
					image,
					maxPiecesCount: { x: 8, y: 8 },
					painter: new headbreaker.painters.Konva()
				})

				autogen.adjustImagesToPuzzleHeight()
				autogen.autogenerate()
				autogen.shuffle(0.7)
				autogen.draw()
			}
		}
	},
	mounted() {
		this.init()
	}
}
</script>