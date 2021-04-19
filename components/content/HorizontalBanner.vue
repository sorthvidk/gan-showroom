<template>
	<div
		class="horizontal-banner"
		:style="{ height: `${screenSize.height * speed}px` }"
		ref="component"
	>
		<div
			class="horizontal-banner__content"
			ref="content"
			:style="{ transform: `translateX(${-percentScrolled + 100}%)` }"
		>
			<slot></slot>
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
			default: 2,
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
		this.componentHeight = this.$refs.component.offsetHeight
		this.contentHeight = this.$refs.content.offsetHeight
		this.componentTop = this.$refs.component.offsetTop
	},
}
</script>