<template>
	<button
		class="films-item"
		:class="{ 'is-playing': isPlaying }"
		@click.stop="onItemClick"
	>
		<div class="films-item__poster">
			<img :src="parsedPosterUrlThumb" alt="lorem" />
		</div>
		<p>{{ filmName }}</p>
	</button>
</template>

<script>
import ContentTypes from '~/model/content-types'

import { vuex, mapActions, mapState } from 'vuex'
import { ASSISTANT_MODE, ASSISTANT_TEXT, OPEN_CONTENT } from '~/model/constants'

import getCloudinaryUrl from '~/utils/get-cloudinary-url'
import AssistantModes from '~/model/assistant-modes'

export default {
	name: 'films-item',
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
		cloudinaryUrl: {
			type: String,
			required: true
		}
	},
	data() {
		return {
			isPlaying: false
		}
	},
	computed: {
		parsedPosterUrlThumb() {
			return getCloudinaryUrl(
				this.$cloudinary,
				{ cloudinaryUrl: this.posterUrl, type: 'image', aspect: 'landscape' },
				{ width: 310, height: 204 }
			)
		},
		parsedPosterUrlVideo() {
			return getCloudinaryUrl(
				this.$cloudinary,
				{ cloudinaryUrl: this.posterUrl, type: 'image', aspect: 'landscape' },
				{ width: 608, height: 342 }
			)
		}
	},
	methods: {
		...mapActions([OPEN_CONTENT.action]),
		...mapActions('assistant', [ASSISTANT_TEXT.action, ASSISTANT_MODE.action]),
		onItemClick() {
			let type = ContentTypes.videoLandscape

			let videoContent = [
				{
					title: this.filmName,
					contentId: this.filmId,
					type: type,
					canOverride: false,
					windowProps: type.defaultWindowProps,
					contentComponentProps: {
						asset: {
							cloudinaryUrl: this.cloudinaryUrl,
							type: 'video',
							aspect: 'landscape'
						},
						videoAttributes: {
							poster: this.parsedPosterUrlVideo,
							preload: true,
							autoPlay: true,
							muted: false,
							controls: true
						}
					},
					statusComponentProps: type.defaultStatusComponentProps,
					assistant: {
						mode: AssistantModes.CUSTOM,
						text: {
							headline: 'A FILM YO!',
							bodyText: 'Pretty coool, right?'
						}
					}
				}
			]
			this[OPEN_CONTENT.action]({ windowContent: videoContent })
		}
	}
}
</script>
