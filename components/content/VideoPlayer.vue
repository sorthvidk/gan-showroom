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
import { FORCE_STOP_MUSIC } from '~/model/constants'
import getCloudinaryUrl from '~/utils/get-cloudinary-url'

export default {
	name: 'video-player',
	components: {},
	props: {
		videoUrl: {
			type: String,
			required: true
		},
		poster: {
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
			if ( this.poster ) attr.poster = this.poster
			return attr
		}
	},
	methods: {
		...mapActions([FORCE_STOP_MUSIC.action])
	},
	mounted() {
		if (!this.muted) this[FORCE_STOP_MUSIC.action]()
	}
};
</script>