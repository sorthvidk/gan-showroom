<template>
	<div class="desktop" :style="{backgroundImage: 'url(//placeimg.com/200/150/nature)'}">
		<div class="desktop__shortcuts">
			<shortcut 
				v-for="(item, index) in shortcutList" 
				:key="item.shortcutId" 
				:shortcut-id="item.shortcutId" 
				:content-id="item.contentId" 
				:position-h="item.posH" 
				:position-v="item.posV" 
				:width-span="item.widthSpan"/>
		</div>

		<div class="desktop__windows">
			<window 
				v-for="(item, index) in windowList" 
				:modifier-class="item.modifierClass"
				:window-id="item.windowId" 
				:content-id="item.contentId" 
				:group-id="item.groupId" 
				:title="item.title" 
				:key="item.windowId" 
				:position-x="item.x" 
				:position-y="item.y" 
				:position-z="item.z" 
				:size-w="item.w" 
				:size-h="item.h" 
				:content-component="item.component"  
				:content-props="item.props"/>
		</div>
	</div>
</template>

<script>
import { vuex, mapActions, mapState } from 'vuex'
import { TOPMOST_WINDOW, ESC_KEYPRESS } from '~/store/constants'

import Shortcut from '~/components/framework/Shortcut.vue'
import Window from '~/components/framework/Window.vue'

export default {
	name:'desktop',
	components: {
		Shortcut,
		Window
	},
	computed: {
		...mapState({
			windowList: state => state.windowList,
			shortcutList: state => state.shortcutList
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