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
					:action="item.action"
					:action-param="item.actionParam"
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
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 553.9 144.9">
					<path
						d="M126.1 69.2H69.9V87h34.8c-.1 5.2-1 10.4-2.6 15.3-1.5 4.4-4 8.4-7.2 11.7-3.3 3.3-7.3 5.8-11.7 7.4-5.1 1.8-10.5 2.6-15.9 2.3-7.1 0-13.3-1.4-18.5-4.3-5.1-2.8-9.4-6.7-12.7-11.5-3.3-5-5.8-10.6-7.2-16.4-3.1-12.3-3.1-25.2 0-37.5 1.4-5.8 3.9-11.4 7.2-16.4 3.2-4.8 7.6-8.8 12.7-11.6 5.2-2.9 11.3-4.3 18.5-4.3 4.1 0 8.2.6 12.2 1.7 3.8 1.1 7.3 2.8 10.5 5.1 6.5 4.7 10.8 11.9 11.8 19.9h22.9c-.7-7-2.9-13.8-6.4-19.9-3.2-5.6-7.6-10.5-12.8-14.3-5.3-3.9-11.2-6.8-17.5-8.6-6.7-2-13.7-2.9-20.7-2.9-10 0-19 1.9-26.9 5.6-7.7 3.6-14.6 8.7-20.2 15.2-5.6 6.6-9.9 14.1-12.6 22.3-3 8.7-4.5 17.8-4.4 27C3 82.1 4.5 91.2 7.5 100c2.7 8.2 7 15.8 12.6 22.3 5.6 6.4 12.5 11.6 20.2 15.1 7.9 3.7 16.9 5.5 26.9 5.5 8.1 0 15.3-1.4 21.6-4.1s12.5-7.7 18.7-14.8l2.4 15.8h16.2V69.2zm137 70.6L211.5 5.9h-24.9l-51.4 133.9h24.2l12.6-35.4h53.4l12.6 35.4h25.1zm-43.9-53.3h-40.9l20.3-57.6h.6l20 57.6zm53.4 53.3h22.3V41.3h.6l60.9 98.5h24.8V5.9h-22.3v98.6h-.4L297.3 5.9h-24.8v133.9h.1zm127.7 0h22.3V41.3h.6l61 98.5H509V5.9h-22.3v98.6h-.4L425 5.9h-24.8v133.9h.1zm127.7 0h23.4V5.9H528v133.9z"
					/>
				</svg>
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
						title: 'Ganni FM',
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

		// JPL only on login
		// this.playSound()

		if (!isMobile) {
			this.openMusicPlayer()
		}
	},
	created() {}
}
</script>