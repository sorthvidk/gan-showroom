<template>
	<div class="desktop">
		<ul class="desktop__shortcuts">
			<li class="desktop__shortcuts__item" v-for="(item, index) in shortcutList" :key="index">
				<shortcut :position-h="item.posH" :position-v="item.posV" :width-span="item.widthSpan" />
			</li>
		</ul>

		<ul class="desktop__windows">
			<li class="desktop__windows__item" v-for="(item, index) in windowList" :key="index">
				<window :w="100" :h="100" :x="item.posX" :y="item.posY" :width="item.width" :height="item.height" :title="item.title"/>
			</li>
		</ul>
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
				{title:'New collection 2020',posX:30,posY:20,width:733,height:300},
				{title:'Test lorem',posX:10,posY:60,width:300,height:500}
			]
		}
	}
};

</script>