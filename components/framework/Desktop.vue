<template>

	<div class="desktop" :style="{backgroundImage: 'url(//placeimg.com/200/150/nature)'}">

		<status-bar	
			:text-start="'Start diving into the PS21 digital universe.'" 
			:text-progress="'You still have more to experience! Dive deeper into the PS21 digital universe.'" 
			:text-end="'You\'re completely filled in on the PS21 digital universe!'"/>

		<div class="desktop__shortcuts">
			<shortcut 
				v-for="(item, index) in shortcutList" 
				:key="item.shortcutId" 
				:icon="item.icon" 
				:label="item.label" 
				:shortcut-id="item.shortcutId" 
				:content-ids="item.contentIds" 
				:position-h="item.posH" 
				:position-v="item.posV" 
				:width-span="item.widthSpan"/>
		</div>

		<div class="desktop__windows">
			<window 
				v-for="(item, index) in windowList" 
				:key="item.windowId" 
				v-bind="{...item.windowProps}"
				:position-z="item.positionZ"
				:window-id="item.windowId" 
				:content-id="item.contentId" 
				:group-id="item.groupId" 
				:title="item.title" 
				:content-component="item.component"  
				:content-props="item.componentProps"/>
		</div>

		<marquee :text="'Duis aute irure dolor in reprehenderit • Duis aute irure dolor in reprehenderit • Duis aute irure dolor in reprehenderit'" />

	</div>
</template>

<script>
import { vuex, mapActions, mapState } from 'vuex'
import { TOPMOST_WINDOW, ESC_KEYPRESS } from '~/model/constants'

import StatusBar from '~/components/framework/StatusBar.vue'
import Shortcut from '~/components/framework/Shortcut.vue'
import Window from '~/components/framework/Window.vue'

import Marquee from '~/components/content/Marquee.vue'

export default {
	name:'desktop',
	components: {
		StatusBar,
		Shortcut,
		Window,
		Marquee
	},
	computed: {
		...mapState({
			windowList: state => state.windowList,
			shortcutList: state => state.shortcuts.list
		})
	},
	methods: {
		...mapActions([
			TOPMOST_WINDOW.action, 
			ESC_KEYPRESS.action
		])
	},
	mounted() {		
		window.addEventListener('keyup', event=>{
			if(event.key === "Escape") {
				this[ESC_KEYPRESS.action]();
			}
		});
	}
};

</script>