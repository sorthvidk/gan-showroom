<template>
	<div
		class="quiz"
		@click="emitIfDone"
		:style="{ cursor: emit ? 'pointer' : 'default' }"
	>
		<div class="quiz__content">
			<button
				v-if="withSkipLink"
				class="quiz__skip-link"
				@click="$emit('done')"
			>
				Skip
			</button>
			<h1 class="quiz__title">
				GANNI NIGHT OUT<br />
				WHO'S IN THE CLUB?<br />
				CHOOSE YOUR PARTY ANIMAL PERSONA TO PROCEED
			</h1>

			<transition name="fade--fast" mode="out-in">
				<div v-if="!done" class="quiz__box" :key="current">
					<p class="quiz__question">
						{{ questions[current].question }}
					</p>
					<div
						class="quiz__choises"
						:style="{
							flexDirection: Math.random() <= 0.5 ? 'row-reverse' : '',
						}"
					>
						<button @click="next(0)">
							{{ questions[current].choices[0] }}
						</button>
						<p>or</p>
						<button @click="next(1)">
							{{ questions[current].choices[1] }}
						</button>
					</div>
				</div>
				<p v-if="done" class="quiz__description">
					{{ answers[score].description }}
				</p>
			</transition>

			<transition name="fade--fast" mode="out-in">
				<p v-if="done" class="quiz__answer">{{ answers[score].text }}</p>
			</transition>

			<transition name="fade--fast" mode="out-in">
				<p v-if="!done" class="quiz__count">
					{{ current + 1 }}/{{ questions.length }}
				</p>
			</transition>
		</div>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { DASHBOARD_DARK, ASSISTANT_TOGGLE } from '~/model/constants'
import { clamp } from '~/utils/clamp'

export default {
	name: 'quiz',
	props: {
		withSkipLink: { type: Boolean },
	},
	data: () => ({
		current: 0,
		points: 0,
		done: false,
		emit: false,
	}),
	computed: {
		...mapState('quiz', ['questions', 'answers']),
		score() {
			return this.points <= 2 ? 0 : 1
		},
	},
	methods: {
		...mapActions('assistant', [ASSISTANT_TOGGLE.action]),
		...mapActions('utils', [DASHBOARD_DARK.action]),
		next(choice) {
			this.current++
			this.points += choice

			this.done = this.current === this.questions.length
		},
		emitIfDone() {
			if (!this.done) return

			if (this.emit) {
				this.$emit('done')
			}

			this.emit = true
		},
	},

	mounted() {
		this[DASHBOARD_DARK.action](true)
		this[ASSISTANT_TOGGLE.action](true)
	},

	// beforeDestroy() {
	// 	this[DASHBOARD_DARK.action](false)
	// },
}
</script>