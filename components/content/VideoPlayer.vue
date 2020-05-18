<template>
	<div class="video-player">
		<video
			:src="videoUrl"
			v-bind="{...videoAttributes}"
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
	computed: {
		videoAttributes() {
			let attr = {}
			if ( this.autoPlay ) attr.autoplay = "autoplay"
			if ( this.controls ) attr.controls = "autoplay"
			if ( this.loop ) attr.loop = "autoplay"
			if ( this.muted ) attr.muted = "autoplay"

			return attr;
		}
	},
	methods: {
		...mapActions([PLAY_VIDEO.action])
	},
	mounted() {
		if (!this.muted) this[PLAY_VIDEO.action]()
	}
};
</script>