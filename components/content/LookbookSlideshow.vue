<template>
	<transition name="fade">
		<div class="lookbook-slideshow">
			<div class="lookbook-slideshow__content">
				<transition name="fade">
					<div v-if="!overview" class="lookbook-slideshow__standard">
						<img
							v-if="activeContent.type === 'image'"
							v-lazy="
								getMediaUrl(activeContent.type, activeContent.cloudinaryUrl)
							"
							alt=""
						/>
						<video
							v-if="activeContent.type === 'video'"
							:src="
								getMediaUrl(activeContent.type, activeContent.cloudinaryUrl)
							"
							preload
							muted
							controls
						/>
					</div>
					<div v-else class="lookbook-slideshow__overview">
						<div
							v-for="(item, i) in content"
							:key="'jhfjsdf' + i"
							@click="show(i)"
						>
							<img
								v-if="item.type === 'image'"
								v-lazy="
									getMediaUrl(item.type, item.cloudinaryUrl, {
										thumbnail: true,
									})
								"
								alt=""
							/>
							<video
								v-if="item.type === 'video'"
								:src="
									getMediaUrl(item.type, item.cloudinaryUrl, {
										thumbnail: true,
									}).src
								"
								preload
								muted
								autoplay
							/>
						</div>
					</div>
				</transition>
			</div>

			<button
				class="lookbook-slideshow__button"
				@click="change({ next: false })"
			>
				<svg-icon style="transform: scaleX(-1)" name="arrow--right" />
			</button>

			<button
				class="lookbook-slideshow__button"
				@click="change({ next: true })"
			>
				<svg-icon name="arrow--right" />
			</button>

			<button class="lookbook-slideshow__button" @click="toggleLayout">
				<svg-icon v-if="!overview" name="grid" />
				<svg-icon v-else name="gallery" />
			</button>
		</div>
	</transition>
</template>

<script>
import { vuex, mapActions, mapState } from 'vuex'

import getCloudinaryUrl from '~/utils/get-cloudinary-url'
import WindowContent from '~/components/framework/WindowContent.vue'
import Loading from '~/components/content/Loading.vue'
import { nextIndex, prevIndex } from '~/utils/array-helpers'
import { greyPx } from '~/utils/grey-px'

export default {
	extends: WindowContent,
	components: { Loading },
	name: 'look-book',
	props: {
		contentId: { type: String, default: 'lookBook', required: true },
	},
	data: () => ({
		idx: 0,
		overview: false,
	}),
	computed: {
		...mapState('assets', ['intro']),
		// weird syntax to get state dynamically based on props.contentId
		content() {
			return this.intro
			// return this.$store.state.assets[this.contentId]
		},
		activeContent() {
			return this.content[this.idx]
		},
	},
	methods: {
		getMediaUrl(type, cloudinaryUrl, { thumbnail } = {}) {
			return {
				src: getCloudinaryUrl(
					this.$cloudinary,
					{ type, cloudinaryUrl },
					{ width: thumbnail ? 100 : 500 }
				),
				loading: greyPx,
			}
		},

		change({ next }) {
			this.idx = next
				? nextIndex(this.content, this.idx)
				: prevIndex(this.content, this.idx)
		},

		show(idx) {
			this.overview = false
			this.idx = idx
		},

		toggleLayout() {
			this.overview = !this.overview
		},
	},
}
</script>