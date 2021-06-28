<template>
	<div style="background-color: var(--color-secondary)">
		<preload-images :srcs="[various.dashboardBackground[0]]" />

		<desktop />

		<!-- <transition name="slide-up"> -->
		<cookie-banner v-if="!cookiesAccepted" :class="{ pushed: true }" />
		<!-- </transition> -->

		<!-- <auth-popup v-if="!hasAuthenticated" /> -->
	</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

import Desktop from '~/components/framework/Desktop.vue'
import PreloadImages from '~/components/content/PreloadImages.vue'
import { HAS_DONE_QUIZ } from '~/model/constants'

export default {
	components: {
		Desktop,
		PreloadImages
	},
	computed: {
		...mapState('user', [
			'cookiesAccepted',
			'idle',
			'hasDoneQuiz',
			'hasAuthenticated'
		]),
		...mapState('utils', ['various'])
	}
	// methods: {
	// 	onQuizDone() {
	// 		this[HAS_DONE_QUIZ.action](true)
	// 	}
	// }
	// mounted() {
	// 	if (window.GS_LOGS) console.warn('MOUNTED INDEX - PERFORM INITIALISATIONS')
	// }
}
</script>
