<template>
	<div class="higher-love-sidebar">
		<button @click.prevent="slidePrev" class="higher-love-sidebar__nav">
			Go up
		</button>
		<hooper
			:centerMode="true"
			ref="carousel"
			:itemsToShow="3"
			pagination="no"
			:vertical="true"
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
		<button @click.prevent="slidePrev" class="higher-love-sidebar__nav">
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
		},
		load() {
			// this.content.forEach((item, idx) => {
			// 	const { id } = getVideoId(item.youtube)
			// 	console.log(id)
			// 	const player = new YTPlayer(`#ytplayer-${idx}`, {
			// 		controls: false,
			// 		modestBranding: true,
			// 		related: false
			// 	})
			// 	player.load(id)
			// 	player.setVolume(100)
			// 	player.on('playing', () => {
			// 		console.log(player.getDuration()) // => 351.521
			// 	})
			// })
		}
	},
	mounted() {
		this.load()
	}
}
</script>
