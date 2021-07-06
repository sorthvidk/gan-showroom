<template>
	<div class="higher-love">
		<div class="higher-love__background">
			<transition name="fade--fast">
				<img
					v-if="activeItem"
					v-lazy="assetUrl(activeItem.background)"
					:key="activeItem.title"
				/>
			</transition>
		</div>
		<higher-love-video v-if="activeItem" :item="activeItem" />
		<higher-love-sidebar @play="startPlayback" />
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { ASSISTANT_MODE, ASSISTANT_TEXT } from '~/model/constants'
import AssistantModes from '~/model/assistant-modes'
import HigherLoveSidebar from '~/components/content/HigherLoveSidebar.vue'
import HigherLoveVideo from '~/components/content/HigherLoveVideo.vue'
import getCloudinaryUrl from '~/utils/get-cloudinary-url'

export default {
	name: 'higher-love-tv-page',
	components: { HigherLoveSidebar, HigherLoveVideo },
	data: () => ({
		activeItem: null
	}),
	computed: {
		...mapState('higher-love', ['content'])
	},
	methods: {
		...mapActions('assistant', [ASSISTANT_MODE.action, ASSISTANT_TEXT.action]),
		startPlayback(item) {
			this.activeItem = item
		},
		assetUrl(url) {
			return getCloudinaryUrl(
				this.$cloudinary,
				{ cloudinaryUrl: url, type: 'image' },
				{
					width: 1600
				}
			)
		}
	},
	mounted() {
		this[ASSISTANT_MODE.action](AssistantModes.CUSTOM)
		this[ASSISTANT_TEXT.action]('higher-love-tv')

		console.log(this.content)

		this.$nextTick(() => this.startPlayback(this.content[0]))
	}
}
</script>
