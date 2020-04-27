<template>
	<div>
		
	<vue-draggable-resizable class="window" @dragging="onDrag" @resizing="onResize" :parent="true" :drag-handle="'.window__top'">
		<div class="window__top">
			<span class="title">{{title}}</span> <button @click="closeHandler">X</button>
		</div>
		<div class="window__content">
			<p>Hello! I'm a flexible component. You can drag me around and you can resize me.<br>
			X: {{ x }} / Y: {{ y }} - Width: {{ width }} / Height: {{ height }}</p>
		</div>
    </vue-draggable-resizable>
	</div>
</template>

<script>

import VueDraggableResizable from 'vue-draggable-resizable'

export default {
	name:'window',
	props: {
		title: {
			type: String
		}
	},
	data: function () {
		return {
			width: 0,
			height: 0,
			x: 0,
			y: 0
		}
	},
	methods: {
		closeHandler(e) {
			console.log("CLOSE WINDOW");
		},
		onResize: function (x, y, width, height) {
			this.x = x
			this.y = y
			this.width = width
			this.height = height
		},
		onDrag: function (x, y) {
			this.x = x
			this.y = y
		}
	}
};
</script>