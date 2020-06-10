<template>
	<div ref="collage" class="collage">
		<div class="head" v-show="openPhotobooth || photoTimer">
			<vue-web-cam
				ref="webcam"
				:width="this.webcamWidth"
				:height="this.webcamHeight"
				:selectFirstDevice="true"
			/>
		</div>

		<div id="container"></div>

		<button
			:class="{ photoTimer }"
			@mouseenter="openPhotobooth = true"
			@mouseleave="openPhotobooth = false"
			@click="takePhotoWithTimer(3)"
		>
			<svg v-if="!photoTimer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
				<circle cx="256" cy="277.3" r="106.7" />
				<path
					d="M469.3 106.7h-67.6c-8.6 0-16.6-3.4-22.7-9.4l-39-39a53 53 0 00-37.7-15.6h-92.6A53 53 0 00172 58.3l-39 39c-6 6-14.1 9.4-22.7 9.4H42.7A42.7 42.7 0 000 149.3v277.4a42.7 42.7 0 0042.7 42.6h426.6a42.7 42.7 0 0042.7-42.6V149.3a42.7 42.7 0 00-42.7-42.6zM256 405.3c-70.6 0-128-57.4-128-128s57.4-128 128-128 128 57.5 128 128-57.4 128-128 128zm170.7-192a21.4 21.4 0 110-42.7 21.4 21.4 0 010 42.7z"
				/>
			</svg>
			<p
				v-else
				v-for="count in countdown"
				:class="count === photoTimer ? 'active' : ''"
				:key="count"
			>{{ count }}</p>
			<svg v-if="photoTimer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
				<path
					d="M256 0a256 256 0 100 512 256 256 0 000-512zm0 480a224 224 0 110-448 224 224 0 010 448z"
				/>
				<circle cx="176" cy="176" r="32" />
				<circle cx="336" cy="176" r="32" />
				<path d="M368 256a112 112 0 11-224 0h-32a144 144 0 00288 0h-32z" />
			</svg>
		</button>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { SAVE_AS_BACKGROUND, COLLAGE_IS_OPEN } from '~/model/constants'
import isMobile from '~/utils/is-mobile'

export default {
	name: 'collage',
	data() {
		return {
			webcamWidth: 300,
			webcamHeight: 220,
			stageWidth: isMobile() ? 350 : 530,
			stageHeight: isMobile() ? 510 : 520,
			webcamImageOffset: 150,

			openPhotobooth: false,
			photo: null,
			photoTimer: false,
			countdown: [3, 2, 1]
		}
	},
	computed: {
		...mapState(['saveCollage', 'makeBackground', 'changeCollage']),
		...mapState('collage', ['clothes'])
	},
	watch: {
		saveCollage() {
			this.savePhoto()
		},
		makeBackground() {
			this.saveAsBG()
		},
		changeCollage: {
			deep: true,
			handler({ type, val }) {
				this.change(type, val)
			}
		}
	},
	methods: {
		...mapActions([SAVE_AS_BACKGROUND.action, COLLAGE_IS_OPEN.action]),
		insertPhoto({
			src,
			y = 0,
			x = 0,
			width,
			height,
			draggable = true,
			round = false,
			layer = 'layer'
		}) {
			const image = new Image()

			const extract = val =>
				typeof val === 'object' ? (isMobile() ? val.mobile : val.desktop) : val

			const w = extract(width)
			const h = extract(height)
			const left = extract(x)
			const top = extract(y)

			image.onload = () => {
				let output

				const img = new this.$Konva.Image({
					image,
					x: left,
					y: top,
					width: w,
					height: h,
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
				// output.on('dblclick dbltap', e => {
				// 	e.target.destroy()
				// 	this.layer.draw()
				// })
				/**
				 * Add to the scene
				 */
				this[layer].add(output)
				this[layer].draw()
			}
			image.src = src
		},
		takePhotoWithTimer(time) {
			this.photoTimer = time
			if (!time) {
				this.openPhotobooth = false
				this.photoTimer = false
				this.photo = this.$refs.webcam.capture()
				this.insertPhoto({
					src: this.photo,
					y: 0,
					x: this.webcamImageOffset,
					width: this.webcamWidth / 2,
					height: this.webcamHeight / 2,
					round: true
				})
			} else setTimeout(() => this.takePhotoWithTimer(time - 1), 1000)
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
			if (!this.clothes[x]) return

			return this.clothes[x].reduce((acc, garment) => {
				const layer = x === 'background' ? 'background' : 'layer'
				const existing = this[layer].children.filter(
					child =>
						child.attrs.image && child.attrs.image.src.includes(garment.src)
				)[0]
				if (existing) {
					acc = existing
					existing.destroy()
					this[layer].draw()
				}
				return acc
			}, '')
		},
		change(x, next) {
			const oldKonvoImage = this.removeAndReturnOldKonvoImage(x)

			if (!oldKonvoImage) return

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

			const merged =
				x === 'background' ? newImage : { ...newImage, ...oldPlacement }
			this.insertPhoto(merged)
		}
	},
	mounted() {
		this[COLLAGE_IS_OPEN.action](true)

		this.stage = new this.$Konva.Stage({
			container: 'container',
			width: this.stageWidth,
			height: this.stageHeight
		})

		this.background = new this.$Konva.Layer()
		this.stage.add(this.background)

		this.doll = new this.$Konva.Layer()
		this.stage.add(this.doll)

		this.layer = new this.$Konva.Layer()
		this.stage.add(this.layer)

		this.watermark = new this.$Konva.Layer()
		this.stage.add(this.watermark)

		this.background.setZIndex(1)
		this.doll.setZIndex(2)
		this.layer.setZIndex(3)
		this.watermark.setZIndex(3)

		this.insertPhoto({
			src: '/img/collage/doll.png',
			y: isMobile() ? 0 : 50,
			x: isMobile() ? 0 : 100,
			width: 350,
			height: 450,
			// draggable: false,
			layer: 'doll'
		})

		this.insertPhoto({
			src: '/img/collage/watermark.png',
			y: 485,
			x: 10,
			width: 150,
			height: 23,
			draggable: false,
			layer: 'watermark'
		})

		/**
		 * Add first image of each category
		 */
		Object.entries(this.clothes).forEach(([category, clothes]) => {
			this.insertPhoto(clothes[0])
		})
	},
	beforeDestroy() {
		this[COLLAGE_IS_OPEN.action](false)
	}
}
</script>