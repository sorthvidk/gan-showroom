<template>
	<div
		class="green-room"
		:style="{ width: `${items.length * 25}vw`, height: '100vh' }"
	>
		<h1>
			"WE SEE CARBON OFFSETTING AS A SELF-IMPOSED CARBON TAX, A TAX WHICH
			POLITICIANS NEVER HAD THE GUTS TO INTRODUCE. IT IS HUGELY BENEFICIAL FOR
			THE TRANSITION TOWARDS A SUSTAINABLE FASHION INDUSTRY"<br />
			– NICOLAJ REFFSTRUP
		</h1>
		<h1>
			"I’ve been involved in the climate change agenda for over 25 years,
			despite this inherent contradiction, I still own a fashion company. I’ve
			been over it a million times, but I’ve come to realize that staying in the
			industry and working to become more responsible is better than the
			alternative of opting out and doing nothing. Fashion is not going away.
			We’re running out of time, and we need to solve the issues we’re facing
			through growth and innovation"<br />
			– NICOLAJ REFFSTRUP, GANNI
		</h1>
		<h1>
			"IT’S NOT ENOUGH TO REPLACE A CONVENTIONAL COTTON WITH AN ORGANIC ONE AND
			THINKING THAT THE JOB IT DONE. YOU HAVE TO APPROACH BEHAVING RESPONSIBLY
			IN A HOLISTIC WAY – IT’S ABOUT PUTTING OUR GOALS OUT THERE AND HOLDING
			OURSELVES ACCOUNTABLE"<br />
			– NICOLAJ REFFSTRUP
		</h1>
		<div
			class="green-room__item"
			v-for="(item, idx) in items"
			:key="item.text + '' + idx"
			:class="{
				fixed: item.fixed,
				'enter-left': idx < items.length / 2,
				'is-link': item.link,
			}"
			:data-order="idx"
			ref="items"
			:style="{
				zIndex: item.fixed ? 0 : 1,
				'--enter-duration': 2 + 's',
				'--enter-delay': idx / 10 + 's',
			}"
		>
			<!-- zIndex: items.length - idx, -->
			<button v-if="!item.link">
				<img :src="item.cloudinaryUrl" />
			</button>
			<a
				v-else
				:href="item.link"
				target="_blank"
				@mouseenter="changeCursor('Read more', 'external')"
				@mouseleave="changeCursor('')"
			>
				<img :src="item.cloudinaryUrl" />
			</a>
			<div class="green-room__text" v-if="item.text">
				<p v-html="item.text" />
			</div>
		</div>
	</div>
</template>

<script>
import viscosity from 'scroll-viscosity'
import { mapState, mapActions } from 'vuex'
import { TEXT_CURSOR } from '~/model/constants'

export default {
	name: 'green-room',
	data: () => ({
		currentlyOpen: null,
	}),
	computed: {
		...mapState('greenRoom', ['items']),
	},
	methods: {
		...mapActions('utils', [TEXT_CURSOR.action]),
		scrollHorizontally(event) {
			const delta = event.deltaY
			window.scrollTo(window.pageXOffset + delta, 0)
		},
		toggle(idx) {
			if (this.items[idx].link) return

			this.currentlyOpen = idx === this.currentlyOpen ? null : idx
		},
		changeCursor(str, icon) {
			this[TEXT_CURSOR.action]({ str, icon })
		},
	},
	mounted() {
		this.$nextTick(() => {
			if (!this.$refs.items || !this.$refs.items.length) {
				return
			}

			this.$refs.items.forEach((item, idx) => {
				if (item.classList.contains('fixed')) return

				viscosity({ element: item, easing: 0.02 * idx + 0.02 })
			})
		})
		window.addEventListener('wheel', this.scrollHorizontally)
	},
	beforeDestroy() {
		window.removeEventListener('wheel', this.scrollHorizontally)
		this.changeCursor('')
	},
}
</script>
