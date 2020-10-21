<template>
	<transition @before-appear="beforeAnimateIn" @appear="animateIn">
		<button
			@click="onClick"
			@mouseenter="changeBackground"
			@mouseleave="changeBackground(false)"
			class="shortcut"
			:class="{ shortcut__text: textLayout, shortcut__icon: !textLayout }"
			:style="{ gridColumn: styleGridColumn, gridRow: styleGridRow }"
		>
			<span class="icon" v-if="!textLayout">
				<img :src="icon" />
			</span>
			<span class="text">{{ label }}</span>
		</button>
	</transition>
</template>

<script>
import { vuex, mapActions, mapState, mapGetters } from 'vuex'
import { TweenLite } from 'gsap'
import {
	OPEN_CONTENT,
	SET_GROUP_BY_IDENTIFIER,
	DESKTOP_BACKGROUND
} from '~/model/constants'
import ShortcutTypes from '~/model/shortcut-types'

export default {
	name: 'shortcut',
	props: {
		textLayout: { type: Boolean, default: false, required: false },
		positionH: { type: Number, default: 0, required: true },
		positionV: { type: Number, default: 0, required: true },
		icon: { type: String, default: null, required: true },
		label: { type: String, default: null, required: true },
		shortcutId: { type: String, default: null, required: true },
		type: { type: Number, default: -1, required: true },
		windowContent: { type: [Array, String], default: () => [], required: true },
		actions: { type: Array, default: null, required: false },
		href: { type: String, default: null, required: false },
		nthChild: { type: Number }
	},
	computed: {
		...mapGetters('collection', ['authorizedGroupsIds']),
		styleGridRow() {
			return this.positionV + '/' + (this.positionV + 1)
		},
		styleGridColumn() {
			return this.positionH + '/' + (this.positionH + 1)
		}
	},
	methods: {
		...mapActions([OPEN_CONTENT.action, DESKTOP_BACKGROUND.action]),
		onClick() {
			const { windowContent } = this

			if (this.type == ShortcutTypes.URL && this.href) {
				window.open(this.href, '_blank')
			} else {
				if (this.actions) {
					const openContent = () => this[OPEN_CONTENT.action]({ windowContent })

					this.actions.forEach(action => {
						if (typeof action.param !== 'undefined')
							this.$store.dispatch(action.name, action.param).then(openContent)
						else this.$store.dispatch(action.name).then(openContent)
					})
				} else {
					this[OPEN_CONTENT.action]({ windowContent })
				}
			}
		},
		beforeAnimateIn(el) {
			TweenLite.set(el, { scale: 1, opacity: 0 })
		},
		animateIn(el) {
			TweenLite.to(el, 0, {
				delay: Math.floor(this.nthChild) / 30 + 0.5,
				scale: 1,
				opacity: 1,
				ease: 'power4.inOut'
			})
		},
		changeBackground(color) {
			if (!this.textLayout) return

			this[DESKTOP_BACKGROUND.action](!color ? false : this.nthChild)
		}
	}
}
</script>
