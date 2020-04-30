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
				:x="computedPositionX"
				:y="computedPositionY"
				:w="computedSizeW"
				:h="computedSizeH"
				:style="{zIndex: zIndexStyle, transformOrigin: transformOriginStyle}">
				<div class="window__top">
					<span class="title">{{title}}</span>
					<button v-if="canClose" class="close" @click="closeHandler">Ｘ</button>
					<button v-if="canMaximize" class="maximize" @click="maximizeHandler">
						<span v-if="isMaximized">⇲</span>
						<span v-if="!isMaximized">↖︎</span>
					</button>
				</div>
				<div class="window__status">
					<!-- <p>TIP: Try to touch your own nose!</p> -->
					<p>windowId: {{windowId}} | contentId: {{contentId}} | pos: {{ computedPositionX }},{{ computedPositionY }}-{{ computedPositionZ }}z | size: {{ computedSizeW }}/{{ computedSizeH }}</p>
					<!-- <p>windowId: {{windowId}} | contentId: {{contentId}}</p> -->
				</div>
				<div class="window__content">				
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
} from '~/model/constants'

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
		canClose: {
			type: Boolean,
			default: true
		},
		canMaximize: {
			type: Boolean,
			default: false
		},
		isLocked: {
			type: Boolean,
			default: false
		},
		isFoldable: {
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
		computedPositionX() {
			return this.x > -1 ? this.x : this.positionX;
		},
		computedPositionY() {
			return this.y > -1 ? this.y : this.positionY;
		},
		computedPositionZ() {
			return this.positionZ;
		},
		computedSizeW() {
			return this.w > 0 ? this.w : this.sizeW;
		},
		computedSizeH() {
			return this.h > 0 ? this.h : this.sizeH;
		},
		zIndexStyle() {
			return this.positionZ;
		},
		transformOriginStyle() {
			return this.x + 'px ' + this.y + 'px';
		},
		concatClassName() {
			if ( this.modifierClass != '') return 'window ' + this.modifierClass;
			return 'window';
		}
	},
	data: function() {
		return {
			resetPositionDistance: 40,

			isMaximized: false,

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
			this[CLOSE_WINDOW.action]({windowId:this.windowId, contentId:this.contentId});
		},
		maximizeHandler() {			
			if (this.isMaximized) {
				this.isMaximized = false;
				this.onResize(this.positionX, this.positionY, this.sizeW, this.sizeH);
			}
			else {
				this.isMaximized = true;
				this.onResize(this.resetPositionDistance, this.resetPositionDistance, window.innerWidth - 2*this.resetPositionDistance, window.innerHeight - 2*this.resetPositionDistance);
			}
			this.constrain();
		},
		onResize(x, y, w, h) {
			console.log(x, y, w, h);
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
			console.log("kldsf")
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