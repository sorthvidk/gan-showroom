<template>
	<div ref="collage" class="collage">
		<div class="head" v-show="openPhotobooth || photoTimer">
			<vue-web-cam
				ref="webcam"
				:width="this.webcamWidth"
				:height="this.webcamHeight"
				:selectFirstDevice="true"
				@cameras="setCameras"
			/>
		</div>

		<div id="container"></div>

		<div
			title="Take photo"
			class="trigger button"
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
			<span
				v-else
				v-for="count in countdown"
				:class="count === photoTimer ? 'active' : ''"
				:key="count"
			>{{ count }}</span>
			<svg v-if="photoTimer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
				<path
					d="M256 0a256 256 0 100 512 256 256 0 000-512zm0 480a224 224 0 110-448 224 224 0 010 448z"
				/>
				<circle cx="176" cy="176" r="32" />
				<circle cx="336" cy="176" r="32" />
				<path d="M368 256a112 112 0 11-224 0h-32a144 144 0 00288 0h-32z" />
			</svg>
		</div>

		<div title="Change camera" @click="getNextCamera" class="button">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
				<path
					d="M256 0a10.6 10.6 0 00-6.7 19l53.4 42.7A10.7 10.7 0 00316 45l-26.6-21.3A235 235 0 01490.7 256a235 235 0 01-173.5 226.3 10.6 10.6 0 105.6 20.6A256.2 256.2 0 00512 256C512 114.8 397.2 0 256 0zM262.7 493l-53.4-42.7A10.7 10.7 0 00196 467l26.6 21.3A235 235 0 0121.3 256 235 235 0 01194.8 29.7 10.6 10.6 0 10189.2 9 256.2 256.2 0 000 256c0 141.2 114.8 256 256 256a10.6 10.6 0 006.7-19z"
				/>
				<path
					d="M183.2 121.8c-4 4-9.5 6.2-15.1 6.2H128a42.7 42.7 0 00-42.7 42.7v170.6A42.7 42.7 0 00128 384h256a42.7 42.7 0 0042.7-42.7V170.7A42.7 42.7 0 00384 128h-40c-5.7 0-11.2-2.3-15.2-6.3l-13.2-13.2A43 43 0 00285.4 96h-58.8a43 43 0 00-30.2 12.5l-13.2 13.3zm28.3 1.8c4-4 9.5-6.3 15-6.3h59c5.5 0 11 2.3 15 6.3l13.2 13.2c8 8 19 12.5 30.2 12.5H384c11.8 0 21.3 9.6 21.3 21.4v170.6c0 11.8-9.5 21.4-21.3 21.4H128a21.4 21.4 0 01-21.3-21.4V170.7c0-11.8 9.5-21.4 21.3-21.4h40a43 43 0 0030.3-12.5l13.2-13.2z"
				/>
				<circle cx="362.7" cy="192" r="21.3" />
				<path
					d="M256 341.3a85.4 85.4 0 000-170.6 85.4 85.4 0 000 170.6zm0-149.3a64 64 0 11-.1 128.1A64 64 0 01256 192z"
				/>
			</svg>
		</div>
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

			webcamImageRadius: 130,
			webcamImageOffset: 0,

			stageWidth: isMobile() ? 350 : 530,
			stageHeight: isMobile() ? 440 : 520,

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
		setCameras(cameras) {
			this.cameras = cameras
			this.currentCameraIndex = 0
		},
		getNextCamera() {
			this.currentCameraIndex =
				this.currentCameraIndex + 1 < this.cameras.length
					? this.currentCameraIndex + 1
					: 0
			this.$refs.webcam.changeCamera(
				this.cameras[this.currentCameraIndex].deviceId
			)
		},
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
					draggable: draggable && !round && layer !== 'background'
				})
				if (round) {
					var group = new Konva.Group({
						clipFunc: ctx => {
							ctx.arc(
								isMobile()
									? this.webcamImageRadius / 3
									: this.webcamImageRadius / 1.5,
								this.webcamImageRadius / 2.1, // y
								this.webcamImageRadius / 3, // radius
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
					width: {
						mobile: this.webcamImageRadius * 0.75,
						desktop: this.webcamImageRadius * 1.35
					},
					height: this.webcamImageRadius,
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
			src: '/img/collage/ballon.svg',
			y: isMobile() ? 0 : 50,
			x: isMobile() ? 0 : 100,
			width: 80,
			height: 240,
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