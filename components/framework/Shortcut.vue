<template>
	<transition @before-appear="beforeAnimateIn" @appear="animateIn">
		<button
			@click="onClick"
			class="shortcut"
			:style="{ gridColumn: styleGridColumn, gridRow: styleGridRow }"
		>
			<span class="icon">{{icon}}</span>
			<span class="text">{{label}}</span>
		</button>
	</transition>
</template>

<script>
import { vuex, mapActions, mapState } from 'vuex'
import { TweenLite } from 'gsap'
import { OPEN_CONTENT } from '~/model/constants'
import ShortcutTypes from '~/model/shortcut-types'

export default {
	name: 'shortcut',
	props: {
		positionH: {
			type: Number,
			default: 0,
			required: true
		},
		positionV: {
			type: Number,
			default: 0,
			required: true
		},
		icon: {
			type: String,
			default: null,
			required: true
		},
		label: {
			type: String,
			default: null,
			required: true
		},
		shortcutId: {
			type: String,
			default: null,
			required: true
		},
		type: {
			type: Number,
			default: -1,
			required: true
		},
		windowContent: {
			type: Array,
			default: () => [],
			required: true
		},
		action: {
			type: String,
			default: null,
			required: false
		},
		actionParam: {
			type: String,
			default: null,
			required: false
		},
		href: {
			type: String,
			default: null,
			required: false
		},
		nthChild: {
			type: Number
		}
	},
	computed: {
		styleGridRow() {
			return this.positionV + '/' + (this.positionV + 1)
		},
		styleGridColumn() {
			return this.positionH + '/' + (this.positionH + 1)
		}
	},
	methods: {
		...mapActions([OPEN_CONTENT.action]),
		onClick() {

			if ( this.type == ShortcutTypes.URL && this.href ) {
				window.open(this.href,'_blank');				
			}
			else {
				this[OPEN_CONTENT.action]({ windowContent: this.windowContent })
			}

			//TODO: Fix race condition!!
			setTimeout(() => {
				if (this.action) {
					if (this.actionParam)
						this.$store.dispatch(this.action, this.actionParam)
					else this.$store.dispatch(this.action)
				}
			}, 500)
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
	}
};
</script>