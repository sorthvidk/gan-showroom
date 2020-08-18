<template>
	<transition name="startup-transition" mode="out-in">
		<div
			class="desktop"
			:class="screensaverActive && 'screensaver-running'"
			v-lazy:background-image="webcamImage || backgroundImageObj"
			:style="{backgroundSize: webcamImage && '400px'}"
		>
			<progress-bar
				:text-start="'Start diving into the PS21 digital universe.'"
				:text-progress="'You still have more to experience! Dive deeper into the PS21 digital universe.'"
				:text-end="'You\'re completely filled in on the PS21 digital universe!'"
			/>

			<div class="desktop__shortcuts" :class="blownUpIconLayout ? 'desktop__shortcuts--draggable' : ''">
				<shortcut
					v-for="item in authenticatedShortcuts"
					v-if="!blownUpIconLayout && (item.shortcutId !== 'archive') || archiveHasAuthenticatedCollections"
					:key="item.shortcutId"
					:item="item"
				/>
				
				<vue-draggable-resizable
					v-for="item in authenticatedShortcuts"
					v-if="(item.shortcutId !== 'archive') || archiveHasAuthenticatedCollections"
					:key="item.shortcutId"
				>
					<shortcut :item="item" />
				</vue-draggable-resizable>
					<!-- :type="item.type"
					:position-h="item.posH"
					:position-v="item.posV"
					:icon="item.icon"
					:label="item.label"
					:shortcut-id="item.shortcutId"
					:actions="item.actions"
					:window-content="item.windowContent"
					:href="item.href" -->
			</div>

			<div class="desktop__windows">
				<transition-group tag="div" name="window-animation" @before-enter="setTransformOrigin">
					<window
						v-for="(item, index) in windowList"
						:key="item.windowId"
						v-bind="item.windowProps"
						:position-z="item.positionZ"
						:window-id="item.windowId"
						:content-type="item.contentType"
						:content-name="item.contentName"
						:content-component="item.contentComponent"
						:status-component="item.statusComponent"
						:content-component-props="item.contentComponentProps"
						:group-id="item.groupId"
						:status-component-props="item.statusComponentProps"
						:title="item.title"
						:content-id="item.contentId"
						:data-index="index"
					/>
				</transition-group>

				<assistant />
				<support />
			</div>
			<marquee v-if="viewPortSize.name == 'LARGE'" />

			<div class="logo">
				<img :src="'/img/ganni_logo_low.png'" alt="Logo" class="d-none d-block--xs" />
				<svg class="d-none--xs" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 553.9 144.9">
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
						<img src="/img/ganni_popcorn_animation.gif" alt />
						<p>Your download is being prepared...</p>
					</div>
				</div>
			</div>

			<div class="copyright-message" v-if="!copyrightAccepted">
				<transition @before-appear="copyrightBeforeAnimateIn" @appear="copyrightAnimateIn">
					<div class="window window--no-status window--tight">
						<header class="window__top">
							<span class="title">Important Info</span>
						</header>
						<div class="window__content">
							<span class="icon">
								<svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path
										d="M27.958 55.916c15.441 0 27.959-12.517 27.959-27.958C55.916 12.518 43.398 0 27.957 0 12.518 0 0 12.517 0 27.958 0 43.4 12.517 55.917 27.958 55.917z"
										fill="#FF0"
									/>
									<path
										d="M27.958 46.319c-10.182 0-18.444-8.262-18.444-18.444 0-.25.167-.418.417-.418.25 0 .417.168.417.418 0 9.68 7.929 17.61 17.61 17.61 9.68 0 17.61-7.93 17.61-17.694 0-.25.166-.417.417-.417.25 0 .417.167.417.417 0 10.182-8.262 18.528-18.444 18.528z"
										fill="#000"
									/>
									<path
										d="M21.115 27.625c1.336 0 2.42-2.616 2.42-5.843 0-3.226-1.084-5.842-2.42-5.842-1.337 0-2.42 2.616-2.42 5.842 0 3.227 1.083 5.843 2.42 5.843zM33.633 27.625c1.337 0 2.42-2.616 2.42-5.843 0-3.226-1.083-5.842-2.42-5.842s-2.42 2.616-2.42 5.842c0 3.227 1.084 5.843 2.42 5.843z"
										fill="#000"
									/>
								</svg>

								<p>
									Hi, we hope you will enjoy your Ganni Space Virtual Showroom experience.
									<br />
									<br />Please note that all visual material and images are for internal use only and not to be distributed outside this platform.
								</p>
							</span>
							<button class="button ok" @click="copyrightMessageClickHandler">OK</button>
						</div>
					</div>
				</transition>
			</div>

			<color-picker />
		</div>
	</transition>
</template>

<script>
import { vuex, mapActions, mapState } from 'vuex'

