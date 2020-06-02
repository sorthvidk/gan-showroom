<template>
	<div>
		<login v-if="!loggedIn" />
		<desktop v-else />

		<!-- JPL: Disabled for presentation -->
		<!-- <screensaver v-if="hidden" /> -->

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

import { WALLPAPER_CHANGE, VISIBILITY } from '~/model/constants'

export default {
	components: {
		Login,
		Desktop,
		Screensaver,
		CookieBanner
	},
	computed: {
		...mapState(['loggedIn', 'cookiesAccepted', 'hidden'])
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
			title: 'GANNI space - our digital showroom'
		}
	},
	methods: {
		...mapActions([WALLPAPER_CHANGE.action, VISIBILITY.action]),
		hideScreensaver(hidden) {
			this[VISIBILITY.action](hidden)
		}
	},
	mounted() {
		this[WALLPAPER_CHANGE.action]()

		this.$visibility.change((evt, hidden) => {
			if (hidden) {
				this.hideScreensaver(hidden)
			} else {
				document.body.addEventListener(
					'click',
					this.hideScreensaver.bind(this, hidden),
					{ once: true }
				)
				document.body.addEventListener(
					'mousemove',
					this.hideScreensaver.bind(this, hidden),
					{ once: true }
				)
			}
		})
	}
}
</script>