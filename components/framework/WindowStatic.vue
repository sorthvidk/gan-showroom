<template>
	<!-- <div class="window__static"> -->
	<!-- <div v-if="content.statusComponent" class="window__static__status">
			<component
				:is="content.statusComponent"
				v-bind="content.statusComponentProps"
			/>
		</div> -->

	<!-- <div v-bar class="window__content" ref="scroller"> -->
	<div class="window__content">
		<component
			:is="content.contentComponent"
			:parent-window-id="content.windowId"
			v-bind="{
				...content.contentComponentProps,
				contentId: content.contentId,
			}"
			ref="contentComponent"
		/>
		<!-- </div> -->
	</div>
	<!-- </div> -->
</template>

<script>
import { vuex, mapActions, mapState } from 'vuex'

import Exhibition from '~/components/content/Exhibition.vue'
import MusicPlayer from '~/components/content/MusicPlayer.vue'
import Collection from '~/components/content/Collection.vue'
import SingleImage from '~/components/content/SingleImage.vue'
import SingleVideo from '~/components/content/SingleVideo.vue'
import TextReader from '~/components/content/TextReader.vue'
import Films from '~/components/content/Films.vue'
import Gallery from '~/components/content/Gallery.vue'
import WishList from '~/components/content/WishList.vue'
import HampsterDance from '~/components/content/HampsterDance.vue'
import GanniGirls from '~/components/content/GanniGirls.vue'
import LookBook from '~/components/content/LookBook.vue'
import LookbookSlideshow from '~/components/content/LookbookSlideshow.vue'
import Collage from '~/components/content/Collage.vue'
import Puzzle from '~/components/content/Puzzle.vue'
import DownloadModal from '~/components/content/DownloadModal.vue'
import VideoPlayer from '~/components/content/VideoPlayer.vue'
import AudioGalleryController from '~/components/content/AudioGalleryController.vue'

import StatusStatic from '~/components/content/StatusStatic.vue'
import StatusCollection from '~/components/content/StatusCollection.vue'
import StatusWishList from '~/components/content/StatusWishList.vue'

import GreenRoom from '~/components/content/GreenRoom.vue'
import Afterparty from '~/components/content/Afterparty.vue'
import PartyAnimal from '~/components/content/PartyAnimal.vue'

import VueBar from '~/components/content/VueBar.vue'

export default {
	name: 'window',
	components: {
		Exhibition,
		StatusStatic,
		StatusCollection,
		StatusWishList,
		Collection,
		SingleImage,
		SingleVideo,
		TextReader,
		Films,
		Gallery,
		WishList,
		MusicPlayer,
		HampsterDance,
		GanniGirls,
		LookBook,
		Collage,
		Puzzle,
		DownloadModal,
		VueBar,
		LookbookSlideshow,
		VideoPlayer,
		AudioGalleryController,
		GreenRoom,
		Afterparty,
		PartyAnimal,
	},
	props: {
		content: {
			type: Object,
			default: () => ({}),
		},
	},
	computed: {
		...mapState('collection', ['currentStyles', 'wishList']),

		concatClassName() {
			let cn = 'window'
			if (this.modifierClass != '') cn += ' ' + this.modifierClass
			if (!this.statusComponent) cn += ' window--no-status'

			return cn
		},
	},

	data: () => ({}),

	methods: {
		...mapActions([]),
	},
	mounted() {
		// console.log(this.content)
	},
}
</script>
