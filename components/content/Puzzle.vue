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
					height: 700,
					fixed: true,
					pieceSize: 100,
					borderFill: 0,
					lineSoftness: 0.5,
					strokeWidth: 5,
					strokeColor: '#fff',
					image,
					painter: new headbreaker.painters.Konva()
				})

				autogen.adjustImagesToPuzzleHeight()
				autogen.autogenerate({
					horizontalPiecesCount: 8,
					verticalPiecesCount: 7
				})
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