<template>
	<div class="desktop" :style="{backgroundImage: 'url(/img/sitebg.jpg)'}">
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
		</div>
		<marquee
			:linkTo="'F5987334'"
			v-if="viewPortSize == 1"
			:text="`Duis aute irure dolor in reprehenderit • <a href='#'>Duis aute irure dolor</a> in reprehenderit • Duis aute irure dolor in reprehenderit`"
		/>
	</div>
</template>

<script>
import { vuex, mapActions, mapState } from 'vuex'

import { KEYPRESS } from '~/model/constants'

import addMediaChangeListener from '~/utils/media-change'
import ViewportSizes from '~/model/viewport-sizes'

import ProgressBar from '~/components/framework/ProgressBar.vue'
import Shortcut from '~/components/framework/Shortcut.vue'
import Window from '~/components/framework/Window.vue'
import Assistant from '~/components/framework/Assistant.vue'
import Support from '~/components/framework/Support.vue'
import Marquee from '~/components/content/Marquee.vue'

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
			windowList: state => state.windowList,
			shortcutList: state => state.shortcuts.list
		})
	},
	data() {
		return {
			viewPortSize: ViewportSizes.SMALL
		}
	},
	methods: {
		...mapActions([KEYPRESS.action]),
		isSmallViewport() {
			this.viewPortSize = ViewportSizes.SMALL
		},
		isLargeViewport() {
			this.viewPortSize = ViewportSizes.LARGE
		}
	},
	mounted() {
		window.addEventListener('keyup', event => {
			this[KEYPRESS.action](event)
		})

		let isMobile = addMediaChangeListener(
			this.isSmallViewport,
			this.isLargeViewport
		)
		if (!isMobile) this.viewPortSize = ViewportSizes.LARGE
	}
}
</script>