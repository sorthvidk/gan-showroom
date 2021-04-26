<template>
	<div class="horizontal-banner" ref="component">
		<div class="horizontal-banner__content">
			<div
				class="horizontal-banner__moving"
				ref="content"
				:style="{
					transform: `translateX(${-percentScrolled * 2 + 100}%)`,
				}"
			>
				<slot></slot>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import { clamp } from '~/utils/clamp'
export default {
	name: 'horizontal-banner',
	data: () => ({
		componentHeight: 0,
		componentTop: 0,
		contentHeight: 0,
	}),
	computed: {
		...mapState('user', ['currentScroll', 'screenSize']),
		percentScrolled() {
			return (
				clamp(
					0,
					(this.currentScroll - this.componentTop) / this.componentHeight,
					1
				) * 100
			)
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
	},
}
</script>