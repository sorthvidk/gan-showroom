<template>
	<div class="audio-spectrum-bars" :class="{ animate }">
		<div v-for="i in 4" :key="i" class="audio-spectrum-bars__bar" />
	</div>
</template>


<script>
export default {
	name: 'audio-spectrum-bars',
	props: {
		animate: {
			type: Boolean,
			default: false,
		},
	},
}
</script>