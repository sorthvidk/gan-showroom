<template>
	<transition name="startup-transition" mode="out-in">
		<!-- transition is placed in pages/index.vue -->
		<!-- <transition name="startup-transition" mode="out-in"> -->
		<div
			class="desktop"
			:class="hidden && 'screensaver-running'"
			v-lazy:background-image="backgroundImageObj"
		>
			<progress-bar
				:text-start="'Start diving into the PS21 digital universe.'"
				:text-progress="'You still have more to experience! Dive deeper into the PS21 digital universe.'"
				:text-end="'You\'re completely filled in on the PS21 digital universe!'"
			/>

			<div class="desktop__shortcuts">
				<shortcut
					v-for="(item, nthChild) in desktopIcons"
					:key="item.shortcutId"
					:type="item.type"
					:position-h="item.posH"
					:position-v="item.posV"
					:icon="item.icon"
					:label="item.label"
					:shortcut-id="item.shortcutId"
					:actions="item.actions"
					:window-content="item.windowContent"
					:href="item.href"
					:nth-child="nthChild"
				/>
			</div>

			<div class="desktop__windows">
				<window
					v-for="item in windowList"
					:key="item.windowId"
					v-bind="{...item.windowProps}"
					:position-z="item.positionZ"
					:window-id="item.windowId"
					:content-id="item.contentId"
					:content-type="item.contentType"
					:content-name="item.contentName"
					:group-id="item.groupId"
					:title="item.title"
					:content-component="item.contentComponent"
					:content-component-props="item.contentComponentProps"
					:status-component="item.statusComponent"
					:status-component-props="item.statusComponentProps"
				/>

				<assistant />
				<support />
			</div>
			<marquee v-if="viewPortSize == 1" />

			<div class="logo">
				<img :src="'/img/ganni_logo_low.png'" alt="Logo">
			</div>

			<div class="clipboard-message" v-if="showClipboardMessage">
				<p>Copied to clipboard</p>
			</div>

			<div class="download-message" v-if="showDownloadMessage">
				<div class="window window--no-status window--tight">
					<header class="window__top">
						<span class="title">Please wait</span>
					</header>
					<div class="window__content">
						<img src="/img/file-transfer.gif" alt />
						<p>Your download is being prepared...</p>
					</div>
				</div>
			</div>
		</div>
		<!-- </transition> -->
	</transition>
</template>

<script>
import { vuex, mapActions, mapState } from 'vuex'

import {
	RESET_STATE,
	KEYPRESS,
	MOUSEMOVE,
	CLIPBOARD_COPY,
	DOWNLOAD_PREPARING,
	OPEN_CONTENT
} from '~/model/constants'

import addMediaChangeListener from '~/utils/media-change'
import ViewportSizes from '~/model/viewport-sizes'
import ShortcutTypes from '~/model/shortcut-types'

import ProgressBar from '~/components/framework/ProgressBar.vue'
import Shortcut from '~/components/framework/Shortcut.vue'
import Window from '~/components/framework/Window.vue'
import Assistant from '~/components/framework/Assistant.vue'
import Support from '~/components/framework/Support.vue'
import Marquee from '~/components/content/Marquee.vue'

import ContentTypes from '~/model/content-types'

export default {
	name: 'desktop',
	components: {
		ProgressBar,
		Shortcut,
		Window,
		Marquee,
		Assistant,
		Support
	},
	computed: {
		...mapState({
			wallpaperIndex: state => state.wallpaperIndex,
			windowList: state => state.windowList,
			shortcutList: state => state.shortcuts.list,
			clipBoardCopyComplete: state => state.clipBoardCopyComplete,
			downloadPreparing: state => state.downloadPreparing,
			hidden: state => state.hidden
		}),
		desktopIcons() {
			return this.shortcutList.filter(
				s => s.type == ShortcutTypes.WINDOW || s.type == ShortcutTypes.URL
			)
		},
		marqueeLinks() {
			return this.shortcutList.filter(s => s.type == ShortcutTypes.MARQUEE)
		},
		backgroundImageObj() {
			return {
				src: `/img/wallpapers/wallpaper${this.wallpaperIndex}.jpg`
				// loading: '/img/login-slide.jpg'
			}
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
			viewPortSize: ViewportSizes.SMALL,
			showClipboardMessage: false,
			showDownloadMessage: false
		}
	},
	methods: {
		...mapActions([
			RESET_STATE.action,
			KEYPRESS.action,
			MOUSEMOVE.action,
			CLIPBOARD_COPY.action,
			DOWNLOAD_PREPARING.action,
			OPEN_CONTENT.action
		]),
		isSmallViewport() {
			this.viewPortSize = ViewportSizes.SMALL
		},
		isLargeViewport() {
			this.viewPortSize = ViewportSizes.LARGE
		},
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
		playSound() {
			const audio = new Audio('/audio/ganni_boot.mp3')
			audio.addEventListener('loadeddata', () => {
				audio.volume = 0.4
				audio.play()
			})
		},
		openMusicPlayer() {
			this[OPEN_CONTENT.action]({
				windowContent: [
					{
						title: 'GANNI FM',
						contentId: 'ganni-fm',
						type: ContentTypes.musicPlayer,
						canOverride: true
					}
				]
			})
		}
	},
	mounted() {
		window.addEventListener('keyup', event => {
			this[KEYPRESS.action](event)
		})
		window.addEventListener('keydown', event => {
			if (event.ctrlKey && event.altKey && event.code === 'KeyR') {
				this[RESET_STATE.action](event)
			}
		})

		window.addEventListener('mousemove', event => {
			this[MOUSEMOVE.action](event)
		})

		let isMobile = addMediaChangeListener(
			this.isSmallViewport,
			this.isLargeViewport
		)
		if (!isMobile) this.viewPortSize = ViewportSizes.LARGE

		if (!isMobile) {
			this.openMusicPlayer()
		}

		this.$store.commit('isOnWishList')
	},
	created() {}
}
</script>