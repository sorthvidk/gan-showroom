<template>
	<div class="green-room" :style="{ width: `${items.length * 20}vw` }">
		<h1 ref="visc">
			"A carbon tax, which our politicians never had the guts to introduce, will
			be hugely beneficial for the transition towards a sustainable fashion
			industry"<br />
			— Nicolaj Reffstrup
		</h1>
		<div
			class="green-room__item"
			v-for="(item, idx) in items"
			:key="item.text"
			ref="items"
			:style="{ left: `${idx * 19 + 5}%`, top: `${(idx % 2) * 45 + 5}%` }"
		>
			<button @click="toggle(idx)">
				<!-- real image -->
				<!-- <img :src="item.cloudinaryUrl" /> -->

				<!-- test image -->
				<img :src="'img/hamster2.gif'" />
			</button>
			<p v-if="currentlyOpen.includes(idx)">{{ item.text }}</p>
		</div>
	</div>
</template>

<script>
import viscosity from 'scroll-viscosity'
import { mapState } from 'vuex'

export default {
	name: 'green-room',
	data: () => ({
		currentlyOpen: [],
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
			this.currentlyOpen = this.currentlyOpen.includes(idx)
				? this.currentlyOpen.filter((i) => i !== idx)
				: [...this.currentlyOpen, idx]
		},
	},
	mounted() {
		viscosity({
			element: this.$refs.visc,
			easing: 0.2,
		})
		this.$refs.items.forEach((item, idx) => {
			viscosity({ element: item, easing: 0.01 * idx + 0.05 })
		})
		window.addEventListener('wheel', this.scrollHorizontally)
	},
	beforeDestroy() {
		window.removeEventListener('wheel', this.scrollHorizontally)
	},
}
</script>
