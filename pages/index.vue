<template>
	<div :oncontextmenu="__prod__ ? `return false;` : ''">
		<audio-player
			v-if="loggedIn && track.src"
			:sources="[track.src]"
			:title="track.title"
		/>

		<div :style="{ overflow: 'hidden', height: '100vh', position: 'relative' }">
			<!-- step 1 -->
			<transition name="slide-out">
				<login v-if="!loggedIn" />
			</transition>

			<!-- step 2 -->
			<transition name="slide-in-out">
				<audio-gallery v-if="loggedIn && isIntro" />
			</transition>

			<!-- step 3 -->
			<transition name="slide-in">
				<desktop v-if="!isIntro" />
			</transition>
		</div>

		<v-idle v-show="false" :duration="15000" @idle="onidle" />
		<screensaver v-if="idle" />
		<mobile-disclamer v-if="isMobile" />
		<cookie-banner v-if="!cookiesAccepted"></cookie-banner>
	</div>
</template>

<script>
import { vuex, mapActions, mapState } from 'vuex'

import addMediaChangeListener from '~/utils/media-change'
import ViewportSizes from '~/model/viewport-sizes'

import Login from '~/components/framework/Login.vue'
import Desktop from '~/components/framework/Desktop.vue'
import Screensaver from '~/components/framework/Screensaver.vue'
import CookieBanner from '~/components/framework/CookieBanner.vue'
import MobileDisclamer from '~/components/content/MobileDisclamer.vue'
import AudioPlayer from '~/components/content/AudioPlayer.vue'
import AudioGallery from '~/components/content/AudioGallery.vue'

import getShortUrl from '~/utils/get-short-url'
import { debounce } from '~/utils/debounce'

import {
	INDEX_COLLECTION_DATA,
	INIT_PROGRESS,
	IDLE,
	IS_MOBILE,
	KEYPRESS,
	MOUSEMOVE,
	RESET_STATE,
} from '~/model/constants'

export default {
	components: {
		Login,
		Desktop,
		Screensaver,
		CookieBanner,
		MobileDisclamer,
		AudioPlayer,
		AudioGallery,
	},
	computed: {
		...mapState('user', ['loggedIn', 'cookiesAccepted', 'idle']),
		...mapState('utils', ['isMobile', '__prod__']),
		...mapState('ganniFm', ['songs']),
		...mapState('audio', [
			'track',
			'audioIsScrollable',
			'isIntro',
			'audioPlaying',
		]),
	},
	head() {
		return {
			script: [
				{ src: 'https://identity.netlify.com/v1/netlify-identity-widget.js' },
			],
			link: [
				{
					rel: 'stylesheet',
					type: 'text/css',
					href:
						'https://fonts.googleapis.com/css?family=Roboto:400,500,600&amp;subset=latin,latin-ext',
				},
			],
			title: 'GANNI Space',
		}
	},
	methods: {
		...mapActions([RESET_STATE.action]),
		...mapActions('user', [KEYPRESS.action, IDLE.action, MOUSEMOVE.action]),
		...mapActions('utils', [IS_MOBILE.action]),

		onidle() {
			this[IDLE.action](true)
		},
		nonidle() {
			if (this.idle) {
				this[IDLE.action](false)
			}
		},

		onMediaChange(isMobile) {
			this[IS_MOBILE.action](isMobile)
		},
	},
	mounted() {
		if (window.GS_LOGS) console.warn('MOUNTED INDEX - PERFORM INITIALISATIONS')

		this.$store.commit('collection/' + INDEX_COLLECTION_DATA.mutation)
		this.$store.commit('progressBar/' + INIT_PROGRESS.mutation)

		this.onMediaChange(window.innerWidth <= 1024) // todo: ugly way of init
		addMediaChangeListener(
			this.onMediaChange.bind(null, true),
			this.onMediaChange.bind(null, false)
		)

		window.addEventListener('keyup', this[KEYPRESS.action])
		window.addEventListener('keydown', (event) => {
			if (event.ctrlKey && event.altKey && event.code === 'KeyR') {
				this[RESET_STATE.action](event)
			}
		})
		document.body.addEventListener('click', this.nonidle.bind(this))
		document.body.addEventListener('mousemove', this.nonidle.bind(this))

		window.addEventListener('mousemove', (event) => {
			debounce(() => this[MOUSEMOVE.action](event), 200)
		})
	},
}
</script>
