<template>
	<div
		:oncontextmenu="__prod__ ? `return false;` : ''"
		style="min-height: 100vh; background-color: var(--color-secondary)"
	>
		<preload-images :srcs="[various.dashboardBackground[0]]" />

		<!-- step 1 -->
		<transition name="slide-out">
			<login v-if="!loggedIn" />
		</transition>

		<!-- step 2 -->
		<transition name="slide-in-out">
			<quiz
				v-if="!hasDoneQuiz && loggedIn && !dashboardContent.contentId"
				@done="onQuizDone"
				:with-skip-link="true"
			/>
		</transition>

		<!-- step 3 -->
		<transition name="slide-in">
			<desktop v-if="loggedIn && hasDoneQuiz" />
		</transition>
		<!-- <mobile-disclamer v-if="isMobile" /> -->

		<transition name="slide-up">
			<cookie-banner v-if="!cookiesAccepted" :class="{ pushed: hasDoneQuiz }" />
		</transition>

		<!-- <auth-popup v-if="!hasAuthenticated" /> -->
	</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

// import ViewportSizes from '~/model/viewport-sizes'

import Login from '~/components/framework/Login.vue'
import Desktop from '~/components/framework/Desktop.vue'
import CookieBanner from '~/components/framework/CookieBanner.vue'
import MobileDisclamer from '~/components/content/MobileDisclamer.vue'

import AudioGalleryController from '~/components/content/AudioGalleryController.vue'
import PreloadImages from '~/components/content/PreloadImages.vue'
import Quiz from '~/components/content/Quiz.vue'
import { HAS_DONE_QUIZ } from '~/model/constants'

export default {
	components: {
		Login,
		Desktop,

		CookieBanner,
		MobileDisclamer,

		AudioGalleryController,
		PreloadImages
	},
	computed: {
		...mapState(['dashboardContent']),
		...mapState('user', [
			'loggedIn',
			'cookiesAccepted',
			'idle',
			'hasDoneQuiz',
			'hasAuthenticated'
		]),
		...mapState('utils', ['isMobile', '__prod__', 'various']),
		...mapState('collection', ['wishList', 'allStyles'])
	},
	methods: {
		onQuizDone() {
			this[HAS_DONE_QUIZ.action](true)
		}
	},
	mounted() {
		if (window.GS_LOGS) console.warn('MOUNTED INDEX - PERFORM INITIALISATIONS')

		// this.$store.commit('collection/' + INDEX_COLLECTION_DATA.mutation)
		// this.$store.commit('progressBar/' + INIT_PROGRESS.mutation)

		if (this.audioPlayer) {
			this.audioPlayer = this.$children[1].$children[0].progress
		}
	}
}
</script>
