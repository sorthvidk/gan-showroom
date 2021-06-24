<template>
	<transition name="startup-transition" mode="out-in">
		<div class="desktop">
			<transition name="fade--fast" mode="out-in">
				<window-static
					v-if="dashboardContent && dashboardContent.contentComponent"
					:content="dashboardContent"
					:key="dashboardContent.windowId"
				/>
				<div
					v-else
					class="desktop__background"
					:style="{
						backgroundImage: `url(${various.dashboardBackground[0]})`
					}"
				>
					<countdown
						v-for="club in activeClubs"
						:key="club.pretext"
						v-bind="club"
					/>
				</div>
			</transition>
		</div>
	</transition>
</template>

<script>
import { vuex, mapActions, mapState, mapGetters } from 'vuex'

import {
	CLIPBOARD_COPY,
	DOWNLOAD_PREPARING,
	OPEN_CONTENT,
	AUTHORIZE_GROUPS,
	CONNECT_EXHIBITION_ASSETS,
	// AUDIO_TRACK,
	OPEN_CONTENT_IN_DASHBOARD,
	ASSISTANT_TOGGLE,
	HAS_AUTHENTICATED
} from '~/model/constants'

import VueDraggableResizable from 'vue-draggable-resizable'

import ShortcutTypes from '~/model/shortcut-types'

import Bottombar from '~/components/framework/Bottombar.vue'

import ProgressBar from '~/components/framework/ProgressBar.vue'
import Shortcut from '~/components/framework/Shortcut.vue'
import WindowStatic from '~/components/framework/WindowStatic.vue'
import Assistant from '~/components/framework/Assistant.vue'
import Support from '~/components/framework/Support.vue'
import Marquee from '~/components/content/Marquee.vue'
import BackgroundImage from '~/components/content/BackgroundImage.vue'
import AudioPlayer from '~/components/content/AudioPlayer.vue'
import DownloadMessage from '~/components/content/DownloadMessage.vue'
import VueBar from '~/components/content/VueBar.vue'

import Countdown from '~/components/elements/Countdown.vue'

import TransitionExpand from '~/components/transitions/Expand.vue'

import ContentTypes from '~/model/content-types'

import { getRandomInt } from '~/utils/get-random-int'

export default {
	name: 'desktop',
	components: {
		ProgressBar,
		Shortcut,

		Marquee,
		Assistant,
		Support,
		VueDraggableResizable,
		BackgroundImage,
		WindowStatic,
		AudioPlayer,
		DownloadMessage,
		VueBar,

		Countdown,
		TransitionExpand,

		Bottombar
	},
	computed: {
		...mapState(['wallpaperIndex', 'windowList', 'dashboardContent']),
		...mapState('assets', ['desktop']),
		// ...mapState('collage', ['webcamImage']),
		...mapState('ganniFm', ['songs']),
		...mapState('shortcuts', ['list', 'textStyledWithoutIcon']),
		...mapState('user', ['copyrightAccepted', 'idle']),
		...mapState('utils', [
			'downloadPreparing',
			'clipBoardCopyComplete',
			'isMobile',
			'showMenu',
			'various'
		]),

		...mapGetters('shortcuts', ['authorizedShortcuts']),

		desktopIcons() {
			return this.authorizedShortcuts.filter(
				s => s.type == ShortcutTypes.WINDOW || s.type == ShortcutTypes.URL
			)
		},
		marqueeLinks() {
			return this.list.filter(s => s.type == ShortcutTypes.MARQUEE)
		},

		badgeShortcuts() {
			return this.list.filter(s => s.type == ShortcutTypes.BADGE)
		},

		backgroundImage() {
			// return {
			// 	src: `/img/wallpapers/wallpaper3.jpg`
			// }
			// src: `/img/wallpapers/wallpaper${getRandomInt(1,this.wallpaperCount)}.jpg`
			// loading: '/img/login-slide.jpg'
		}
	},
	watch: {
		clipBoardCopyComplete(newVal) {
			if (newVal) {
				this.showClipboardMessage = true
				this.startClipboardTimeout()
			} else {
				this.showClipboardMessage = false
			}
		},
		downloadPreparing(newVal) {
			if (newVal) {
				this.showDownloadMessage = true
				this.startDownloadTimeout()
			} else {
				this.showDownloadMessage = false
			}
		}
	},
	data() {
		return {
			showDownloadMessage: false,
			wallpaperCount: 6,
			backgrounds: [],

			activeClubs: [],
			active: 0,
			clubs: [
				{
					preText: 'Berghain opens in ',
					deadline: [2021, 9, 10],
					postText: ' in Berlin'
				},
				{
					preText: 'Søpavillonen',
					deadline: [2021, 10, 21],
					postText: ' in København'
				},
				{
					preText: 'Le Péripate opens in ',
					deadline: [2021, 9, 1],
					postText: ' in Paris'
				},
				{
					preText: 'Studio 54 opens in ',
					deadline: [2021, 10, 5],
					postText: ' in New York'
				},
				{
					preText: 'Grottan opens in ',
					deadline: [2021, 9, 31],
					postText: ' in Stockholm'
				},
				{
					preText: 'Fabric opens in ',
					deadline: [2021, 10, 23],
					postText: ' in London'
				},
				{
					preText: 'Plastic opens in ',
					deadline: [2021, 10, 31],
					postText: ' in Milano'
				}
			],
			menuClosed: !this.isMobile
		}
	},
	methods: {
		...mapActions([OPEN_CONTENT.action, OPEN_CONTENT_IN_DASHBOARD.action]),
		// ...mapActions('exhibition', [CONNECT_EXHIBITION_ASSETS.action]),
		...mapActions('utils', [CLIPBOARD_COPY.action, DOWNLOAD_PREPARING.action]),
		...mapActions('assistant', [ASSISTANT_TOGGLE.action]),
		...mapActions('user', [HAS_AUTHENTICATED.action]),

		// ...mapActions('audio', [AUDIO_TRACK.action]),

		startClipboardTimeout() {
			setTimeout(() => {
				this[CLIPBOARD_COPY.action](false)
			}, 3000)
		},
		startDownloadTimeout() {
			setTimeout(() => {
				this[DOWNLOAD_PREPARING.action](false)
			}, 3000)
		},
		activateClubs() {
			this.active++
			this.activeClubs = this.clubs.filter((_, idx) => idx < this.active)

			if (this.active <= this.clubs.length) {
				setTimeout(() => {
					this.activateClubs()
				}, 5000)
			}
		},
		toggleMenu() {
			this.menuClosed = !this.menuClosed
		},
		closeMenu() {
			this.menuClosed = true
		}
	},
	mounted() {
		// this[CONNECT_EXHIBITION_ASSETS.action]()
		this[ASSISTANT_TOGGLE.action](false)
		// this[AUDIO_TRACK.action](this.songs[1])
		// this[OPEN_CONTENT_IN_DASHBOARD.action]({
		// 	windowContent: this.list[0].windowContent,
		// })
		// this.$store.commit('collection/isOnWishList')
		this.activateClubs()
	},

	created() {}
}
</script>