import {
	COPYRIGHT_ACCEPT,
	RESET_STATE,
	KEYPRESS,
	MOUSEMOVE,
	CLIPBOARD_COPY,
	DOWNLOAD_PREPARING,
	OPEN_CONTENT
} from '~/model/constants'

import VueDraggableResizable from 'vue-draggable-resizable'

import addMediaChangeListener from '~/utils/media-change'

import ViewportSizes from '~/model/viewport-sizes'
import ShortcutTypes from '~/model/shortcut-types'

import ProgressBar from '~/components/framework/ProgressBar.vue'
import Shortcut from '~/components/framework/Shortcut.vue'
import Window from '~/components/framework/Window.vue'
import Assistant from '~/components/framework/Assistant.vue'
import Support from '~/components/framework/Support.vue'
import Marquee from '~/components/content/Marquee.vue'
import ColorPicker from '~/components/content/ColorPicker.vue'

import ContentTypes from '~/model/content-types'

export default {
	name: 'desktop',
	components: {
		ProgressBar,
		Shortcut,
		Window,
		Marquee,
		Assistant,
		Support,
		ColorPicker,
		VueDraggableResizable,
	},
	data() {
		return {
			viewPortSize: ViewportSizes.SMALL,
			showClipboardMessage: false,
			showDownloadMessage: false,
			wallpaperCount: 6,
			showColorPicker: false,
			colorPickerStyleItem: null
		}
	},
	computed: {
		...mapState([
			'wallpaperIndex',
			'windowList',
			'clipBoardCopyComplete',
			'downloadPreparing',
			'copyrightAccepted',
			'screensaverActive',
			'webcamImage',
			'mousepos',
			'loggedIn',
			'archiveHasAuthenticatedCollections'
		]),
		...mapState('collection', ['collections']),
		...mapState('shortcuts', ['list', 'blownUpIconLayout']),
		desktopIcons() {
			return this.list.filter(
				s => s.type == ShortcutTypes.WINDOW || s.type == ShortcutTypes.URL
			)
		},
		marqueeLinks() {
			return this.list.filter(s => s.type == ShortcutTypes.MARQUEE)
		},
		backgroundImageObj() {
			return {
				src: `/img/wallpapers/wallpaper3.jpg`
			}
			// src: `/img/wallpapers/wallpaper${this.getRandomInt(1,this.wallpaperCount)}.jpg`
			// loading: '/img/login-slide.jpg'
		},
		authenticatedShortcuts() {
			return this.desktopIcons.filter(shortcut => {
				/**
				 * if the shortcut isn't a collection icon, just return true,
				 * b/c they are never password protected
				 */
				if (
					!shortcut.windowContent ||
					!shortcut.windowContent[0].contentComponentProps ||
					!shortcut.windowContent[0].contentComponentProps.collectionId
				) {
					return true
				}

				const shortcutCollection =
					shortcut.windowContent[0].contentComponentProps.collectionId
				const collection = this.collections.find(
					c => c.collectionId === shortcutCollection
				)

				return (
					!collection.passwords || // open for all
					!collection.passwords.length || // open for all
					collection.passwords.includes(this.loggedIn.hash) // collection open for used password
				)
			})
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
	methods: {
		...mapActions([
			RESET_STATE.action,
			KEYPRESS.action,
			MOUSEMOVE.action,
			CLIPBOARD_COPY.action,
			DOWNLOAD_PREPARING.action,
			OPEN_CONTENT.action,
			COPYRIGHT_ACCEPT.action
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
		openMusicPlayer() {
			this[OPEN_CONTENT.action]({
				windowContent: [
					{
						title: 'GANNI FM',
						contentId: 'ganni-fm',
						type: ContentTypes.musicPlayer
					}
				]
			})
		},
		setTransformOrigin(el) {
			el.style.transformOrigin = `${this.mousepos.x}px ${this.mousepos.y}px`
			el.style.transitionDelay = `${el.dataset.index * 0.05 - 0.05}s`
		},
		getRandomInt(min, max) {
			min = Math.ceil(min)
			max = Math.floor(max)
			return Math.floor(Math.random() * (max - min + 1)) + min
		},
		copyrightMessageClickHandler() {
			this[COPYRIGHT_ACCEPT.action](true)
		},
		copyrightBeforeAnimateIn(el) {
			TweenLite.set(el, { scale: 0, opacity: 0 })
		},
		copyrightAnimateIn(el) {
			TweenLite.to(el, 0.3, {
				delay: 2,
				scale: 1,
				opacity: 1,
				ease: 'power4.inOut'
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

		let timeout = null
		window.addEventListener('mousemove', event => {
			const debounce = (func, wait, immediate) => {
				var later = () => {
					timeout = null
					func.apply(this)
				}

				clearTimeout(timeout)
				timeout = setTimeout(later, immediate ? 0 : wait)
			}

			debounce(() => this[MOUSEMOVE.action](event), 200)
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

		window.GS_LOGS = false
	},

	created() {}
}
</script>