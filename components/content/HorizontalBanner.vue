<template>
	<div class="horizontal-banner" ref="component">
		<!-- :style="{ height: `${screenSize.height * speed}px` }" -->
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
	props: {
		speed: {
			type: Number,
			default: 4,
		},
	},
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
					(this.currentScroll - this.componentTop) /
						(this.componentHeight - this.contentHeight),
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
					this.componentTop = this.currentScroll
					console.log(this)
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