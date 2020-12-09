<template>
	<div v-bar ref="vuebar">
		<slot></slot>
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

			if (!closed && this.lastScroll !== newScroll) {
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