<template>
	<div>
		<audio-player
			:sources="['audio/1-11-Together-Again.mp3']"
			:autoplay="true"
			:loop="true"
		/>
		<audio-gallery />
	</div>
</template>

<script>
import AudioGallery from '~/components/content/AudioGallery.vue'
import AudioPlayer from '~/components/content/AudioPlayer.vue'

import { INDEX_COLLECTION_DATA } from '~/model/constants'

export default {
	components: {
		AudioPlayer,
		AudioGallery,
	},
}
</script>
