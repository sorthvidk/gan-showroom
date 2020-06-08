<template>
	<div>
		<login v-if="!loggedIn" />
		<desktop v-else />
		
		<screensaver v-if="screenSaverVisible"/>

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
	WALLPAPER_CHANGE, 
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
		...mapState([
			'loggedIn', 
			'cookiesAccepted', 
			'appTabUnfocused'
		])
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
	data() {
		return {
			screenSaverTimeout: null,
			screenSaverVisible: false,
			countdownTime: 60000
		}
	},
	methods: {
		...mapActions([
			WALLPAPER_CHANGE.action, 
			VISIBILITY.action
		]),
		toggleScreenSaver(appTabUnfocused) {
			console.warn("TOGGLE SCREENSAVER | appTabUnfocused:"+appTabUnfocused)
			this[VISIBILITY.action](appTabUnfocused)

			if ( appTabUnfocused ) {
				this.startScreenSaverCountdown();
			}
			else {				
				this.screenSaverVisible = false; 
				clearTimeout(this.screenSaverTimeout)
			}
		},
		startScreenSaverCountdown() {
			console.warn("START SCREENSAVER COUNTDOWN")

			this.screenSaverVisible = false; 
			clearTimeout(this.screenSaverTimeout)
			this.screenSaverTimeout = setTimeout(()=> { 
				console.warn("SHOW SCREENSAVER")
				this.screenSaverVisible = true; 
			}, this.countdownTime)
		}
	},
	mounted() {
		this[WALLPAPER_CHANGE.action]()

		console.warn("MOUNTED INDEX - PERFORM INITIALISATIONS")

		this.$store.commit(CONNECT_ASSETS.mutation)
		this.$store.commit('collection/' + FILTER_COLLECTION.mutation)
		this.$store.commit(INIT_PROGRESS.mutation)
		


		this.$visibility.change((evt, appTabUnfocused) => {
			if (appTabUnfocused) {
				this.toggleScreenSaver(appTabUnfocused)
			}
		})

		//add clear timeout listeners
		document.body.addEventListener('click', this.startScreenSaverCountdown.bind(this))
		document.body.addEventListener('mousemove', this.startScreenSaverCountdown.bind(this))
	}
}
</script>