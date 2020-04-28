<template>
	<vue-draggable-resizable
		v-if="!isLocked && !isFoldable"
		class-name="window"
		class-name-active="is-active"
		@dragging="onDrag"
		@dragstop="onDragStop"
		@resizing="onResize"
		@resizestop="onResizeStop"
		:handles="['br']"
		:drag-handle="'.window__top'"
		:x="panelPositionX"
		:y="panelPositionY"
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
			<component :is="contentComponent" v-bind="{...contentProps}"/>
		</div>
	</vue-draggable-resizable>
</template>

<script>
import { Expo, TweenLite } from 'gsap';

import { vuex, mapActions, mapState } from 'vuex'
import { TOPMOST_WINDOW, CLOSE_WINDOW } from '~/store/constants'

import VueDraggableResizable from 'vue-draggable-resizable'

import Collection from '~/components/content/Collection.vue'

export default {
	name: 'window',
	components: {
		VueDraggableResizable,
		Collection
	},
	props: {
		contentComponent: {
			type: String,
			default: null
		},
		contentProps: {
			type: Object,
			default: null
		},
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
		contentId: {
			type: String
		},
		windowId: {
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
		},
		panelPositionX() {
			return this.x > -1 ? this.x : this.positionX;
		},
		panelPositionY() {
			return this.y > -1 ? this.y : this.positionY;
		}
	},
	data: function() {
		return {
			resetPositionDistance: 40,
			width: 0,
			height: 0,
			x: -1,
			y: -1,
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
		onResizeStop() {
			this.constrain();
		},
		onDrag(x, y) {
			this.x = x;
			this.y = y;
		},
		onDragStop() {
			this.constrain();
		},
		constrain() {
			this.x = Math.min(Math.max(this.x,0), window.innerWidth - this.resetPositionDistance);
			this.y = Math.min(Math.max(this.y,0), window.innerHeight - this.resetPositionDistance);
		},
		onMouseDown() {
			this[TOPMOST_WINDOW.action](this.windowId);
		}
	},
	mounted() {
		console.log('TOPMOST_WINDOW', TOPMOST_WINDOW)
		this.onResize(this.positionX, this.positionY, this.sizeW, this.sizeH)
		TweenLite.from(this.$el, 0.2, {scale: 0});
	}
};

</script>