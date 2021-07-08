<template>
	<div class="higher-love-sidebar">
		<button @click.prevent="slidePrev" class="higher-love-sidebar__nav">
			Go up
		</button>
		<hooper
			:key="isMobile"
			:centerMode="true"
			ref="carousel"
			:itemsToShow="isMobile ? 2 : 3"
			pagination="no"
			:vertical="!isMobile"
			:infiniteScroll="true"
		>
			<slide v-for="(item, idx) in content" :key="item.createdAt" :index="idx">
				<button class="higher-love-sidebar__item" @click="emitPlay(item)">
					<img
						:src="
							`https://img.youtube.com/vi/${
								getVideoId(item.youtube).id
							}/hqdefault.jpg`
						"
						:alt="`The thumbnail for ${item.title}`"
					/>
					<div class="higher-love-sidebar__ui">
						<p class="higher-love-sidebar__title">
							<span>{{ item.title }}</span>
						</p>
						<p class="higher-love-sidebar__click-to-play">Click to play</p>
					</div>
				</button>
			</slide>
		</hooper>
		<button @click.prevent="slideNext" class="higher-love-sidebar__nav">
			Go down
		</button>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import getVideoId from 'get-video-id'
import { Hooper, Slide } from 'hooper'
import 'hooper/dist/hooper.css'

export default {
	name: 'higher-love-sidebar',
	components: {
		Hooper,
		Slide
	},
	data: () => ({
		players: [],
		getVideoId
	}),
	computed: {
		...mapState('utils', ['isMobile']),
		...mapState('higher-love', ['content'])
	},
	methods: {
		emitPlay(youtubeUrl) {
			this.$emit('play', youtubeUrl)
		},
		slidePrev() {
			this.$refs.carousel.slidePrev()
		},
		slideNext() {
			this.$refs.carousel.slideNext()
		}
	}
}
</script>
