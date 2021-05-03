<template>
	<div class="horizontal-banner" ref="component">
		<div class="horizontal-banner__content">
			<div class="horizontal-banner__moving" ref="content">
				<span
					v-for="(line, idx) in lines"
					:key="line"
					ref="lines"
					:style="{
						transform: `translateX(${translateValue * ((idx + 20) / 20)}vw)`,
					}"
					>{{ line }}</span
				>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import { clamp } from '~/utils/clamp'
import BezierEasing from 'bezier-easing'

export default {
	name: 'horizontal-banner',
	props: {
		text: {
			type: String,
		},
	},
	data: () => ({
		componentHeight: 0,
		componentTop: 0,
		contentHeight: 0,
		ease: BezierEasing(0, 0.8, 1, 0.2),
	}),
	computed: {
		...mapState('user', ['currentScroll', 'screenSize']),
		percentScrolled() {
			const value =
				(this.currentScroll - this.componentTop) /
				(this.componentHeight - this.screenSize.height)
			return clamp(0, value, 1)
		},
		lines() {
			return this.text.match(/[^\r\n]+/g)
		},
		translateValue() {
			return this.ease(this.percentScrolled) * -100 * 2 + 100
		},
	},
	methods: {
		easeInOutQuint(t) {
			return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t
		},
	},
	mounted() {
		const intersectionCallback = (entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					this.componentHeight = this.$refs.component.offsetHeight
					this.contentHeight = this.$refs.content.offsetHeight
					this.componentTop =
						this.$refs.component.getBoundingClientRect().top +
						this.currentScroll
				}
			})
		}

		let observer = new IntersectionObserver(intersectionCallback, {
			threshold: 0,
		})

		observer.observe(this.$refs.component)

		console.log()
	},
}
</script>