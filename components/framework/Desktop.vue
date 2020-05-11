<template>
	<div class="desktop" :style="{backgroundImage: 'url(//placeimg.com/400/300/nature)'}">
		<progress-bar
			:text-start="'Start diving into the PS21 digital universe.'"
			:text-progress="'You still have more to experience! Dive deeper into the PS21 digital universe.'"
			:text-end="'You\'re completely filled in on the PS21 digital universe!'"
		/>

		<div class="desktop__shortcuts">
			<shortcut
				v-for="(item, index) in shortcutList"
				:key="item.shortcutId"
				:position-h="item.posH"
				:position-v="item.posV"
				:icon="item.icon"
				:label="item.label"
				:shortcut-id="item.shortcutId"
				:action="item.action"
				:action-param="item.actionParam"
				:window-content="item.windowContent"
			/>
		</div>

		<div class="desktop__windows">
			<window
				v-for="(item, index) in windowList"
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
			<music-player v-if="musicPlayerOpen" />
		</div>

		<marquee
			:text="'Duis aute irure dolor in reprehenderit • Duis aute irure dolor in reprehenderit • Duis aute irure dolor in reprehenderit'"
		/>
	</div>
</template>

<script>
import { vuex, mapActions, mapState } from 'vuex'
import { 
	TOPMOST_WINDOW, 
	ESC_KEYPRESS,
	RIGHT_KEYPRESS,
	LEFT_KEYPRESS } from '~/model/constants'

import ProgressBar from '~/components/framework/ProgressBar.vue'
import Shortcut from '~/components/framework/Shortcut.vue'
import Window from '~/components/framework/Window.vue'
import Assistant from '~/components/framework/Assistant.vue'
import Support from '~/components/framework/Support.vue'
import MusicPlayer from '~/components/framework/MusicPlayer.vue'

import Marquee from '~/components/content/Marquee.vue'

export default {
	name: 'desktop',
	components: {
		ProgressBar,
		Shortcut,
		Window,
		Marquee,
		Assistant,
		Support,
		MusicPlayer
	},
	computed: {
		...mapState({
			windowList: state => state.windowList,
			shortcutList: state => state.shortcuts.list,
			musicPlayerOpen: state => state.musicPlayerOpen
		})
	},
	methods: {
		...mapActions([TOPMOST_WINDOW.action, ESC_KEYPRESS.action])
	},
	mounted() {
		window.addEventListener('keyup', event => {
			if (event.key === 'Escape') {
				this[ESC_KEYPRESS.action]()
			}
		})
	}
}
</script>