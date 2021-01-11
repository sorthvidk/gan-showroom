<template>
	<audio-gallery
		:sources="[various.scrollAudio.src]"
		:autoplay="true"
		@played-through="$emit('played-through')"
	/>
</template>
<script>
import AudioGallery from './AudioGallery.vue'
import { mapState } from 'vuex'

export default {
	name: 'audio-gallery-controller',
	components: {
		AudioGallery,
	},
	computed: {
		...mapState('utils', ['various']),
	},
}
</script>