<template>
	<div class="audio-visualizer">
		<canvas ref="canvas"></canvas>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import { loadImage } from '~/utils/loadImage'
import image from '~/static/img/login-slide.jpg'

export default {
	name: 'audio-visualizer',
	data: () => ({
		dpi: 1,
		image: null,
	}),
	computed: {
		...mapState('user', ['screenSize']),
	},
	watch: {
		screenSize() {
			this.setSize()
		},
	},
	methods: {
		setSize() {
			this.$refs.canvas.width = this.screenSize.width * this.dpi
			this.$refs.canvas.height = this.screenSize.height * this.dpi
			this.$refs.canvas.style.width = this.screenSize.width + 'px'
			this.$refs.canvas.style.height = this.screenSize.height + 'px'
		},
		draw() {
			this.ctx.fillStyle = this.ctx.createPattern(this.image, 'no-repeat')

			const chars = 'GANNI NIGHT OUT'

			const charSize = this.screenSize.width / chars.length
			this.ctx.font = `bold ${charSize}px sans-serif`

			chars.split('').forEach((char, idx) => {
				this.ctx.fillText(char, idx * charSize, 200)
			})
		},
	},
	async mounted() {
		this.setSize()
		this.dpi = Math.min(window.devicePixelRatio, 2)
		this.ctx = this.$refs.canvas.getContext('2d')
		const res = await loadImage(image)
		console.log(res)
		this.image = res.img
		this.draw()
	},
}
</script>