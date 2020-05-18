<template>
	<div ref="marquee" class="marquee" data-speed="1" data-pausable="true">
		<!-- loop a couple of times to make them fill the screen -->
		<p v-for="i in amount" :key="i">
			Lets open
			<button @click="openWindow(marqueeLinks[0])">{{ marqueeLinks[0].label }}</button>,
			or why not
			<button @click="openWindow(marqueeLinks[1])">{{ marqueeLinks[1].label }}</button>
			or even this
			<button @click="openStyle(marqueeLinks[2])">{{ marqueeLinks[2].label }}</button>
			•&nbsp;
		</p>
	</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { OPEN_STYLE_CONTENT, OPEN_CONTENT } from '~/model/constants'

export default {
	name: 'marquee',
	data() {
		return {
			amount: 0
		}
	},
	computed: {
		...mapState({
			shortcuts: state => state.shortcuts.list
		}),
		marqueeLinks() {
			return this.shortcuts.filter(link => link.marqueeLink)
		}
	},
	methods: {
		...mapActions([OPEN_STYLE_CONTENT.action, OPEN_CONTENT.action]),
		openStyle(link) {
			this[OPEN_STYLE_CONTENT.action](link.actionParam)
		},
		openWindow(link) {
			this[OPEN_CONTENT.action]({ windowContent: link.windowContent })

			//TODO: Fix race condition!!
			setTimeout(() => {
				if (link.action) {
					if (link.actionParam)
						this.$store.dispatch(link.action, link.actionParam)
					else this.$store.dispatch(link.action)
				}
			}, 500)
		}
	},
	mounted() {
		this.$nextTick(() => {
			this.amount =
				Math.ceil(
					window.innerWidth /
						parseInt(window.getComputedStyle(this.$refs.marquee).width)
				) *
					2 +
				1
		})
	}
}
</script>