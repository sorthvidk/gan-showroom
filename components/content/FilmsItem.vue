<template>
	<button class="films-item" :class="{'is-playing':isPlaying}" @click="onItemClick">
		<div class="films-item__poster">
			<img :src="posterUrl" alt="lorem">
		</div>
		<p>{{filmName}}</p>
	</button>	
</template>


<script>
import ContentTypes from '~/model/content-types'

import { vuex, mapActions, mapState } from 'vuex'
import { OPEN_CONTENT } from '~/model/constants'

export default {
	name:'films-item',
	props: {
		filmId: {
			type: String,
			required: true
		},
		filmName: {
			type: String,
			required: true
		},
		posterUrl: {
			type: String,
			required: true
		},
		videoUrl: {
			type: String,
			required: true
		}
	},
	data() {
		return {
			isPlaying: false
		}
	},
	methods: {
		...mapActions([
			OPEN_CONTENT.action
		]),		
		onItemClick() {
			let type = ContentTypes.videoLandscape;

			let videoContent = [
				{
					
					title: this.filmName,
					contentId: this.filmId,
					type: type,
					canOverride: false,
					windowProps: type.defaultWindowProps,
					contentComponentProps: { asset: {videoUrl: this.videoUrl, posterUrl:this.posterUrl} },
					statusComponentProps: type.defaultStatusComponentProps
				}
			]
			this[OPEN_CONTENT.action]( {windowContent:videoContent} );
		}
	}
};

</script>