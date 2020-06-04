<template>
	<div ref="collage" class="collage">
		<button
			@mouseenter="openPhotobooth = true"
			@mouseleave="openPhotobooth = false"
			@click="takePhoto"
		>Take photo</button>
		<button @click="savePhoto">Save photo</button>
		<button @click="saveAsBG">Make background</button>
		<p>Change hat</p>
		<button @click="change('hats', 0)">←</button>
		<button @click="change('hats', 1)">→</button>

		<div class="head" v-show="openPhotobooth">
			<vue-web-cam
				ref="webcam"
				:width="this.webcamWidth"
				:height="this.webcamHeight"
				:selectFirstDevice="true"
			/>
			<div class="mask"></div>
		</div>

		<div id="container"></div>
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
			webcamHeight: 220,
			stageWidth: 500,
			stageHeight: 500,
			webcamImageOffset: 150,

			openPhotobooth: false,
			photo: null,

			clothes: {
				hats: [
					{
						src: '/img/collage/hat.png',
						y: 100,
						x: 50,
						width: 100,
						height: 75
					},
					{
						src: '/img/collage/hat2.png',
						y: 100,
						x: 50,
						width: 130,
						height: 75
					},
					{
						src: '/img/collage/hat3.png',
						y: 100,
						x: 50,
						width: 100,
						height: 75
					}
				],
				tops: [
					{
						src: '/img/collage/dress.png',
						y: 50,
						x: 24,
						width: 240,
						height: 300
					}
				],
				shoes: [
					{
						src: '/img/collage/boots.png',
						y: 300,
						x: 100,
						width: 110,
						height: 100
					}
				]
			}
		}
	},
	methods: {
		...mapActions([SAVE_AS_BACKGROUND.action]),
		insertPhoto({
			id,
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
					id: !round && id,
					image,
					x,
					y,
					width,
					height,
					draggable: draggable && !round
				})
				if (round) {
					var group = new Konva.Group({
						clipFunc: ctx => {
							ctx.arc(
								(this.webcamWidth + this.webcamImageOffset) / 2,
								this.webcamHeight / 4,
								35,
								0,
								Math.PI * 2,
								false
							)
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
			this.openPhotobooth = false
			this.photo = this.$refs.webcam.capture()
			this.insertPhoto({
				src: this.photo,
				y: 0,
				x: this.webcamImageOffset,
				width: this.webcamWidth / 2,
				height: this.webcamHeight / 2,
				round: true
			})
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
		fitScreen() {
			var container = this.$el.parentElement
			// now we need to fit stage into parent
			var containerWidth = container.offsetWidth
			// to do this we need to scale the stage
			var scale = containerWidth / this.stageWidth
			this.stage.width(this.stageWidth * scale)
			this.stage.height(this.stageHeight * scale)
			this.stage.scale({ x: scale, y: scale })
			this.stage.draw()
		},
		removeAndReturnOldKonvoImage(x) {
			return this.clothes[x].reduce((acc, garment) => {
				const existing = this.layer.children.filter(
					child =>
						child.attrs.image && child.attrs.image.src.includes(garment.src)
				)[0]
				if (existing) {
					acc = existing
					existing.destroy()
					this.layer.draw()
				}
				return acc
			}, this.clothes[x][0])
		},
		change(x, next) {
			const oldKonvoImage = this.removeAndReturnOldKonvoImage(x)
			const oldPlacement = {
				x: oldKonvoImage.attrs.x,
				y: oldKonvoImage.attrs.y
			}
			const oldImage = this.clothes[x].find(garment =>
				oldKonvoImage.attrs.image.src.includes(garment.src)
			)
			const oldIndex = this.clothes[x].reduce(
				(index, garment, i) => (garment.src === oldImage.src ? i : index),
				0
			)

			const plusOneOrFirst = () =>
				oldIndex === this.clothes[x].length - 1 ? 0 : oldIndex + 1
			const minusOneOrLast = () =>
				oldIndex === 0 ? this.clothes[x].length - 1 : oldIndex - 1

			const newIndex = next ? plusOneOrFirst() : minusOneOrLast()
			const newImage = this.clothes[x][newIndex]
			Object.assign(newImage, oldPlacement)
			this.insertPhoto(newImage)
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

		// bg
		this.insertPhoto({
			src: '/img/collage/f4003b.png',
			y: 0,
			x: 0,
			width: this.stageWidth,
			height: this.stageHeight,
			draggable: false
		})

		/**
		 * Add first image of each category
		 */
		Object.entries(this.clothes).forEach(([category, clothes]) => {
			this.insertPhoto(clothes[0])
		})
	}
}
</script>