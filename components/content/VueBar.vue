<template>
	<div v-bar ref="vuebar">
		<div>
			<slot></slot>
		</div>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { ASSISTANT_TOGGLE } from '~/model/constants'
export default {
	name: 'vue-bar',
	data: () => ({
		lastScroll: null,
	}),
	computed: {
		...mapState('assistant', ['closed']),
	},
	methods: {
		...mapActions('assistant', [ASSISTANT_TOGGLE.action]),
		onScroll() {
			const newScroll = this.$el._vuebarState && this.$el._vuebarState.barTop

			// console.log(
			// 	!closed,
			// 	this.lastScroll,
			// 	newScroll,
			// 	this.lastScroll !== newScroll,
			// 	newScroll !== 0
			// )

			if (!closed && this.lastScroll !== newScroll && newScroll !== 0) {
				this[ASSISTANT_TOGGLE.action](true)
			}

			this.lastScroll = newScroll
		},
	},
	mounted() {
		window.addEventListener('wheel', this.onScroll.bind(this))
	},
	deforeDestroy() {
		window.removeEventListener('wheel', this.onScroll.bind(this))
	},
}
</script>