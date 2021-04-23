<template>
	<div @click="addAsterix"></div>
</template>

<script>
import Matter from 'matter-js'

export default {
	name: 'login-asterixes',
	props: {
		amount: {
			type: Number,
		},
		start: { type: Boolean },
	},
	data: () => ({
		Bodies: null,
		Composite: null,
		engine: null,
		render: null,
	}),
	methods: {
		addAsterix(idx) {
			const asterix = this.Bodies.circle(
				idx * 90,
				this.$el.offsetHeight / 2,
				40,
				{
					force: { x: 0, y: -Math.random() * 0.02 },
				}
			)

			this.Composite.add(this.engine.world, [asterix])
		},
	},
	mounted() {
		// module aliases
		const Engine = Matter.Engine,
			Render = Matter.Render,
			Runner = Matter.Runner
		this.Bodies = Matter.Bodies
		this.Composite = Matter.Composite

		// create an engine
		this.engine = Engine.create()

		// create a renderer
		this.render = Render.create({ element: this.$el, engine: this.engine })

		// create two boxes and a ground
		// const boxA = this.Bodies.rectangle(400, 200, 80, 80)
		// const boxB = this.Bodies.rectangle(450, 50, 80, 80)
		const ground = this.Bodies.rectangle(400, 610, 810, 60, { isStatic: true })

		// add all of the bodies to the world
		this.Composite.add(this.engine.world, [ground])

		// run the renderer
		Render.run(this.render)

		// create runner
		const runner = Runner.create()

		// run the engine
		if (this.start) {
			Runner.run(runner, this.engine)
		}

		/**
		 * POPULATE CANVAS
		 */
		;[...Array(this.amount)].forEach((_, idx) => {
			this.addAsterix(idx)
		})
	},
	beforeDestroy() {
		// Matter.Render.stop() // this only stop renderer but not destroy canvas
		// Matter.World.clear(this.engine.world)
		// Matter.Engine.clear(this.engine)
		// this.render.canvas.remove()
		// this.render.canvas = null
		// this.render.context = null
		// this.render.textures = {}
	},
}
</script>