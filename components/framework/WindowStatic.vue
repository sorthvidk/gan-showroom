<template>
	<div class="window__static">
		<header class="window__top">
			<span class="title"
				>{{ title }}&nbsp;
				<p v-if="contentComponent === 'collection'">
					({{ currentStyles.length }})
				</p>
				<p v-if="contentComponent === 'wish-list'">({{ wishList.length }})</p>
			</span>
			<button
				:style="{
					lineHeight: 0,
					fontSize: '20px',
					fontWeight: 'normal',
					marginTop: '-0.2em',
				}"
				class="button close"
				@click.stop="closeHandler"
			>
				&times;
			</button>
		</header>
		<div
			v-if="statusComponent"
			class="window__status"
			@click="contentActivateHandler"
		>
			<component :is="statusComponent" v-bind="statusComponentProps" />
		</div>

		<!-- <hr v-if="statusComponent" /> -->

		<div v-bar class="window__content" @click="contentActivateHandler">
			<component
				:is="contentComponent"
				:parent-window-id="windowId"
				v-bind="{ ...contentComponentProps, contentId }"
				ref="contentComponent"
			/>
		</div>
	</div>
</template>

<script>
import { vuex, mapActions, mapState } from 'vuex'
import { TOPMOST_WINDOW, CLOSE_WINDOW, UPDATE_WINDOW } from '~/model/constants'

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
import Collage from '~/components/content/Collage.vue'
import Puzzle from '~/components/content/Puzzle.vue'
import DownloadModal from '~/components/content/DownloadModal.vue'

import StatusStatic from '~/components/content/StatusStatic.vue'
import StatusCollection from '~/components/content/StatusCollection.vue'
import StatusWishList from '~/components/content/StatusWishList.vue'

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
	},
	props: {
		modifierClass: {
			type: String,
			default: '',
		},
		wrapperClass: {
			type: String,
			default: '',
		},
		contentType: {
			type: Object,
			required: true,
		},
		contentName: {
			type: String,
			required: true,
		},
		canResize: {
			type: Boolean,
			default: true,
		},
		canReorder: {
			type: Boolean,
			default: true,
		},

		contentComponent: {
			type: String,
			default: null,
		},
		contentComponentProps: {
			type: Object,
			default: null,
		},

		// noStatus: {
		// 	type: Boolean,
		// 	default: false
		// },
		statusComponent: {
			type: String,
			default: null,
			required: false,
		},
		statusComponentProps: {
			type: Object,
			default: null,
		},

		customAssistantText: {
			type: Object,
		},

		title: {
			type: String,
		},
		positionX: {
			type: Number,
		},
		positionY: {
			type: Number,
		},
		positionZ: {
			type: Number,
		},
		sizeW: {
			type: Number,
		},
		sizeH: {
			type: Number,
		},
		contentId: {
			type: String,
		},
		windowId: {
			type: String,
		},
		groupId: {
			type: String,
		},
		nthChild: {
			type: Number,
		},
	},
	computed: {
		...mapState('puzzle', ['puzzle']),
		...mapState('collection', ['currentStyles', 'wishList']),

		concatClassName() {
			let cn = 'window'
			if (this.modifierClass != '') cn += ' ' + this.modifierClass
			if (!this.statusComponent) cn += ' window--no-status'

			return cn
		},
	},
	data: () => ({
		resetPositionDistance: 40,
		maximizeOffset: 0,
		maximizeTimeoutHandle: -1,
		maximizeClicked: false,
		isMaximized: false,

		transformOrigin: 0,
	}),
	methods: {
		...mapActions([
			TOPMOST_WINDOW.action,
			CLOSE_WINDOW.action,
			UPDATE_WINDOW.action,
		]),
		closeHandler(e) {
			this[CLOSE_WINDOW.action]({
				windowId: this.windowId,
				contentId: this.contentId,
			})
		},
		contentActivateHandler(e) {
			if (this.canReorder) {
				this[TOPMOST_WINDOW.action](this.windowId)
			}
		},
	},
	mounted() {},
}
</script>
