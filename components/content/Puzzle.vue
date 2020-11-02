<template>
	<div class="puzzle" style="height: 100%;">
		<canvas ref="puzzle" />
		<div class="border" />
		<p :style="{ position: 'absolute' }" v-if="solved">GOOD JOB!</p>
		<div v-if="solved">
			<div
				v-for="i in 150"
				:key="`confetti-${i}`"
				:class="`confetti-${i}`"
			></div>
		</div>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { puzzle } from './puzzle-game'
import { SAVE_PUZZLE, PUZZLE_INSTANCE } from '~/model/constants'

export default {
	name: 'puzzle',
	data: () => ({ puzzle: null, solved: false }),
	computed: {
		...mapState('puzzle', ['images', 'curIndex', 'puzzleState'])
	},
	watch: {
		curIndex() {
			this.puzzle.destroy()
			setTimeout(this.init, 100)
		}
	},
	methods: {
		...mapActions('puzzle', [SAVE_PUZZLE.action, PUZZLE_INSTANCE.action]),
		init() {
			this.$nextTick(async () => {
				if (this.puzzleState[this.curIndex]) {
					this.puzzle = await puzzle({
						element: this.$refs.puzzle,
						image: this.images[this.curIndex],
						restore: this.puzzleState[this.curIndex],
						onInit: this.onComplete,
						onComplete: this.onComplete,
						onChange: this[SAVE_PUZZLE.action]
					}).then(p => {
						this[PUZZLE_INSTANCE.action](p)
						return p
					})
				} else {
					this.puzzle = await puzzle({
						element: this.$refs.puzzle,
						image: this.images[this.curIndex],
						pieces: { x: 6, y: 8 },
						// pieces: { x: 2, y: 2 },
						attraction: 50,
						size: 0.75,
						onInit: this.onComplete,
						onComplete: this.onComplete,
						onChange: this[SAVE_PUZZLE.action]
					}).then(p => {
						this[PUZZLE_INSTANCE.action](p)
						return p
					})
				}
			})
		},
		onComplete({ puzzle }) {
			console.log(puzzle.done)
			this.solved = puzzle.done
		}
	},
	mounted() {
		// wait for winndow anim to be done
		setTimeout(this.init, 500)
	}
}
</script>