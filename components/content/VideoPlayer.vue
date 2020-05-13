<template>
	<div class="video-player">
		<video
			:src="videoUrl"
			v-bind:poster="posterUrl"
			v-bind:autoplay="autoPlay"
			v-bind:muted="muted"
			v-bind:controls="controls"
			v-bind:loop="loop"
			preload
		></video>
	</div>
</template>

<script>
import { vuex, mapActions, mapState } from 'vuex'
import { PLAY_VIDEO } from '~/model/constants'

export default {
	name: 'video-player',
	components: {},
	props: {
		videoUrl: {
			type: String,
			required: true
		},
		posterUrl: {
			type: String,
			required: false,
			default: null
		},
		autoPlay: {
			type: Boolean,
			required: false,
			default: false
		},
		muted: {
			type: Boolean,
			required: false,
			default: false
		},
		controls: {
			type: Boolean,
			required: false,
			default: false
		},
		loop: {
			type: Boolean,
			required: false,
			default: false
		}
	},

	methods: {
		...mapActions([PLAY_VIDEO.action])
	},
	mounted() {
		if (!this.muted && !this.controls) this[PLAY_VIDEO.action]()
	}
}
</script>