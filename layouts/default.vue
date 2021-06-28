<template>
	<div
		:oncontextmenu="__prod__ ? `return false;` : ''"
		class="layout"
		:class="{ 'screensaver-running': idle, dark: dashboardDark }"
	>
		<login v-if="!loggedIn" />
		<div class="content" v-else>
			<nuxt v-if="rehydrated" />
			<bottombar />

			<!-- fixed elements -->
			<text-cursor />
			<assistant />
			<clipboard-message v-if="showClipboardMessage" />
			<copywrite-message v-if="!copyrightAccepted" />
			<!-- <v-idle v-show="false" :duration="15000" @idle="onidle" /> -->
			<screensaver v-if="idle" />
		</div>

		<music-player
			v-if="!isMobile"
			:showAudioVisualizer="!loggedIn && pageClicked < 1"
			@clicked="() => pageClicked++"
		/>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Bottombar from '~/components/framework/Bottombar.vue'
import Assistant from '~/components/framework/Assistant.vue'
import { INDEX_COLLECTION_DATA } from '~/model/constants'
import addMediaChangeListener from '~/utils/media-change'
import {
	// INDEX_COLLECTION_DATA,
	// INIT_PROGRESS,
	IDLE,
	IS_MOBILE,
	KEYPRESS,
	MOUSEMOVE,
	RESET_STATE,
	USER_HAS_INTERACTED,
	CURRENT_SCROLL,
	SCREEN_SIZE,
	HAS_DONE_QUIZ,
	LOGIN,
	HAS_AUTHENTICATED,
	REMOVE_FROM_WISHLIST,
	OPEN_STYLE_CONTENT,
	AUTHORIZE_GROUPS
} from '~/model/constants'
import MusicPlayer from '~/components/content/MusicPlayer.vue'
import TextCursor from '~/components/elements/TextCursor.vue'
import { nextIndex } from '~/utils/array-helpers'
import sendTracking from '~/utils/send-tracking'
import ClipboardMessage from '~/components/content/ClipboardMessage.vue'
import CopywriteMessage from '~/components/content/CopywriteMessage.vue'
import Screensaver from '~/components/framework/Screensaver.vue'
import Login from '~/components/framework/Login.vue'

export default {
	name: 'default',
	components: {
		Assistant,
		Bottombar,
		MusicPlayer,
		TextCursor,
		ClipboardMessage,
		CopywriteMessage,
		Screensaver,
		Login
	},
	head() {
		return {
			script: [
				{ src: 'https://identity.netlify.com/v1/netlify-identity-widget.js' }
			],
			title: 'GANNI Space'
		}
	},
	data: () => ({
		currentAudioIdx: 0,
		pageClicked: 0,
		showClipboardMessage: false
	}),
	computed: {
		...mapState(['rehydrated']),
		...mapState('user', ['loggedIn', 'copyrightAccepted', 'idle']),
		...mapState('utils', [
			'isMobile',
			'downloadPreparing',
			'clipBoardCopyComplete',
			'dashboardDark',
			'__prod__'
		])
	},
	methods: {
		...mapActions([RESET_STATE.action, OPEN_STYLE_CONTENT.action]),
		...mapState('ganniFm', ['songs']),
		...mapActions('user', [
			KEYPRESS.action,
			IDLE.action,
			MOUSEMOVE.action,
			USER_HAS_INTERACTED.action,
			CURRENT_SCROLL.action,
			SCREEN_SIZE.action,
			HAS_DONE_QUIZ.action,
			LOGIN.action,
			HAS_AUTHENTICATED.action
		]),
		...mapActions('utils', [IS_MOBILE.action]),
		...mapActions('collection', [
			REMOVE_FROM_WISHLIST.action,
			AUTHORIZE_GROUPS.action
		]),

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
		}
	},
	mounted() {
		window.$gtm = this.$gtm

		window.GS_LOGS = false // window.location.href.includes('localhost')

		this.$store.commit('collection/' + INDEX_COLLECTION_DATA.mutation)

		this.onMediaChange(window.innerWidth <= 768) // todo: ugly way of init
		addMediaChangeListener(
			this.onMediaChange.bind(null, true),
			this.onMediaChange.bind(null, false)
		)

		window.addEventListener('keyup', this[KEYPRESS.action])
		window.addEventListener('keydown', event => {
			console.log('RESET Listener')
			if (event.ctrlKey && event.altKey && event.code === 'KeyR') {
				console.log('RESET if statement')
				this[RESET_STATE.action](event)
			}
		})
		document.body.addEventListener('click', () => {
			this.nonidle()
		})
		document.body.addEventListener(
			'mousemove',
			() => {
				setTimeout(this[USER_HAS_INTERACTED.action], 2000)
			},
			{ once: true }
		)

		// document.body.addEventListener('mousemove', this.nonidle.bind(this))

		window.addEventListener('mousemove', event => {
			// debounce(() => {
			this.nonidle()
			this[MOUSEMOVE.action](event)
			// }, 200)
		})

		// TODO : add some throttle/debounce
		this[CURRENT_SCROLL.action](window.pageYOffset)
		window.addEventListener('scroll', () => {
			this[CURRENT_SCROLL.action](window.pageYOffset)
		})
		const setScreenSize = () => {
			this[SCREEN_SIZE.action]({
				width: window.innerWidth,
				height: window.innerHeight
			})
		}
		setScreenSize()
		window.addEventListener('resize', setScreenSize)

		if (
			navigator.userAgent.indexOf('Safari') != -1 &&
			navigator.userAgent.indexOf('Chrome') == -1
		) {
			document.body.classList.add('safari')
		}

		this[AUTHORIZE_GROUPS.action]()
	}
}
</script>
