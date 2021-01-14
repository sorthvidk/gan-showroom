<template>
	<transition name="fade">
		<div class="lookbook-slideshow">
			<!-- <pre>{{ pages.map((x) => x.map((y) => y.aspect)) }}</pre> -->
			<div class="lookbook-slideshow__content">
				<transition name="fade">
					<div v-if="!overview" class="lookbook-slideshow__standard">
						<div v-for="(activeContent, i) in activePage" :key="`asgaf${i}`">
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
										.src
								"
								:poster="transparentPixel"
								preload
								autoplay
								loop
							/>
						</div>
					</div>
				</transition>
				<transition name="fade">
					<div v-if="overview" class="lookbook-slideshow__overview">
						<div
							v-for="(item, i) in content"
							:key="'jhfjsdf' + i"
							@click="show(item)"
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
								:poster="transparentPixel"
								preload
								muted
								autoplay
							/>
						</div>
					</div>
				</transition>
			</div>

			<div class="lookbook-slideshow__ui">
				<button
					class="lookbook-slideshow__button"
					@click="change({ next: false })"
				>
					<svg-icon name="arrow--left" />
				</button>

				<p class="lookbook-slideshow__current">
					{{ idx + 1 }} / {{ pages.length }}
				</p>

				<button
					class="lookbook-slideshow__button"
					@click="change({ next: true })"
				>
					<svg-icon name="arrow--left" style="transform: scaleX(-1)" />
				</button>

				<button class="lookbook-slideshow__button" @click="toggleLayout">
					View all
				</button>
			</div>
		</div>
	</transition>
</template>

<script>
import { vuex, mapActions, mapState } from 'vuex'

import getCloudinaryUrl from '~/utils/get-cloudinary-url'
import WindowContent from '~/components/framework/WindowContent.vue'
import Loading from '~/components/content/Loading.vue'
import { nextIndex, prevIndex } from '~/utils/array-helpers'
import { transparentPixel } from '~/utils/placeholders'
import { DASHBOARD_DARK } from '~/model/constants'

export default {
	extends: WindowContent,
	components: { Loading },
	name: 'lookbook-slideshow',
	props: {
		contentId: { type: String, default: 'lookBook', required: true },
	},
	data: () => ({
		idx: 0,
		overview: false,
		transparentPixel,
	}),
	computed: {
		...mapState('assets', ['intro', 'lookBook']),
		// weird syntax to get state dynamically based on props.contentId
		content() {
			return this.lookBook
			// return this.$store.state.assets[this.contentId]
		},
		activePage() {
			return this.pages[this.idx]
		},
		pages() {
			if (!this.content.every((x) => x.aspect)) {
				console.log(
					`LookbookSlideshow:
						Every item should have an "aspect" key.
						Fallbacks to showing 1 item/slide
					`
				)

				return this.content.map((x) => [x])
			}

			return this.content
				.reduce((acc, cur) => {
					if (cur.aspect === 'portrait') {
						if (!acc[acc.length - 1] || acc[acc.length - 1].length > 1) {
							acc.push([])
						}

						acc[acc.length - 1].push(cur)
					} else {
						acc.push([cur, 'empty'])
					}

					return acc
				}, [])
				.map((x) => x.filter((y) => y !== 'empty'))
		},
	},
	methods: {
		...mapActions('utils', [DASHBOARD_DARK.action]),
		getMediaUrl(type, cloudinaryUrl, { thumbnail } = {}) {
			return {
				src: getCloudinaryUrl(
					this.$cloudinary,
					{ type, cloudinaryUrl },
					{ width: thumbnail ? 100 : 500 }
				),
				loading: transparentPixel,
			}
		},

		change({ next }) {
			this.idx = next
				? nextIndex(this.pages, this.idx)
				: prevIndex(this.pages, this.idx)
		},

		show(item) {
			this.overview = false
			this.idx = this.pages.findIndex((i) =>
				i.find((x) => x.cloudinaryUrl === item.cloudinaryUrl)
			)
		},

		toggleLayout() {
			this.overview = !this.overview
		},
	},

	mounted() {
		this[DASHBOARD_DARK.action](true)
	},

	beforeDestroy() {
		this[DASHBOARD_DARK.action](false)
	},
}
</script>