<template>
	<NuxtLink class="shortcut shortcut-bottombar" :to="`/${shortcutId}`">
		<span class="text">{{ label }}</span>
	</NuxtLink>
	<!-- <button
		@click="onClick"
		class="shortcut shortcut-bottombar"
		:class="{
			active:
				dashboardContent && dashboardContent.contentComponent === shortcutId,
		}"
		:style="{ gridColumn: styleGridColumn, gridRow: styleGridRow }"
	>
		<span class="icon" v-if="!textLayout">
			<img :src="icon" />
		</span>
		<span class="text">{{ label }}</span>
	</button> -->
</template>

<script>
import { vuex, mapActions, mapState, mapGetters } from 'vuex'
import { TweenLite } from 'gsap'
import {
	OPEN_CONTENT,
	OPEN_CONTENT_IN_DASHBOARD,
	SET_GROUP_BY_IDENTIFIER,
	DESKTOP_BACKGROUND
} from '~/model/constants'
import ShortcutTypes from '~/model/shortcut-types'

export default {
	name: 'shortcut',
	props: {
		label: { type: String, default: null, required: true },
		shortcutId: { type: String, default: null, required: true }
	},
	data: () => ({
		cssClass: ''
	}),
	computed: {
		...mapState(['dashboardContent']),
		...mapGetters('collection', ['authorizedGroupsIds'])
	},
	methods: {
		...mapActions([OPEN_CONTENT.action, OPEN_CONTENT_IN_DASHBOARD.action]),
		...mapActions('assets', [DESKTOP_BACKGROUND.action]),
		onClick() {
			const { windowContent } = this

			if (this.type == ShortcutTypes.URL && this.href) {
				window.open(this.href, '_blank')
			} else {
				const openContentInDashboard = () => {
					this.$nextTick(() =>
						this[OPEN_CONTENT_IN_DASHBOARD.action]({ windowContent })
					)
				}
				if (this.actions) {
					// const openContent = () =>
					// 	this.$nextTick(() => this[OPEN_CONTENT.action]({ windowContent }))

					this.actions.forEach(action => {
						if (typeof action.param !== 'undefined')
							this.$store.dispatch(action.name, action.param)
						else this.$store.dispatch(action.name)
					})
				}

				openContentInDashboard()
			}
		},
		beforeAnimateIn(el) {
			TweenLite.set(el, { scale: 1, opacity: 0 })
		},
		animateIn(el) {
			TweenLite.to(el, 0, {
				delay: Math.floor(this.nthChild) / 20 + 0.5,
				scale: 1,
				opacity: 1,
				ease: 'power4.inOut'
			})
		},
		changeBackground(color) {
			if (!this.textLayout) return

			this[DESKTOP_BACKGROUND.action](!color ? false : this.nthChild)
		}
	},
	mounted() {
		// console.log(this.shortcutId)
	}
}
</script>
