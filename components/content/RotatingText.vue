<template>
	<div ref="rotating-text"></div>
</template>

<script>
import * as THREE from 'three'
import fontJson from '~/static/font/helvetiker'

export default {
	name: 'rotating-text',
	props: {
		text: { type: String, default: 'Rotating text' },
	},
	data: () => ({
		t: 0,
	}),
	methods: {
		rotateText(container, i) {
			var containerW = container.offsetWidth
			var containerH = container.offsetHeight || 30

			var renderer = new THREE.WebGLRenderer({
				alpha: true,
				antialiasing: true,
			})

			renderer.setPixelRatio(window.devicePixelRatio)
			renderer.setSize(containerW, containerH)
			renderer.setClearColor(0x000000, 0)
			container.appendChild(renderer.domElement)

			var scene = new THREE.Scene()
			var camera = new THREE.PerspectiveCamera(
				0.5, //vertical field of view
				containerW / containerH, //aspect ratio
				0.01, //near plane
				100000 //far plane
			)

			scene.add(camera)
			camera.position.set(0, 0, 20000)

			// This is your 3D text:
			const font = new THREE.Font(fontJson)
			var geometry = new THREE.TextGeometry(this.$props.text, {
				//insert the text we grabbed earlier here
				font,
				size: 130, //your font size
				height: 50, //your font depth
			})

			var material = new THREE.MeshLambertMaterial({
				color: 0x000000, //your fon t color
			})

			var text = new THREE.Mesh(geometry, material) //this is your 3D text object
			//I created a pivot object to act as the center point for rotation:
			geometry.computeBoundingBox()

			var textWidth = geometry.boundingBox.max.x - geometry.boundingBox.min.x
			var textHeight = geometry.boundingBox.max.y - geometry.boundingBox.min.y
			text.position.set(-0.5 * textWidth, -textHeight * 0.5, 0)

			scene.add(text)

			var pivot = new THREE.Object3D()
			pivot.add(text)
			scene.add(pivot)
			//Then just render your scene and request for new frames

			pivot.rotation.x += 0.6

			const render = () => {
				pivot.rotation.x += (Math.sin(this.t) + 1) / 10 //how much you want your text to rotate per frame
				requestAnimationFrame(render)
				renderer.render(scene, camera)
				this.t += 0.1
			}

			render()
		},
	},
	mounted() {
		this.rotateText(this.$refs['rotating-text'])
	},
}
</script>