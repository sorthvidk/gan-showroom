<template>
	<div :oncontextmenu="__prod__ ? `return false;` : ''">
		<preload-images :srcs="[various.dashboardBackground[0]]" />

		<!-- v-if="audioGalleryDone" -->
		<audio-player
			:sources="[song.src]"
			:title="song.title"
			@played-through="nextSong"
		/>
		<!-- :autoplay="true" -->
		<!-- :key="songs[currentAudioIdx].src" -->

		<!-- step 1 -->
		<transition name="slide-out">
			<login v-if="!loggedIn" />
		</transition>

		<!-- step 2 -->
		<!-- <transition name="slide-in-out">
			<audio-gallery-controller
				v-show="!audioGalleryDone"
				v-if="loggedIn && !dashboardContent.contentId"
				:is-intro="true"
				@played-through="audioGalleryDone = true"
			/>
		</transition> -->

		<!-- step 3 -->
		<transition name="slide-in">
			<!-- <desktop v-if="audioGalleryDone" /> -->
			<desktop v-if="loggedIn" />
		</transition>

		<v-idle v-show="false" :duration="15000" @idle="onidle" />
		<screensaver v-if="idle" />
		<!-- <mobile-disclamer v-if="isMobile" /> -->

		<transition name="slide-up">
			<cookie-banner
				v-if="!cookiesAccepted"
				:class="{ pushed: audioGalleryDone }"
			/>
		</transition>
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
import AudioGalleryController from '~/components/content/AudioGalleryController.vue'
import PreloadImages from '~/components/content/PreloadImages.vue'

import getShortUrl from '~/utils/get-short-url'
import { debounce } from '~/utils/debounce'
// index
import {
	INDEX_COLLECTION_DATA,
	INIT_PROGRESS,
	IDLE,
	IS_MOBILE,
	KEYPRESS,
	MOUSEMOVE,
	RESET_STATE,
	USER_HAS_INTERACTED,
	CURRENT_SCROLL,
	SCREEN_SIZE,
} from '~/model/constants'
import { nextIndex } from '~/utils/array-helpers'

export default {
	components: {
		Login,
		Desktop,
		Screensaver,
		CookieBanner,
		MobileDisclamer,
		AudioPlayer,
		AudioGalleryController,
		PreloadImages,
	},
	data: () => ({
		audioGalleryDone: false,
		currentAudioIdx: 0,
	}),
	computed: {
		...mapState(['dashboardContent']),
		...mapState('user', ['loggedIn', 'cookiesAccepted', 'idle']),
		...mapState('utils', ['isMobile', '__prod__', 'various']),
		...mapState('ganniFm', ['songs']),
		song() {
			return {
				src: this.songs[this.currentAudioIdx].src,
				title: this.songs[this.currentAudioIdx].title,
			}
		},
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
		...mapActions('user', [
			KEYPRESS.action,
			IDLE.action,
			MOUSEMOVE.action,
			USER_HAS_INTERACTED.action,
			CURRENT_SCROLL.action,
			SCREEN_SIZE.action,
		]),
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

		nextSong() {
			this.currentAudioIdx = nextIndex(this.songs, this.currentAudioIdx)
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
		document.body.addEventListener('click', () => {
			this.nonidle()
		})
		document.body.addEventListener(
			'click',
			() => {
				setTimeout(this[USER_HAS_INTERACTED.action], 2000)
			},
			{ once: true }
		)

		// document.body.addEventListener('mousemove', this.nonidle.bind(this))

		window.addEventListener('mousemove', (event) => {
			debounce(() => {
				this.nonidle()
				this[MOUSEMOVE.action](event)
			}, 200)
		})

		// TODO : add some throttle/debounce
		this[CURRENT_SCROLL.action](window.pageYOffset)
		window.addEventListener('scroll', () => {
			this[CURRENT_SCROLL.action](window.pageYOffset)
		})
		const setScreenSize = () => {
			this[SCREEN_SIZE.action]({
				width: window.innerWidth,
				height: window.innerHeight,
			})
		}
		setScreenSize()
		window.addEventListener('resize', setScreenSize)

		this.audioPlayer = this.$children[1].$children[0].progress
	},
}
</script>
