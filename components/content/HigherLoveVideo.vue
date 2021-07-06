<template>
	<div class="higher-love-video">
		<p class="higher-love-video__trumpet">Now playing</p>
		<h1 class="higher-love-video__title">{{ item.title }}</h1>
		<div class="higher-love-video__youtube">
			<div :key="item.youtube" id="ytplayer"></div>
		</div>
	</div>
</template>

<script>
import getCloudinaryUrl from '~/utils/get-cloudinary-url'
import { mapState } from 'vuex'
import getVideoId from 'get-video-id'
import YTPlayer from 'yt-player'

export default {
	name: 'higher-love-video',
	props: {
		item: { type: Object }
	},
	data: () => ({
		getVideoId,
		player: null
	}),
	computed: {
		...mapState('higher-love', ['content'])
	},
	methods: {
		assetUrl(url) {
			return getCloudinaryUrl(
				this.$cloudinary,
				{ cloudinaryUrl: url, type: 'video' },
				{
					// width: this.asset.aspect === 'landscape' ? 592 : 370,
					// height: this.asset.aspect === 'portrait' ? 563 : 390,
				}
			)
		},
		emitPlay(youtubeUrl) {
			this.$emit('play', youtubeUrl)
		},
		load() {
			if (!this.player) return

			const { id } = getVideoId(this.item.youtube)

			this.player.load(id)
			this.player.setVolume(100)
			this.player.on('playing', () => {
				console.log(player.getDuration())
			})
		}
	},
	watch: {
		item: {
			handler() {
				this.load()
			}
		}
	},
	mounted() {
		setTimeout(() => {
			this.load()
		}, 500)

		this.player = new YTPlayer(`#ytplayer`, {
			// controls: false,
			modestBranding: true,
			related: false,
			annotations: false,
			fullscreen: true
		})

		// this.player.on('timeupdate', seconds => {})
	}
}
</script>
