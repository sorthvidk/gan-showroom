<template>
	<transition @before-appear="beforeAnimateIn" @appear="animateIn">
		<button
			v-if="!blownUpIconLayout"
			@click="onClick"
			class="shortcut"
			:class="blownUpIconLayout ? 'shortcut--large' : ''"
			:style="{ gridColumn: styleGridColumn, gridRow: styleGridRow }"
		>
			<span class="icon">
				<img :src="item.icon" />
			</span>
			<span class="text">{{item.label}}</span>
		</button>
		
		<div
			v-else
			class="shortcut shortcut--large"
			:style="{ gridColumn: styleGridColumn, gridRow: styleGridRow }"
		>
			<span class="icon">
				<img :src="item.icon" />
			</span>
			<button @click="onClick" class="text">{{item.label}}</button>
		</div>
	</transition>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { TweenLite } from 'gsap'
import { OPEN_CONTENT } from '~/model/constants'
import ShortcutTypes from '~/model/shortcut-types'

export default {
	name: 'shortcut',
	props: {
		item: {
			type: Object,
			default: () => ({}),
			required: true
		},
		// positionH: {
		// 	type: Number,
		// 	default: 0,
		// 	required: true
		// },
		// positionV: {
		// 	type: Number,
		// 	default: 0,
		// 	required: true
		// },
		// icon: {
		// 	type: String,
		// 	default: null,
		// 	required: true
		// },
		// label: {
		// 	type: String,
		// 	default: null,
		// 	required: true
		// },
		// shortcutId: {
		// 	type: String,
		// 	default: null,
		// 	required: true
		// },
		// type: {
		// 	type: Number,
		// 	default: -1,
		// 	required: true
		// },
		// windowContent: {
		// 	type: Array,
		// 	default: () => [],
		// 	required: true
		// },
		// actions: {
		// 	type: Array,
		// 	default: null,
		// 	required: false
		// },
		// href: {
		// 	type: String,
		// 	default: null,
		// 	required: false
		// },
	},
	computed: {
		...mapState('shortcuts', ['blownUpIconLayout']),
		styleGridRow() {
			return this.item.posV + '/' + (this.item.posV + 1)
		},
		styleGridColumn() {
			return this.item.posH + '/' + (this.item.posH + 1)
		}
	},
	methods: {
		...mapActions([OPEN_CONTENT.action]),
		onClick() {
			if (this.item.type == ShortcutTypes.URL && this.item.href) {
				window.open(this.item.href, '_blank')
			} else {
				if ( window.GS_LOGS ) console.log("ACTIONS???",this.item.actions)
				if (this.item.actions) {
					for (let i = 0; i < this.item.actions.length; i++) {
						let action = this.item.actions[i]
						if (typeof action.param != "undefined")
							this.$store.dispatch(action.name, action.param)
						else this.$store.dispatch(action.name)
					}
				
					//TODO: Fix race condition!!
					setTimeout(() => {
						this[OPEN_CONTENT.action]({ windowContent: this.item.windowContent })
					}, 500)
				}
				else {
					this[OPEN_CONTENT.action]({ windowContent: this.item.windowContent })
				}
			}

		},
		beforeAnimateIn(el) {
			TweenLite.set(el, { scale: 0, opacity: 0 })
		},
		animateIn(el) {
			TweenLite.to(el, 0.3, {
				delay: Math.floor(Math.random() * 10 /*this.nthChild*/) / 15 + 1,
				scale: 1,
				opacity: 1,
				ease: 'power4.inOut'
			})
		}
	},
}
</script>