<template>
	<div class="puzzle" style="height: 100%;">
		<canvas ref="puzzle" />
		<div class="border" />
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { puzzle } from './puzzle-game'
import { SAVE_PUZZLE, PUZZLE_INSTANCE } from '~/model/constants'

export default {
	name: 'puzzle',
	data: () => ({ puzzle: null }),
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
						attraction: 50,
						size: 0.75,
						onComplete: this.onComplete,
						onChange: this[SAVE_PUZZLE.action]
					}).then(p => {
						this[PUZZLE_INSTANCE.action](p)
						return p
					})
				}
			})
		},
		onComplete() {
			console.log('you won')
		}
	},
	mounted() {
		// wait for winndow anim to be done
		setTimeout(this.init, 500)
	}
}
</script>