<template>
	<div class="afterparty">
		<h1 ref="visc">AFTERPARTY</h1>
	</div>
</template>

<script>
import viscosity from 'scroll-viscosity'

export default {
	name: 'afterparty',
	mounted() {
		let instance = viscosity({
			element: this.$refs.visc,
			easing: 0.1,
		})
	},
}
</script>
