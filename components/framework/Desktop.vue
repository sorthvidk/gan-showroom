<template>
	<transition name="startup-transition" mode="out-in">
		<div
			class="desktop"
			:class="idle && 'screensaver-running'"
			:style="{
				backgroundSize: webcamImage && '400px',
				backgroundColor: desktopBackground.color,
				backgroundImage: `url(${desktopBackground.image})`
			}"
		>
			<div
				:class="{
					desktop__shortcuts: !textStyledWithoutIcon,
					dashboard__shortcuts: textStyledWithoutIcon
				}"
			>
				<shortcut
					v-for="(item, nthChild) in desktopIcons"
					:textLayout="textStyledWithoutIcon"
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

			<vue-draggable-resizable
				:style="{ position: 'absolute', top: 0, left: 0 }"
				v-for="(item, i) in badgeShortcuts"
				:key="`badge-${i}`"
				:x="1200 + i * 150"
				:y="500 + i * 100"
				:w="'auto'"
				:h="'auto'"
			>
				<shortcut :class="'shortcut__badge'" v-bind="item" />
			</vue-draggable-resizable>

			<div class="desktop__windows">
				<transition-group
					tag="div"
					name="window-animation"
					@before-enter="setTransformOrigin"
				>
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
						:window-info="item.customAssistantText"
						:title="item.title"
						:content-id="item.contentId"
						:data-index="index"
					/>
				</transition-group>

				<assistant />
				<!-- <support /> -->
			</div>

			<marquee v-show="!isMobile" />

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
				<transition
					@before-appear="copyrightBeforeAnimateIn"
					@appear="copyrightAnimateIn"
				>
					<div class="window window--no-status window--tight">
						<header class="window__top">
							<span class="title">Important Info</span>
						</header>
						<div class="window__content">
							<span class="icon">
								<svg
									viewBox="0 0 56 56"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
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
									Hi, we hope you will enjoy your Ganni Space Virtual Showroom
									experience.<br /><br />
									Please note that all visual material and images are for
									internal use only and not to be distributed outside this
									platform.
								</p>
							</span>
							<button class="button ok" @click="copyrightMessageClickHandler">
								OK
							</button>
						</div>
					</div>
				</transition>
			</div>
		</div>
	</transition>
</template>

<script>
import { vuex, mapActions, mapState, mapGetters } from 'vuex'

import {
	COPYRIGHT_ACCEPT,
	RESET_STATE,
	KEYPRESS,
	MOUSEMOVE,
	CLIPBOARD_COPY,
	DOWNLOAD_PREPARING,
	OPEN_CONTENT,
	AUTHORIZE_GROUPS,
	CONNECT_EXHIBITION_ASSETS
} from '~/model/constants'

import VueDraggableResizable from 'vue-draggable-resizable'

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
		Support,
		VueDraggableResizable
	},
	computed: {
		...mapState(['desktopBackground']),
		...mapState(['wallpaperIndex', 'windowList']),
		...mapState('collage', ['webcamImage']),
		...mapState('shortcuts', ['list', 'textStyledWithoutIcon']),
		...mapState('user', ['copyrightAccepted', 'mousepos', 'idle']),
		...mapState('utils', [
			'downloadPreparing',
			'clipBoardCopyComplete',
			'isMobile'
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

		backgroundImageObj() {
			return {
				src: `/img/wallpapers/wallpaper3.jpg`
			}
			// src: `/img/wallpapers/wallpaper${this.getRandomInt(1,this.wallpaperCount)}.jpg`
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
			showClipboardMessage: false,
			showDownloadMessage: false,
			wallpaperCount: 6
		}
	},
	methods: {
		...mapActions([RESET_STATE.action, OPEN_CONTENT.action]),
		...mapActions('exhibition', [CONNECT_EXHIBITION_ASSETS.action]),
		...mapActions('collection', [AUTHORIZE_GROUPS.action]),
		...mapActions('utils', [CLIPBOARD_COPY.action, DOWNLOAD_PREPARING.action]),
		...mapActions('user', [
			COPYRIGHT_ACCEPT.action,
			KEYPRESS.action,
			MOUSEMOVE.action
		]),
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
		// // openMusicPlayer() {
		// // 	this[OPEN_CONTENT.action]({
		// 		windowContent: [
		// 			{
		// 				title: 'GANNI FM',
		// 				contentId: 'ganni-fm',
		// 				type: ContentTypes.musicPlayer,
		// 				canOverride: true
		// 			}
		// 		]
		// 	})
		// },
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

		// if (!this.isMobile) {
		// 	this.openMusicPlayer()
		// }

		this[AUTHORIZE_GROUPS.action]()
		this[CONNECT_EXHIBITION_ASSETS.action]()

		// this.$store.commit('collection/isOnWishList')
	},

	created() {}
}
</script>
