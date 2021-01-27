<template>
	<!--
    used as a way to start the scroll gallery,
    without the need to pass any props when including the component
    i.e. <audio-gallery-controller />
  -->
	<audio-gallery
		:sources="[various.scrollAudio.src]"
		:autoplay="userHasInteracted"
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
		...mapState('user', ['userHasInteracted']),
		...mapState('utils', ['various']),
	},
}
</script>