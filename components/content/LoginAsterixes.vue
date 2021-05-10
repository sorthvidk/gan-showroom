<template>
	<canvas :class="{ shake }" ref="canvas"></canvas>
</template>

<script>
import Matter from 'matter-js'
import { mapState } from 'vuex'
import asterixTexture from '~/static/img/asterix.png'
import { loadImage } from '~/utils/loadImage'

export default {
	name: 'login-asterixes',
	props: {
		amount: { type: Number },
		start: { type: Boolean },
		shake: { type: Boolean },
	},
	data: () => ({
		Bodies: null,
		Composite: null,
		Runner: null,
		engine: null,
		render: null,
		runner: null,
		textureUrl: null,
		asterixs: [],
	}),
	computed: {
		...mapState('user', ['screenSize']),
	},
	watch: {
		amount() {
			/**
			 * POPULATE CANVAS
			 */
			this.asterixs.forEach((asterix) =>
				Matter.Composite.remove(this.engine.world, asterix)
			)
			;[...Array(this.amount)].forEach((_, idx) => {
				this.addAsterix(idx)
			})
		},
		start() {
			if (this.start) {
				this.Runner.run(this.runner, this.engine)
			}
		},
	},
	methods: {
		addAsterix(idx) {
			const middle = this.screenSize.width * 0.5
			const middleY = this.screenSize.height * 0.5
			const width = this.screenSize.width / 12

			const widthOfAllChars = (this.amount - 1) * width * 1.2
			const currentCharPosition = middle + idx * width * 1.2

			const asterix = this.Bodies.circle(
				currentCharPosition - widthOfAllChars / 2,
				middleY,
				width / 2,
				{
					force: { x: -Math.random() * 0.005, y: -Math.random() * 0.02 },
					isStatic: true,
					restitution: 0.8,
					render: {
						fillStyle: 'transparent',
						sprite: {
							texture: this.textureUrl,
							xScale: width / 187,
							yScale: width / 187,
						},
					},
				}
			)

			setTimeout(
				() => Matter.Body.setStatic(asterix, false),
				Math.random() * 350
			)

			this.Composite.add(this.engine.world, [asterix])
			this.asterixs.push(asterix)
		},
	},
	async mounted() {
		const Engine = Matter.Engine,
			Render = Matter.Render
		this.Runner = Matter.Runner
		this.Bodies = Matter.Bodies
		this.Composite = Matter.Composite

		this.$refs.canvas.width = this.screenSize.width
		this.$refs.canvas.height = this.screenSize.height

		// create an engine
		this.engine = Engine.create()

		const res = await loadImage(asterixTexture)
		this.textureUrl = res.src

		// create a renderer
		this.render = Render.create({
			canvas: this.$refs.canvas,
			engine: this.engine,
			options: {
				pixelRatio: 'auto',
				width: this.screenSize.width,
				height: this.screenSize.height,
				background: 'transparent',
				wireframes: false,
			},
		})

		const ground = this.Bodies.rectangle(
			this.screenSize.width / 2,
			this.screenSize.height + 31,
			this.screenSize.width,
			60,
			{
				isStatic: true,
			}
		)

		// add all of the bodies to the world
		this.Composite.add(this.engine.world, [ground])

		// run the renderer
		Render.run(this.render)

		// create runner
		this.runner = this.Runner.create()
	},
	beforeDestroy() {
		Matter.Render.stop(this.render) // this only stop renderer but not destroy canvas
		Matter.World.clear(this.engine.world)
		Matter.Engine.clear(this.engine)
	},
}
</script>