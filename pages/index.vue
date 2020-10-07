<template>
	<div oncontextmenu="return false;">
		<!-- TO PREVENT DOWNLOADS -->
		<login v-if="!loggedIn" />
		<desktop v-else />

		<v-idle :duration="15000" @idle="onidle" />
		<screensaver v-if="idle" />

		<cookie-banner v-if="!cookiesAccepted"></cookie-banner>
	</div>
</template>

<script>
import { vuex, mapActions, mapState } from 'vuex'

import Login from '~/components/framework/Login.vue'
import Desktop from '~/components/framework/Desktop.vue'
import Screensaver from '~/components/framework/Screensaver.vue'
import CookieBanner from '~/components/framework/CookieBanner.vue'

import getShortUrl from '~/utils/get-short-url'

import { INDEX_COLLECTION_DATA, INIT_PROGRESS, IDLE } from '~/model/constants'

export default {
	components: {
		Login,
		Desktop,
		Screensaver,
		CookieBanner
	},
	computed: {
		...mapState('user', ['loggedIn', 'cookiesAccepted', 'idle'])
	},
	head() {
		return {
			script: [
				{ src: 'https://identity.netlify.com/v1/netlify-identity-widget.js' }
			],
			link: [
				{
					rel: 'stylesheet',
					type: 'text/css',
					href:
						'https://fonts.googleapis.com/css?family=Roboto:400,500,600&amp;subset=latin,latin-ext'
				}
			],
			title: 'GANNI Space'
		}
	},
	methods: {
		...mapActions('user', [IDLE.action]),
		toggleScreenSaver(idle) {
			if (this.idle) {
				this[IDLE.action](idle)
			}
		},
		onidle() {
			this[IDLE.action](true)
		}
	},
	mounted() {
		if (window.GS_LOGS) console.warn('MOUNTED INDEX - PERFORM INITIALISATIONS')

		this.$store.commit('collection/' + INDEX_COLLECTION_DATA.mutation)
		this.$store.commit('progressBar/' + INIT_PROGRESS.mutation)

		//add clear timeout listeners
		document.body.addEventListener(
			'click',
			this.toggleScreenSaver.bind(this, false)
		)
		document.body.addEventListener(
			'mousemove',
			this.toggleScreenSaver.bind(this, false)
		)
	}
}
</script>
