<template>
	<div class="desktop">
		<div class="desktop__shortcuts">
			<div class="desktop__shortcuts__item" v-for="(item, index) in shortcutList" :key="index">
				<shortcut :position-h="item.posH" :position-v="item.posV" :width-span="item.widthSpan" />
			</div>
		</div>

		<div class="desktop__windows">
			<window v-for="(item, index) in windowList" :title="item.title" :key="index" :position-x="item.x" :position-y="item.y" :position-z="item.z" :size-w="item.w" :size-h="item.h" :id="item.id"/>
		</div>
	</div>
</template>

<script>

import Shortcut from '~/components/Shortcut.vue'
import Window from '~/components/Window.vue'

export default {
	name:'desktop',
	components: {
		Shortcut,
		Window
	},
	data() {
		return {
			shortcutList: [
				{posH:1,posV:1,widthSpan:2}
				,{posH:3,posV:1,widthSpan:2}
				,{posH:1,posV:3,widthSpan:2}
			],
			windowList: [
				{id:'38972342n342894u234', title:'New collection 2020',x:300,y:20,w:733,h:300, z:50},
				{id:'80hj23489dsf670953b', title:'Test lorem',x:100,y:600,w:300,h:500, z:20}
			]
		}
	}
};

</script>