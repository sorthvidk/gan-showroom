<template>
	<div class="green-room" :style="{ width: `${items.length * 30}vmax` }">
		<h1 ref="visc">
			"A carbon tax, which our politicians never had the guts to introduce, will
			be hugely beneficial for the transition towards a sustainable fashion
			industry"<br />
			— Nicolaj Reffstrup
		</h1>
		<div
			class="green-room__item"
			v-for="(item, idx) in items"
			:key="item.text + idx"
			:class="{ fixed: item.fixed, 'enter-left': idx < items.length / 2 }"
			:data-order="idx"
			ref="items"
			:style="{
				zIndex: items.length - idx,
				'--enter-duration': 2 + 's',
				'--enter-delay': idx / 10 + 's',
			}"
		>
			<button v-if="!item.link" @click="toggle(idx)">
				<img :src="item.cloudinaryUrl" />
			</button>
			<a v-else :href="item.link" target="_blank" @click="toggle(idx)">
				<img :src="item.cloudinaryUrl" />
			</a>
			<div class="green-room__text" v-if="currentlyOpen === idx">
				<button @click="currentlyOpen = null">&times;</button>
				<p>{{ item.text }}</p>
			</div>
		</div>
	</div>
</template>

<script>
import viscosity from 'scroll-viscosity'
import { mapState } from 'vuex'

export default {
	name: 'green-room',
	data: () => ({
		currentlyOpen: null,
	}),
	computed: {
		...mapState('greenRoom', ['items']),
	},
	methods: {
		scrollHorizontally(event) {
			const delta = event.deltaY
			window.scrollTo(window.pageXOffset + delta, 0)
		},
		toggle(idx) {
			if (this.items[idx].link) return

			this.currentlyOpen = idx === this.currentlyOpen ? null : idx
		},
	},
	mounted() {
		this.$refs.items.forEach((item, idx) => {
			if (item.classList.contains('fixed')) return

			viscosity({ element: item, easing: 0.02 * idx + 0.02 })
		})
		window.addEventListener('wheel', this.scrollHorizontally)
	},
	beforeDestroy() {
		window.removeEventListener('wheel', this.scrollHorizontally)
	},
}
</script>
