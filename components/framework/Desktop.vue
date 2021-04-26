<template>
	<transition name="startup-transition" mode="out-in">
		<div>
			<div
				:class="{
					desktop__shortcuts: !textStyledWithoutIcon,
					dashboard__shortcuts: textStyledWithoutIcon,
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

			<div
				class="desktop"
				:class="{ 'screensaver-running': idle, dark: dashboardDark }"
				:style="{
					backgroundSize: webcamImage && '400px',
				}"
			>
				<!-- <background-image /> -->

				<!-- <div class="desktop__static"> -->
				<!-- <vue-bar> -->
				<transition name="fade--fast" mode="out-in">
					<!-- ref="vuebar" -->
					<window-static
						v-if="dashboardContent && dashboardContent.contentComponent"
						:content="dashboardContent"
						:key="dashboardContent.windowId"
					/>
					<div
						v-else
						class="desktop__background"
						:style="{
							backgroundImage: `url(${various.dashboardBackground[0]})`,
						}"
					>
						<countdown
							v-for="club in activeClubs"
							:key="club.pretext"
							v-bind="club"
						/>
					</div>
				</transition>
				<!-- </vue-bar> -->
				<!-- </div> -->

				<media-library v-if="showMenu" />

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

				<!-- <marquee v-show="!isMobile" /> -->

				<clipboard-message v-if="showClipboardMessage" />
				<!-- <download-message v-if="showDownloadMessage" /> -->
				<copywrite-message v-if="!copyrightAccepted" />
			</div>
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
} from '~/model/constants'

import VueDraggableResizable from 'vue-draggable-resizable'

import ShortcutTypes from '~/model/shortcut-types'

import ProgressBar from '~/components/framework/ProgressBar.vue'
import Shortcut from '~/components/framework/Shortcut.vue'
import Window from '~/components/framework/Window.vue'
import WindowStatic from '~/components/framework/WindowStatic.vue'
import Assistant from '~/components/framework/Assistant.vue'
import Support from '~/components/framework/Support.vue'
import Marquee from '~/components/content/Marquee.vue'
import BackgroundImage from '~/components/content/BackgroundImage.vue'
import AudioPlayer from '~/components/content/AudioPlayer.vue'
import ClipboardMessage from '~/components/content/ClipboardMessage.vue'
import DownloadMessage from '~/components/content/DownloadMessage.vue'
import CopywriteMessage from '~/components/content/CopywriteMessage.vue'
import VueBar from '~/components/content/VueBar.vue'
import MediaLibrary from '~/components/content/MediaLibrary.vue'

import Countdown from '~/components/elements/Countdown.vue'

import ContentTypes from '~/model/content-types'

import { getRandomInt } from '~/utils/get-random-int'

export default {
	name: 'desktop',
	components: {
		ProgressBar,
		Shortcut,
		Window,
		Marquee,
		Assistant,
		Support,
		VueDraggableResizable,
		BackgroundImage,
		WindowStatic,
		AudioPlayer,
		ClipboardMessage,
		DownloadMessage,
		CopywriteMessage,
		VueBar,
		MediaLibrary,
		Countdown,
	},
	computed: {
		...mapState(['wallpaperIndex', 'windowList', 'dashboardContent']),
		...mapState('assets', ['desktop']),
		...mapState('collage', ['webcamImage']),
		...mapState('ganniFm', ['songs']),
		...mapState('shortcuts', ['list', 'textStyledWithoutIcon']),
		...mapState('user', ['copyrightAccepted', 'mousepos', 'idle']),
		...mapState('utils', [
			'downloadPreparing',
			'clipBoardCopyComplete',
			'isMobile',
			'showMenu',
			'dashboardDark',
			'various',
		]),

		...mapGetters('shortcuts', ['authorizedShortcuts']),

		desktopIcons() {
			return this.authorizedShortcuts.filter(
				(s) => s.type == ShortcutTypes.WINDOW || s.type == ShortcutTypes.URL
			)
		},
		marqueeLinks() {
			return this.list.filter((s) => s.type == ShortcutTypes.MARQUEE)
		},

		badgeShortcuts() {
			return this.list.filter((s) => s.type == ShortcutTypes.BADGE)
		},

		backgroundImage() {
			// return {
			// 	src: `/img/wallpapers/wallpaper3.jpg`
			// }
			// src: `/img/wallpapers/wallpaper${getRandomInt(1,this.wallpaperCount)}.jpg`
			// loading: '/img/login-slide.jpg'
		},
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
		},
	},
	data() {
		return {
			showClipboardMessage: false,
			showDownloadMessage: false,
			wallpaperCount: 6,
			backgrounds: [],

			activeClubs: [],
			active: 0,
			clubs: [
				{
					preText: 'trädgården opens in ',
					deadline: [2021, 6, 21, 19, 0, 0],
					postText: ' in stockholm',
				},
				{
					preText: 'gewölbe opens in ',
					deadline: [2021, 3, 31, 21, 0, 0],
					postText: ' in cologne',
				},
			],
		}
	},
	methods: {
		...mapActions([OPEN_CONTENT.action, OPEN_CONTENT_IN_DASHBOARD.action]),
		...mapActions('exhibition', [CONNECT_EXHIBITION_ASSETS.action]),
		...mapActions('collection', [AUTHORIZE_GROUPS.action]),
		...mapActions('utils', [CLIPBOARD_COPY.action, DOWNLOAD_PREPARING.action]),
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

		setTransformOrigin(el) {
			el.style.transformOrigin = `${this.mousepos.x}px ${this.mousepos.y}px`
			el.style.transitionDelay = `${el.dataset.index * 0.05 - 0.05}s`
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
	},
	mounted() {
		this[AUTHORIZE_GROUPS.action]()
		this[CONNECT_EXHIBITION_ASSETS.action]()
		// this[AUDIO_TRACK.action](this.songs[1])
		// this[OPEN_CONTENT_IN_DASHBOARD.action]({
		// 	windowContent: this.list[0].windowContent,
		// })
		// this.$store.commit('collection/isOnWishList')
		this.activateClubs()
	},

	created() {},
}
</script>
