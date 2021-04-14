<template>
	<p class="clip-text" :style="{ background: `url(${background})` }">
		{{ text }}
	</p>
</template>

<script>
export default {
	name: 'clip-text',
	props: {
		text: {
			type: String,
		},
		background: {
			type: String,
		},
	},
}
</script>
