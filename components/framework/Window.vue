<template>
	<transition @before-appear="beforeAnimateIn" @appear="animateIn" @leave="animateOut">
		<span @click="onMouseDown"> <!-- can't attach listener to vue-draggable -->				
			<vue-draggable-resizable
				v-if="!isLocked && !isFoldable"
				:class-name="concatClassName"
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
				:style="{zIndex: zIndexStyle, transformOrigin: transformOriginStyle}">
				<div class="window__top">
					<span class="title">{{title}}</span>
					<button class="close" @click="closeHandler">X</button>
				</div>
				<div class="window__status">
					<p>TIP: Try to touch your own nose!</p>
				</div>
				<div class="window__content">				
					<!-- <p>X: {{ panelPositionX }} / Y: {{ panelPositionY }} / Z: {{ panelPositionZ }} | W: {{ w }} / H: {{ h }}</p>
					<p>windowId: {{windowId}} | contentId: {{contentId}}</p> -->
					<component :is="contentComponent" v-bind="{...contentProps}"/>
				</div>
			</vue-draggable-resizable>
		</span>
	</transition>
</template>

<script>
import { Expo, TweenLite } from 'gsap';

import { vuex, mapActions, mapState } from 'vuex'
import { 
	TOPMOST_WINDOW, 
	CLOSE_WINDOW,
	UPDATE_WINDOW
} from '~/store/constants'

import VueDraggableResizable from 'vue-draggable-resizable'

import Collection from '~/components/content/Collection.vue'
import ImageViewer from '~/components/content/ImageViewer.vue'

export default {
	name: 'window',
	components: {
		VueDraggableResizable,
		Collection,
		ImageViewer
	},
	props: {
		modifierClass: {
			type: String,
			default: ''
		},
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
		},
		groupId: {
			type: String
		}
	},
	computed: {
		panelPositionX() {
			return this.x > -1 ? this.x : this.positionX;
		},
		panelPositionY() {
			return this.y > -1 ? this.y : this.positionY;
		},
		panelPositionZ() {
			let newZ = this.z > 0 ? this.z : this.positionZ;
			// console.log("pos z",newZ)
			return newZ;
		},
		zIndexStyle() {
			return this.positionZ;
		},
		transformOriginStyle() {
			return this.x + 'px ' + this.y + 'px';
		},
		concatClassName() {
			console.log("this.modifierClass",this.modifierClass)
			if ( this.modifierClass != '') return 'window ' + this.modifierClass;
			return 'window';
		}
	},
	data: function() {
		return {
			resetPositionDistance: 40,

			x: -1,
			y: -1,
			z: 0,
			w: 0,
			h: 0,
		}
	},
	methods: {
		...mapActions([
			TOPMOST_WINDOW.action,
			CLOSE_WINDOW.action,
			UPDATE_WINDOW.action,
		]),
		closeHandler(e) {
			this.closeWindow();
		},
		closeWindow() {
			
			this[CLOSE_WINDOW.action]({windowId:this.windowId, contentId:this.contentId});
		},
		onResize(x, y, w, h) {
			this.x = x
			this.y = y
			this.w = w
			this.h = h			
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

			this[UPDATE_WINDOW.action]({windowId:this.windowId, x:this.x, y:this.y, z:this.z, w:this.w, h:this.h});
		},
		onMouseDown() {
			this[TOPMOST_WINDOW.action](this.windowId);
		},
		beforeAnimateIn(el) {
			TweenLite.set(el, {scale:0, opacity:0});
		},
		animateIn(el) {
			TweenLite.to(el, 0.2, {scale:1, opacity:1});	
		},
		animateOut(el, done) {
			TweenLite.to(el, 0.2, {scale:0, opacity:0});		
			done();		
		}
	},
	mounted() {
		this.onResize(this.positionX, this.positionY, this.sizeW, this.sizeH);
	}
};

</script>