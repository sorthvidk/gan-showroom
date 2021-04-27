<template>
	<div
		class="text-cursor"
		:style="{
			transform: `translate(calc(${mousepos.x}px - 50%), calc(${mousepos.y}px - 50%))`,
		}"
	>
		<p>{{ text }}</p>
	</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
	name: 'text-cursor',
	props: {
		text: { type: String },
	},
	computed: {
		...mapState('user', ['mousepos']),
	},
}
</script>