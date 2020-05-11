<template>
	<section class="window window--tight window--music-player music-player">
		<header class="window__top">
			<h1 class="title">⚡️ Ganni FM</h1>
			<button class="button close" @click="closeHandler">Ｘ</button>
		</header>

		<main class="window__content">
			<div class="music-player__top">
				<p>Playing:</p>
				<div>
					<!-- print 5 times so it can be css-animated -->
					<p
						class="title-marquee"
					>{{songs[current].title}} — {{songs[current].title}} — {{songs[current].title}} — {{songs[current].title}} — {{songs[current].title}}</p>
				</div>
			</div>
			<div class="music-player__controls">
				<button class="button prev" @click="playlist(-1)">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440 440">
						<path
							d="M437 1c-3-1-6 0-10 4L225 207l-4 6V10c0-5-1-8-4-9-2-1-5 0-9 4L5 207c-3 4-5 8-5 13s2 9 5 13l203 203c4 3 7 5 9 3 3-1 4-4 4-9V228l4 5 202 203c4 3 7 5 10 3 2-1 3-4 3-9V10c0-5-1-8-3-9z"
						/>
					</svg>
				</button>
				<button class="button" @click="toggle">
					<svg v-if="playing" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 299 299">
						<path d="M192 0h85v299h-85zM21 0h85v299H21z" />
					</svg>
					<p v-else>►</p>
				</button>
				<button class="button next" @click="playlist(1)">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440 440">
						<path
							d="M437 1c-3-1-6 0-10 4L225 207l-4 6V10c0-5-1-8-4-9-2-1-5 0-9 4L5 207c-3 4-5 8-5 13s2 9 5 13l203 203c4 3 7 5 9 3 3-1 4-4 4-9V228l4 5 202 203c4 3 7 5 10 3 2-1 3-4 3-9V10c0-5-1-8-3-9z"
						/>
					</svg>
				</button>
			</div>
			<div class="music-player__canvas-container" ref="canvasContainer">
				<canvas ref="canvas" id="canvas"></canvas>
			</div>
		</main>

		<!-- display: none -->
		<audio ref="audio" controls :src="songs[current].src">
			Your browser does not support the
			<code>audio</code> element.
		</audio>
	</section>
</template>

<script>
import { mapActions } from 'vuex'
import { TOGGLE_MUSIC_PLAYER } from '~/model/constants'

export default {
	name: 'music-player',
	data() {
		return {
			audioContext: null,
			loaded: false,
			audio: null,
			playing: false,
			current: 0,
			songs: [
				{
					title: 'Dance Music Mix 2001 - Track 02 - Kylie Minogue.mp3',
					src: `/audio/Kylie-Minogue.mp3`
				},
				{
					title: 'Pete-Hellers-Big-Love-Big-Love.mp3',
					src: `/audio/Pete-Hellers-Big-Love-Big-Love.mp3`
				},
				{
					title: 'show_me_love.mp3',
					src: `/audio/Robin-S-Show-Me-Love.mp3`
				},
				{
					title: '(BETTER_QUALITY)_320kbps_Moloko-Sing-It-Back.mp3',
					src: `/audio/Moloko-Sing-It-Back.mp3`
				},
				{
					title: 'Track_06-Haddaway-What_is_love.mp3',
					src: `/audio/What-Is-Love.mp3`
				}
			]
		}
	},
	methods: {
		...mapActions([TOGGLE_MUSIC_PLAYER.action]),
		closeHandler() {
			this[TOGGLE_MUSIC_PLAYER.action]()
		},
		playlist(n) {
			const newCurrent = this.current + n
			this.current =
				newCurrent === this.songs.length // reach last
					? 0 // start over
					: newCurrent < 0 // reach first
					? this.songs.length - 1 // start from last
					: newCurrent
			this.playNewSong()
		},
		toggle() {
			if (!this.playing) {
				this.$refs.audio.play()
			} else this.$refs.audio.pause()
			this.playing = !this.audio.paused
		},
		playNewSong() {
			this.$refs.audio.pause()
			this.$refs.audio.currentTime = 0
			setTimeout(() => {
				if (this.playing) {
					this.$refs.audio.play()
				}
			}, 0)
		},
		visualize() {
			const canvasContainer = this.$refs.canvasContainer
			const canvas = this.$refs.canvas

			const analyser = this.audioContext.createAnalyser()
			const src = this.audioContext.createMediaElementSource(this.$refs.audio)
			const dpr = window.devicePixelRatio || 1
			canvas.width =
				parseInt(window.getComputedStyle(canvasContainer).width) * dpr
			canvas.height =
				parseInt(window.getComputedStyle(canvasContainer).height) * dpr
			const ctx = canvas.getContext('2d')
			ctx.translate(-0.5, -0.5)
			ctx.scale(dpr, dpr)

			src.connect(analyser)
			analyser.connect(this.audioContext.destination)
			analyser.fftSize = 256

			const bufferLength = analyser.frequencyBinCount
			const dataArray = new Uint8Array(bufferLength)

			const WIDTH = canvas.width / dpr
			const HEIGHT = canvas.height / dpr
			const BG_COLOR = window.getComputedStyle(canvasContainer).backgroundColor

			const barWidth = WIDTH / bufferLength + 3
			let barHeight
			let x = 0

			const renderFrame = () => {
				requestAnimationFrame(renderFrame)

				x = 0

				analyser.getByteFrequencyData(dataArray)

				ctx.fillStyle = BG_COLOR
				ctx.fillRect(0, 0, WIDTH, HEIGHT)

				const grd = ctx.createLinearGradient(0, 0, 0, HEIGHT)
				grd.addColorStop(0, 'darksalmon')
				grd.addColorStop(0.5, 'peachpuff')
				grd.addColorStop(1, '#FBD5C5')

				for (let i = 0; i < bufferLength; i++) {
					barHeight = (dataArray[i] * HEIGHT) / 270

					ctx.fillStyle = grd
					ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight)

					x += barWidth + 1
				}
			}

			renderFrame()
		},
		setLoadedState() {
			this.loaded = true
			this.$refs.audio.addEventListener('play', this.init.bind(this), {
				once: true
			})
		},
		init() {
			const AudioContext = window.AudioContext || window.webkitAudioContext
			this.audioContext = new AudioContext()
			this.visualize()
			this.$refs.audio.volume = 1
		}
	},
	mounted() {
		this.audio = this.$refs.audio
		this.$refs.audio.addEventListener(
			'canplaythrough',
			this.setLoadedState.bind(this),
			{ once: true }
		)
	}
}
</script>
