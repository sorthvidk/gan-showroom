<template>
	<div
		:style="{ position: 'relative' }"
		@mouseenter="setStart"
		@mousemove="rotate"
		@mouseleave="back"
		ref="rotating-text"
	></div>
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
		pivot: null,
		start: 0,
		hovering: false,

		renderer: null,
		scene: null,
		camera: null,
	}),
	watch: {
		spin() {
			if (this.spin) {
				this.render()
			}
		},
	},
	methods: {
		rotateText(container, i) {
			var containerW = container.offsetWidth
			var containerH = container.offsetHeight || 30

			this.renderer = new THREE.WebGLRenderer({
				alpha: true,
				antialias: true,
			})

			this.renderer.setPixelRatio(window.devicePixelRatio)
			this.renderer.setSize(containerW, containerH)
			this.renderer.setClearColor(0x000000, 0)
			container.appendChild(this.renderer.domElement)

			this.scene = new THREE.Scene()
			this.camera = new THREE.PerspectiveCamera(
				0.5,
				containerW / containerH,
				10,
				100000
			)

			const directionalLight = new THREE.DirectionalLight(0xdad7d4, 1)
			directionalLight.position.set(0, 100, 1).normalize()
			this.scene.add(directionalLight)

			this.scene.add(this.camera)
			this.camera.position.set(0, 0, 20000)

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

			this.scene.add(text)

			this.pivot = new THREE.Object3D()
			this.pivot.add(text)
			this.scene.add(this.pivot)

			this.$nextTick(() => this.renderer.render(this.scene, this.camera))
		},
		render() {
			if (this.spin) requestAnimationFrame(this.render)
			this.renderer.render(this.scene, this.camera)

			if (this.spin && !this.hovering) {
				const newVal = this.t * (Math.PI * 2)

				this.pivot.rotation[this.y ? 'y' : 'x'] = -newVal

				if (newVal >= Math.PI * 2) {
					this.spin = false
					this.t = 0
					// this.y = !this.y
					this.pivot.rotation.x = 0
					// this.pivot.rotation.y = 0
				}

				this.t += this.y ? 0.006 : 0.012
			}
		},
		revert() {
			if (this.pivot.rotation.y !== 0) requestAnimationFrame(this.revert)
			this.renderer.render(this.scene, this.camera)

			this.pivot.rotation.y -= this.pivot.rotation.y / 20

			if (this.pivot.rotation.y <= 0.0001 && this.pivot.rotation.y >= -0.0001)
				this.pivot.rotation.y = 0
		},
		setStart(e) {
			this.start = e.offsetX / e.target.offsetWidth
		},
		rotate(e) {
			this.hovering = true
			const val = e.offsetX / e.target.offsetWidth
			this.pivot.rotation.y = (val - this.start) * Math.PI
			this.renderer.render(this.scene, this.camera)
		},
		back(e) {
			this.hovering = false
			this.revert()
			this.renderer.render(this.scene, this.camera)
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