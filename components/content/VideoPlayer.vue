<template>
	<div class="video-player">
		<video :src="videoUrl" autoplay preload muted controls></video>
	</div>
</template>

<script>


import { vuex, mapActions, mapState } from 'vuex'
import { PLAY_VIDEO } from '~/model/constants'

export default {
	name:'video-player',
	components: {
		
	},
	props: {
		videoUrl: {
			type: String,
			required: true
		}
	},
	
	methods: {
		...mapActions([
			PLAY_VIDEO.action,
		]),	
		playHandler() {
			console.log("PLAY")
		}
	},
	mounted() {
		this[PLAY_VIDEO.action]();
	}
};
</script>