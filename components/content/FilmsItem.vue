<template>
	<button class="films-item" :class="{'is-playing':isPlaying}" @click="clickHandler">
		<div class="films-item__poster">
			<img :src="posterUrl" alt="lorem">
		</div>
		<p>{{filmName}}</p>
	</button>	
</template>


<script>


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
		clickHandler() {
			this.isPlaying = !this.isPlaying;
		}
	}
};

</script>