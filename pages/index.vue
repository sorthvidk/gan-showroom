<template>
	<div>
		<login v-if="!loggedIn" />
		<desktop v-else />

		<cookie-banner v-if="!cookiesAccepted"></cookie-banner>
	</div>
</template>


<script>
import { vuex, mapActions, mapState } from 'vuex'

import Login from '~/components/framework/Login.vue'
import Desktop from '~/components/framework/Desktop.vue'
import CookieBanner from '~/components/framework/CookieBanner.vue'

import getShortUrl from '~/utils/get-short-url'

import { WALLPAPER_CHANGE } from '~/model/constants'

export default {
	components: {
		Login,
		Desktop,
		CookieBanner
	},
	computed: {
		...mapState(['loggedIn', 'cookiesAccepted'])
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
		...mapActions([WALLPAPER_CHANGE.action])
	},
	mounted() {
		this[WALLPAPER_CHANGE.action]()
	}
}
</script>