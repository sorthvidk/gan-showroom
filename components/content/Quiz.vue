<template>
	<div class="quiz">
		<div class="quiz__content">
			<h1 class="quiz__title">
				Who is visiting the club?<br />Please choose to proceed
			</h1>
			<div v-if="!done" class="quiz__box">
				<p class="quiz__question">
					{{ questions[current].question }}
				</p>
				<div
					class="quiz__choises"
					:style="{ flexDirection: Math.random() <= 0.5 ? 'row-reverse' : '' }"
				>
					<button @click="next(0)">{{ questions[current].choices[0] }}</button>
					<p>or</p>
					<button @click="next(1)">{{ questions[current].choices[1] }}</button>
				</div>
			</div>
			<p v-if="done" class="quiz__description">
				{{ answers[score].description }}
			</p>
			<p v-if="done" class="quiz__answer">{{ answers[score].text }}</p>
			<p v-if="!done" class="quiz__count">
				{{ current + 1 }}/{{ questions.length }}
			</p>

			<!-- for debug: -->
			<p v-if="done" class="quiz__count">
				{{ points }}
			</p>
		</div>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { DASHBOARD_DARK } from '~/model/constants'
import { clamp } from '~/utils/clamp'

export default {
	name: 'quiz',
	data: () => ({
		current: 0,
		points: 0,
		done: false,
	}),
	computed: {
		...mapState('quiz', ['questions', 'answers']),
		score() {
			return clamp(0, this.points, this.answers.length - 1)
		},
	},
	methods: {
		...mapActions('utils', [DASHBOARD_DARK.action]),
		next(choice) {
			this.current++
			this.points += choice

			this.done = this.current === this.questions.length
		},
	},

	mounted() {
		this[DASHBOARD_DARK.action](true)
	},

	beforeDestroy() {
		this[DASHBOARD_DARK.action](false)
	},
}
</script>