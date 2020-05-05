<template>
	<transition @before-appear="beforeAnimateIn" @appear="animateIn" @leave="animateOut">
		<span :style="{position: 'relative', zIndex: zIndexStyle}"> <!-- can't attach listener to vue-draggable -->				
			<vue-draggable-resizable
				v-if="!isLocked && !isFoldable"
				:class-name="concatClassName"
				class-name-active="is-active"
				class-name-dragging="is-dragging"
				@dragging="onDrag"
				@dragstop="onDragStop"
				@resizing="onResize"
				@resizestop="onResizeStop"
				:handles="['br']"
				:drag-handle="'.title'"
				:x="computedPositionX"
				:y="computedPositionY"
				:w="computedSizeW"
				:h="computedSizeH"
				:style="{transformOrigin: transformOriginStyle}">
					<div class="window__top">
						<span class="title" @click="titleClick">{{title}}</span>
						<!-- <button v-if="canMaximize" class="maximize" @click.stop="maximizeHandler">
							<span v-if="isMaximized">⇲</span>
							<span v-if="!isMaximized">↖︎</span>
						</button> -->
						<button class="close" @click.stop="closeHandler">Ｘ</button>
					</div>
					<div v-if="!noStatus" class="window__status">

						<component :is="statusComponent" v-bind="{...statusComponentProps}" />
						<!-- <p>TIP: Try to touch your own nose!</p> -->
						<!-- <p>windowId: {{windowId}} | contentId: {{contentId}} | pos: {{ computedPositionX }},{{ computedPositionY }}-{{ computedPositionZ }}z | size: {{ computedSizeW }}/{{ computedSizeH }}</p> -->
						<!-- <p>windowId: {{windowId}} | contentId: {{contentId}}</p> -->
					</div>
					<div class="window__content">				
						<component :is="contentComponent" v-bind="{...contentComponentProps}"/>
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
import SingleImage from '~/components/content/SingleImage.vue'
import TextReader from '~/components/content/TextReader.vue'
import Films from '~/components/content/Films.vue'


import StatusStatic from '~/components/content/StatusStatic.vue'
import StatusCollection from '~/components/content/StatusCollection.vue'

export default {
	name: 'window',
	components: {
		VueDraggableResizable,
		StatusStatic,
		StatusCollection,
		Collection,
		SingleImage,
		TextReader,
		Films,
	},
	props: {
		modifierClass: {
			type: String,
			default: ''
		},		
		contentType: {
			type: Object,
			required: true
		},
		contentName: {
			type: String,
			required: true
		},
		canClose: {
			type: Boolean,
			default: true
		},
		canMaximize: {
			type: Boolean,
			default: false
		},		
		

		contentComponent: {
			type: String,
			default: null
		},
		contentComponentProps: {
			type: Object,
			default: null
		},

		noStatus: {
			type: Boolean,
			default: false		
		},
		statusComponent: {
			type: String,
			default: null,
			required: false
		},
		statusComponentProps: {
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
			// console.log("z index style", this.positionZ)
			return this.positionZ;
		},
		transformOriginStyle() {
			return this.x + 'px ' + this.y + 'px';
		},
		concatClassName() {
			let cn = 'window';
			if ( this.modifierClass != '') cn += ' ' + this.modifierClass;
			if ( this.noStatus ) cn += ' window--no-status';

			return cn;
		}
	},
	data: function() {
		return {
			resetPositionDistance: 40,
			maximizeOffset: 0,
			maximizeTimeoutHandle: -1,
			maximizeClicked: false,
			isMaximized: false,

			x: this.computedPositionX,
			y: this.computedPositionY,

			w: this.computedSizeW,
			h: this.computedSizeH,

			savedAttributes: {
				x:0,y:0,w:0,h:0
			}
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
		titleClick() {
			if ( this.maximizeClicked ) {
				clearTimeout(this.maximizeTimeoutHandle);
				this.maximizeClicked = false;
				this.maximizeHandler();
			}
			else {				
				this.maximizeClicked = true;
				this.maximizeTimeoutHandle = setTimeout( ()=>{ this.maximizeClicked = false; }, 200 );
			}
		},
		maximizeHandler() {
			if (this.isMaximized) {
				this.isMaximized = false;
				this.onResize(this.savedAttributes.x, this.savedAttributes.y, this.savedAttributes.w, this.savedAttributes.h);
			}
			else {
				this.isMaximized = true;
				this.savedAttributes = {x: this.positionX,y: this.positionY,w: this.sizeW,h: this.sizeH}
				this.onResize(this.maximizeOffset, this.maximizeOffset, window.innerWidth - 2*this.maximizeOffset, window.innerHeight - 2*this.maximizeOffset);
			}
			this.constrain();
		},
		onResize(x, y, w, h) {
			// console.log(x, y, w, h);
			this.x = x
			this.y = y
			this.w = w
			this.h = h
			this[TOPMOST_WINDOW.action](this.windowId);
		},
		onResizeStop() {
			this.isMaximized = false;
			this.constrain();
		},
		onDrag(x, y) {
			this.x = x;
			this.y = y;
			this[TOPMOST_WINDOW.action](this.windowId);
		},
		onDragStop() {
			this.constrain();
		},
		constrain() {
			this.x = Math.min(Math.max(this.x,0), window.innerWidth - this.resetPositionDistance);
			this.y = Math.min(Math.max(this.y,0), window.innerHeight - this.resetPositionDistance);

			this[UPDATE_WINDOW.action]( {	
				windowId:this.windowId, 
				windowProps: {positionX:this.x, positionY:this.y, sizeW:this.w, sizeH:this.h}
			});
			this[TOPMOST_WINDOW.action](this.windowId);
		},
		// onMouseDown() {
		// 	this[TOPMOST_WINDOW.action](this.windowId);
		// },
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