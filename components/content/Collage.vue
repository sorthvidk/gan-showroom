<template>
	<div class="collage">
		<div class="head">
			<vue-web-cam
				ref="webcam"
				v-if="!photo"
				:width="this.webcamWidth"
				:height="this.webcamHeight"
				:selectFirstDevice="true"
			/>
			<img ref="image" :src="photo" />
		</div>

		<div id="container"></div>

		<button @click="takePhoto">Take photo</button>
		<button @click="takeNewPhoto">Take another photo</button>
		<button @click="savePhoto">Save photo</button>
	</div>
</template>

<script>
export default {
	name: 'collage',
	data() {
		return {
			webcamWidth: 150,
			webcamHeight: 115,
			dpi: 2,
			photo: null
		}
	},
	methods: {
		insertPhotoToCanvas({
			src,
			top = 0,
			left = 0,
			width,
			height,
			draggable = true
		}) {
			const image = new Image()

			image.onload = () => {
				const img = new this.$Konva.Image({
					image,
					x: left,
					y: top,
					width: width,
					height: height,
					draggable
				})
				img.on('mouseover', () => (document.body.style.cursor = 'pointer'))
				img.on('mouseout', () => (document.body.style.cursor = 'default'))
				img.on('dragstart', e => {
					e.target.moveToTop()
					this.layer.draw()
				})
				img.on('dblclick dbltap', e => {
					e.target.destroy()
					this.layer.draw()
				})
				this.layer.add(img)
				this.layer.draw()
			}
			image.src = src
		},
		takePhoto() {
			this.photo = this.$refs.webcam.capture()
			this.insertPhotoToCanvas({
				src: this.photo,
				top: 0,
				left: 175,
				width: this.webcamWidth,
				height: this.webcamHeight
			})
		},
		takeNewPhoto() {
			this.photo = null
		},
		savePhoto() {
			// function from https://stackoverflow.com/a/15832662/512042
			function downloadURI(uri, name) {
				var link = document.createElement('a')
				link.download = name
				link.href = uri
				document.body.appendChild(link)
				link.click()
				document.body.removeChild(link)
				link.remove()
			}

			var dataURL = this.stage.toDataURL({ pixelRatio: 3 })
			downloadURI(dataURL, 'stage.png')
		}
	},
	mounted() {
		this.stage = new this.$Konva.Stage({
			container: 'container',
			width: 500,
			height: 500
		})

		this.layer = new this.$Konva.Layer()
		this.stage.add(this.layer)

		this.insertPhotoToCanvas({
			src: '/img/collage/f4003b.png',
			top: -5,
			left: 24,
			width: 500,
			height: 500,
			draggable: false
		})

		this.insertPhotoToCanvas({
			src: '/img/collage/dress.png',
			top: 50,
			left: 24,
			width: 240,
			height: 300
		})

		this.insertPhotoToCanvas({
			src: '/img/collage/hat.png',
			top: 100,
			left: 50,
			width: 140,
			height: 100
		})

		this.insertPhotoToCanvas({
			src: '/img/collage/boots.png',
			top: 300,
			left: 100,
			width: 110,
			height: 100
		})
	}
}
</script>