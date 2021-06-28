<template>
	<transition name="startup-transition" mode="out-in">
		<div class="desktop">
			<transition name="fade--fast" mode="out-in">
				<div
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
	OPEN_CONTENT_IN_DASHBOARD,
	ASSISTANT_TOGGLE,
	HAS_AUTHENTICATED
} from '~/model/constants'

import ShortcutTypes from '~/model/shortcut-types'
import Shortcut from '~/components/framework/Shortcut.vue'
import BackgroundImage from '~/components/content/BackgroundImage.vue'
import DownloadMessage from '~/components/content/DownloadMessage.vue'
import Countdown from '~/components/elements/Countdown.vue'

export default {
	name: 'desktop',
	components: {
		Shortcut,
		BackgroundImage,
		DownloadMessage,
		Countdown
	},
	computed: {
		...mapState('utils', ['various'])
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
			]
		}
	},
	methods: {
		...mapActions([OPEN_CONTENT.action, OPEN_CONTENT_IN_DASHBOARD.action]),
		...mapActions('utils', [CLIPBOARD_COPY.action, DOWNLOAD_PREPARING.action]),
		...mapActions('assistant', [ASSISTANT_TOGGLE.action]),
		...mapActions('user', [HAS_AUTHENTICATED.action]),

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
		}
	},
	mounted() {
		this[ASSISTANT_TOGGLE.action](false)
		this.activateClubs()
	},

	created() {}
}
</script>
