<template>
	<div :oncontextmenu="__prod__ ? `return false;` : ''">
		<preload-images :srcs="[various.dashboardBackground]" />

		<!-- <keep-alive> -->
		<!-- <div v-show=""> -->
		<audio-player
			v-if="audioGalleryDone"
			:sources="[song.src]"
			:title="song.title"
		/>
		<!-- </div> -->
		<!-- </keep-alive> -->

		<div :style="{ overflow: 'hidden', height: '100vh', position: 'relative' }">
			<!-- step 1 -->
			<transition name="slide-out">
				<login v-if="!loggedIn" />
			</transition>

			<!-- step 2 -->
			<transition name="slide-in-out">
				<audio-gallery-controller
					v-if="loggedIn && !audioGalleryDone"
					@played-through="audioGalleryDone = true"
				/>
			</transition>

			<!-- step 3 -->
			<transition name="slide-in">
				<desktop v-if="audioGalleryDone" />
			</transition>
		</div>

		<v-idle v-show="false" :duration="15000" @idle="onidle" />
		<screensaver v-if="idle" />
		<mobile-disclamer v-if="isMobile" />

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
		AudioGalleryController,
		PreloadImages,
	},
	data: () => ({
		audioGalleryDone: false,
	}),
	computed: {
		...mapState('user', ['loggedIn', 'cookiesAccepted', 'idle']),
		...mapState('utils', ['isMobile', '__prod__', 'various']),
		...mapState('ganniFm', ['songs']),
		song() {
			return { title: this.songs[0].title, src: this.songs[0].src }
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
