<template>
	<div class="collage">
		<div class="head" v-if="!photo">
			<vue-web-cam
				ref="webcam"
				:width="this.webcamWidth"
				:height="this.webcamHeight"
				:selectFirstDevice="true"
			/>
			<div class="mask"></div>
		</div>

		<div id="container"></div>

		<button @click="takePhoto">Take photo</button>
		<button @click="takeNewPhoto">Take another photo</button>
		<button @click="savePhoto">Save photo</button>
		<button @click="saveAsBG">Make background</button>
	</div>
</template>

<script>
import { mapActions } from 'vuex'
import { SAVE_AS_BACKGROUND } from '~/model/constants'

export default {
	name: 'collage',
	data() {
		return {
			webcamWidth: 300,
			webcamHeight: 240,
			stageWidth: 500,
			stageHeight: 500,
			dpi: 2,
			photo: null
		}
	},
	methods: {
		...mapActions([SAVE_AS_BACKGROUND.action]),
		insertPhoto({
			src,
			y = 0,
			x = 0,
			width,
			height,
			draggable = true,
			round = false
		}) {
			const image = new Image()

			image.onload = () => {
				let output

				const img = new this.$Konva.Image({
					image,
					x,
					y,
					width,
					height,
					draggable: draggable && !round
				})
				if (round) {
					var group = new Konva.Group({
						clipFunc: function(ctx) {
							ctx.arc(300, 120, 75, 0, Math.PI * 2, false)
						},
						draggable
					})
					group.add(img)
					output = group
				} else {
					output = img
				}
				/**
				 * Add eventlisteners
				 */
				output.on('mouseover', () => (document.body.style.cursor = 'pointer'))
				output.on('mouseout', () => (document.body.style.cursor = 'default'))
				output.on('dragstart', e => {
					e.target.moveToTop()
					this.layer.draw()
				})
				output.on('dblclick dbltap', e => {
					e.target.destroy()
					this.layer.draw()
				})
				/**
				 * Add to the scene
				 */
				this.layer.add(output)
				this.layer.draw()
			}
			image.src = src
		},
		takePhoto() {
			this.photo = this.$refs.webcam.capture()
			this.insertPhoto({
				src: this.photo,
				y: 0,
				x: 150,
				width: this.webcamWidth,
				height: this.webcamHeight,
				round: true
			})
		},
		takeNewPhoto() {
			this.photo = null
		},
		savePhoto() {
			const dataURL = this.stage.toDataURL({ pixelRatio: 3 })
			this.downloadURI(dataURL, 'stage.png')
		},
		saveAsBG() {
			const dataURL = this.stage.toDataURL({ pixelRatio: 3 })

			this[SAVE_AS_BACKGROUND.action](dataURL)
		},
		downloadURI(uri, name) {
			// function from https://stackoverflow.com/a/15832662/512042
			var link = document.createElement('a')
			link.download = name
			link.href = uri
			document.body.appendChild(link)
			link.click()
			document.body.removeChild(link)
			link.remove()
		},
		fitStageIntoParentContainer() {
			var container = this.$el.parentElement

			// now we need to fit stage into parent
			var containerWidth = container.offsetWidth
			// to do this we need to scale the stage
			var scale = containerWidth / this.stageWidth

			this.stage.width(this.stageWidth * scale)
			this.stage.height(this.stageHeight * scale)
			this.stage.scale({ x: scale, y: scale })
			this.stage.draw()
		}
	},
	mounted() {
		this.stage = new this.$Konva.Stage({
			container: 'container',
			width: this.stageWidth,
			height: this.stageHeight
		})

		this.layer = new this.$Konva.Layer()
		this.stage.add(this.layer)

		this.insertPhoto({
			src: '/img/collage/f4003b.png',
			y: 0,
			x: 0,
			width: this.stageWidth,
			height: this.stageHeight,
			draggable: false
		})

		this.insertPhoto({
			src: '/img/collage/dress.png',
			y: 50,
			x: 24,
			width: 240,
			height: 300
		})

		this.insertPhoto({
			src: '/img/collage/hat.png',
			y: 100,
			x: 50,
			width: 100,
			height: 75
		})

		this.insertPhoto({
			src: '/img/collage/boots.png',
			y: 300,
			x: 100,
			width: 110,
			height: 100
		})

		this.fitStageIntoParentContainer()
		// adapt the stage on any window resize
		window.addEventListener(
			'resize',
			this.fitStageIntoParentContainer.bind(this)
		)
	}
}
</script>