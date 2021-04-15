
<template>
	<p class="countdown">{{ text }} {{ deadline }}</p>
</template>

<script>
export default {
	name: 'countdown',
	props: {
		text: {
			type: String,
		},
		deadline: {
			type: Date,
		},
	},
}
</script>
