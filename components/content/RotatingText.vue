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
		y: false,
		spin: false,
	}),
	methods: {
		rotateText(container, i) {
			var containerW = container.offsetWidth
			var containerH = container.offsetHeight || 30

			var renderer = new THREE.WebGLRenderer({
				alpha: true,
				antialias: true,
			})

			renderer.setPixelRatio(window.devicePixelRatio)
			renderer.setSize(containerW, containerH)
			renderer.setClearColor(0x000000, 0)
			container.appendChild(renderer.domElement)

			var scene = new THREE.Scene()
			var camera = new THREE.PerspectiveCamera(
				0.5,
				containerW / containerH,
				10,
				100000
			)

			const directionalLight = new THREE.DirectionalLight(0x666666, 1)
			directionalLight.position.set(0, 100, 1).normalize()
			scene.add(directionalLight)

			scene.add(camera)
			camera.position.set(0, 0, 20000)

			// This is your 3D text:
			const font = new THREE.Font(fontJson)
			const thickness = 80
			var geometry = new THREE.TextGeometry(this.$props.text, {
				font,
				size: 130,
				height: thickness,
			})

			var material = new THREE.MeshLambertMaterial({
				shininess: 66,
				transparent: true,
			})
			var text = new THREE.Mesh(geometry, material)

			geometry.computeBoundingBox()

			var textWidth = geometry.boundingBox.max.x - geometry.boundingBox.min.x
			var textHeight = geometry.boundingBox.max.y - geometry.boundingBox.min.y
			text.position.set(-0.5 * textWidth, -textHeight * 0.5, -thickness / 2)

			scene.add(text)

			var pivot = new THREE.Object3D()
			pivot.add(text)
			scene.add(pivot)

			renderer.render(scene, camera)

			const render = () => {
				requestAnimationFrame(render)
				renderer.render(scene, camera)

				if (this.spin) {
					const newVal = this.t * (Math.PI * 2)

					pivot.rotation[this.y ? 'y' : 'x'] = -newVal

					if (newVal >= Math.PI * 2) {
						this.spin = false
						this.t = 0
						this.y = !this.y
						pivot.rotation.x = 0
						pivot.rotation.y = 0
					}

					this.t += this.y ? 0.006 : 0.012
				}
			}

			render()
		},
	},
	mounted() {
		this.rotateText(this.$refs['rotating-text'])

		setInterval(() => {
			this.spin = true
		}, 10000)
	},
}
</script>