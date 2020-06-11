<template>
	<div oncontextmenu="return false;"> <!-- TO PREVENT DOWNLOADS -->
		<login v-if="!loggedIn" />
		<desktop v-else />

		<screensaver v-if="screensaverActive" />

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

import {
	CONNECT_ASSETS,
	FILTER_COLLECTION,
	INIT_PROGRESS,
	VISIBILITY
} from '~/model/constants'

export default {
	components: {
		Login,
		Desktop,
		Screensaver,
		CookieBanner
	},
	computed: {
		...mapState(['loggedIn', 'cookiesAccepted', 'screensaverActive'])
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
	data() {
		return {
			countdownTime: 150000,
			timeout: null
		}
	},
	methods: {
		...mapActions([VISIBILITY.action]),
		toggleScreenSaver(appTabUnfocused, immediate) {
			this.debounce(
				() => this[VISIBILITY.action](appTabUnfocused),
				immediate ? 0 : this.countdownTime
			)
		},
		/**
		 * debounce,
		 * run 'func' if debounce isn't called again within 'wait'-ms, or run immediately
		 */
		debounce(func, wait, immediate) {
			var later = () => {
				this.timeout = null
				func.apply(this)
			}

			clearTimeout(this.timeout)
			this.timeout = setTimeout(later, immediate ? 0 : wait)
		}
	},
	mounted() {
		if ( window.GS_LOGS ) console.warn("MOUNTED INDEX - PERFORM INITIALISATIONS")

		this.$store.commit(CONNECT_ASSETS.mutation)
		this.$store.commit('collection/' + FILTER_COLLECTION.mutation)
		this.$store.commit(INIT_PROGRESS.mutation)

		this.$visibility.change((evt, appTabUnfocused) => {
			if (appTabUnfocused) {
				this.toggleScreenSaver(appTabUnfocused)
			}
		})

		//add clear timeout listeners
		document.body.addEventListener(
			'click',
			this.toggleScreenSaver.bind(this, false, true)
		)
		document.body.addEventListener(
			'mousemove',
			this.toggleScreenSaver.bind(this, false, true)
		)
	}
}
</script>