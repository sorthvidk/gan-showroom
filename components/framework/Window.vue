<template>
	<vue-draggable-resizable
		v-if="!isLocked && !isFoldable"
		class-name="window"
		class-name-active="is-active"
		@dragging="onDrag"
		@resizing="onResize"
		:handles="['br']"
		:drag-handle="'.window__top'"
		:x="positionX"
		:y="positionY"
		:w="sizeW"
		:h="sizeH"
		:z="positionZ"
		:style="zIndexStyle"
	>
		<div class="window__top">
			<span class="title">{{title}}</span>
			<button @click="closeHandler">X</button>
		</div>
		<div class="window__content" @click="onMouseDown">
			<p>X: {{ x }} / Y: {{ y }} - Width: {{ width }} / Height: {{ height }}</p>
			<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et vero voluptatum nulla, perferendis provident recusandae voluptatibus molestias nesciunt odio debitis numquam laudantium eum? Voluptatum atque in placeat ipsa praesentium obcaecati. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et vero voluptatum nulla, perferendis provident recusandae voluptatibus molestias nesciunt odio debitis numquam laudantium eum? Voluptatum atque in placeat ipsa praesentium obcaecati. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et vero voluptatum nulla, perferendis provident recusandae voluptatibus molestias nesciunt odio debitis numquam laudantium eum? Voluptatum atque in placeat ipsa praesentium obcaecati. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et vero voluptatum nulla, perferendis provident recusandae voluptatibus molestias nesciunt odio debitis numquam laudantium eum? Voluptatum atque in placeat ipsa praesentium obcaecati. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et vero voluptatum nulla, perferendis provident recusandae voluptatibus molestias nesciunt odio debitis numquam laudantium eum? Voluptatum atque in placeat ipsa praesentium obcaecati.</p>
		</div>
	</vue-draggable-resizable>
</template>

<script>
import { Expo, TweenLite } from 'gsap';

import { vuex, mapActions, mapState } from 'vuex'
import { TOPMOST_WINDOW, CLOSE_WINDOW } from '~/store/constants'

import VueDraggableResizable from 'vue-draggable-resizable'

export default {
	name: 'window',
	components: {
		VueDraggableResizable
	},
	props: {
		isLocked: {
			type: Boolean,
			default: false
		},
		isFoldable: {
			type: Boolean,
			default: false
		},
		canMaximize: {
			type: Boolean,
			default: false
		},
		title: {
			type: String
		},
		positionX: {
			type: Number
		},
		positionY: {
			type: Number
		},
		positionZ: {
			type: Number
		},
		sizeW: {
			type: Number
		},
		sizeH: {
			type: Number
		},
		id: {
			type: String
		}
	},
	watch: {
		topMostWindow(newVal) {
			console.log('match?', newVal == this.id)
			if (newVal == this.id) {
				console.log(this.id+" set to 1000")
				this.z = 1000
			} else {
				console.log(this.id+" set to "+this.positionZ)
				this.z = this.positionZ //default z
			}
		}
	},
	computed: {
		...mapState({
			topMostWindow: state => state[TOPMOST_WINDOW.stateKey]
		}),
		zIndexStyle() {
			return { zIndex: this.z };
		}
	},
	data: function() {
		return {
			width: 0,
			height: 0,
			x: 0,
			y: 0,
			z: 0,
			isClosing: false
		}
	},
	methods: {
		...mapActions([
			TOPMOST_WINDOW.action,
			CLOSE_WINDOW.action,
		]),
		closeHandler(e) {
			this.isClosing = true;
			TweenLite.to(this.$el, 0.2, {scale: 0, onComplete: function(){ this.closeWindow(); }.bind(this) });
		},
		closeWindow() {
			this[CLOSE_WINDOW.action](this.id)
		},
		onResize(x, y, width, height) {
			this.x = x
			this.y = y
			this.width = width
			this.height = height
		},
		onDrag(x, y) {
			this.x = x
			this.y = y
		},
		onMouseDown() {
			console.log('this.id', this.id)
			console.log('TOPMOST_WINDOW', TOPMOST_WINDOW)
			console.log('this[TOPMOST_WINDOW.action]', this[TOPMOST_WINDOW.action])

			this[TOPMOST_WINDOW.action](this.id)
		}
	},
	mounted() {
		console.log('TOPMOST_WINDOW', TOPMOST_WINDOW)
		this.onResize(this.positionX, this.positionY, this.sizeW, this.sizeH)
	}
}
</script>