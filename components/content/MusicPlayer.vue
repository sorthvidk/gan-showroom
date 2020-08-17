<template>
	<main class="window__content" :class="{ slim: musicPlayerSlim }">
		<div class="music-player__top">
			<button v-if="musicPlayerSlim" class="button" @click="toggle">
				<svg v-if="musicPlaying" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
					<path d="M11 9h3v12h-3zM16 9h3v12h-3z" />
				</svg>
				<svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
					<path d="M21.2 15.1l-10.1 6.1V9l10.1 6.1z" />
				</svg>
			</button>
			<p>Playing:</p>
			<div :key="songs[current].title">
				<!-- print 5 times so it can be css-animated -->
				<p class="title-marquee">{{songs[current].title}} —&nbsp;</p>
				<p class="title-marquee">{{songs[current].title}} —&nbsp;</p>
				<p class="title-marquee">{{songs[current].title}} —&nbsp;</p>
				<p class="title-marquee">{{songs[current].title}} —&nbsp;</p>
				<p class="title-marquee">{{songs[current].title}} —&nbsp;</p>
			</div>
		</div>
		<div class="music-player__controls" v-if="!musicPlayerSlim">
			<button class="button prev" @click="playlist(-1)">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
					<path d="M15.1 9L9 15.1l6.1 6.1v-5.1l5.1 5.1V9l-5.1 5.1V9z" />
				</svg>
			</button>
			<button class="button" @click="toggle">
				<svg v-if="musicPlaying" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
					<path d="M11 9h3v12h-3zM16 9h3v12h-3z" />
				</svg>
				<svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
					<path d="M21.2 15.1l-10.1 6.1V9l10.1 6.1z" />
				</svg>
			</button>
			<button class="button next" @click="playlist(1)">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
					<path d="M15.1 21.2l6.1-6.1L15.1 9v5.1L10 9v12.2l5.1-5.1v5.1z" />
				</svg>
			</button>
		</div>
		<div class="music-player__canvas-container" ref="canvasContainer" v-if="!musicPlayerSlim">
			<canvas ref="canvas" id="canvas"></canvas>
		</div>
	</main>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { MUSIC_PLAY_PAUSE } from '~/model/constants'
import WindowContent from '~/components/framework/WindowContent.vue'

export default {
	extends: WindowContent,
	name: 'music-player',
	data() {
		return {
			// related to canvas and animation
			// placed here to be 'globally' available
			audioContext: null,
			analyser: null,
			dataArray: null,
			ctx: null,
			barWidth: null,
			BG_COLOR: null,
			WIDTH: null,
			HEIGHT: null,

			audio: null,
			loaded: false,
			current: 0
		}
	},
	computed: mapState([
		'keyPressed',
		'musicPlaying',
		'songs',
		'appTabUnfocused',
		'topMostWindow',
		'musicPlayerSlim'
	]),
	watch: {
		keyPressed(event) {
			// only respond to keys when is focus
			if (this.$parent.$parent.windowId !== this.topMostWindow.windowId) return

			if (event.key === 'ArrowLeft') {
				this.playlist(-1)
			} else if (event.key === 'ArrowRight') {
				this.playlist(1)
			} else if (event.code === 'Space') {
				if (this.musicPlaying) this[MUSIC_PLAY_PAUSE.action](false)
				else this[MUSIC_PLAY_PAUSE.action](true)
			}
		},
		musicPlaying(playing) {
			if (this.musicPlaying) {
				this.audio.play().catch(err => console.warn(err))
				this.animate()
			} else {
				this.audio.pause()
			}
		},
		appTabUnfocused(appTabUnfocused) {
			if (appTabUnfocused) {
				this.audio.volume = 0
			} else {
				this.fadeIn()
			}
		}
	},
	methods: {
		...mapActions([MUSIC_PLAY_PAUSE.action]),
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
			this[MUSIC_PLAY_PAUSE.action](!this.musicPlaying)
		},
		playNewSong() {
			this.audio.pause()
			this.audio.src = this.songs[this.current].src
			this.audio.currentTime = 0
			setTimeout(() => {
				if (this.musicPlaying) {
					this.audio.play().catch(err => console.warn(err))
					this.fadeIn()
				}
			}, 100)
		},
		setupCanvas() {
			const canvasContainer = this.$refs.canvasContainer
			const canvas = this.$refs.canvas

			// setup / style canvas
			const dpr = window.devicePixelRatio || 1
			canvas.width =
				parseInt(window.getComputedStyle(canvasContainer).width) * dpr
			canvas.height =
				parseInt(window.getComputedStyle(canvasContainer).height) * dpr
			this.ctx = canvas.getContext('2d')
			this.ctx.translate(-0.5, -0.5)
			this.ctx.scale(dpr, dpr)

			// setup audio context
			this.analyser = this.audioContext.createAnalyser()
			var buffer = this.audioContext.createBuffer(1, 1, 22050)
			var source = this.audioContext.createBufferSource()

			const src = this.audioContext.createMediaElementSource(this.audio)
			src.buffer = buffer
			src.connect(this.analyser)
			this.analyser.connect(this.audioContext.destination)
			this.analyser.fftSize = 256
			const bufferLength = this.analyser.frequencyBinCount
			this.dataArray = new Uint8Array(bufferLength)

			this.WIDTH = canvas.width / dpr
			this.HEIGHT = canvas.height / dpr
			this.BG_COLOR = window.getComputedStyle(canvasContainer).backgroundColor

			this.barWidth = this.WIDTH / bufferLength + 3
		},
		/**
		 * https://www.mattmontag.com/web/unlock-web-audio-in-safari-for-ios-and-macos
		 */
		unlockAudioContext(audioCtx) {
			if (audioCtx.state !== 'suspended') return
			const b = document.body
			const events = ['touchstart', 'touchend', 'mousedown', 'keydown']
			events.forEach(e => b.addEventListener(e, unlock, false))
			function unlock() {
				audioCtx.resume().then(clean)
			}
			function clean() {
				events.forEach(e => b.removeEventListener(e, unlock))
			}
		},
		setLoadedState() {
			this.loaded = true
			const AudioContext = window.AudioContext || window.webkitAudioContext
			this.audioContext = new AudioContext()
			this.unlockAudioContext(this.audioContext) // fixes no-sound in safari

			// run first time audio gets played
			this.audio.addEventListener('play', this.setupCanvas.bind(this), {
				once: true
			})
		},
		animate() {
			const renderFrame = () => {
				// stop animation when no music and all the frequencies are at 0,
				// creates smooth ending of animation
				if (!this.musicPlaying && this.dataArray.every(v => v === 0)) return

				requestAnimationFrame(renderFrame)

				// be sure everything is hooked up and referencable
				if (!this.analyser || !this.ctx || !this.dataArray) return

				this.analyser.getByteFrequencyData(this.dataArray)

				// clear canvas
				this.ctx.fillStyle = this.BG_COLOR
				this.ctx.fillRect(0, 0, this.WIDTH, this.HEIGHT)

				const grd = this.ctx.createLinearGradient(0, 0, 0, this.HEIGHT)
				grd.addColorStop(0, 'darksalmon')
				grd.addColorStop(0.5, 'peachpuff')
				grd.addColorStop(1, '#FBD5C5')

				// print bars in corrent height
				this.dataArray.forEach((freq, i) => {
					const barHeight = (freq * this.HEIGHT) / 270
					const x = (this.barWidth + 1) * i

					this.ctx.fillStyle = grd
					this.ctx.fillRect(
						x,
						this.HEIGHT - barHeight,
						this.barWidth,
						barHeight
					)
				})
			}
			renderFrame()
		},
		fadeIn() {
			let volume = 0
			const loop = () => {
				this.audio.volume = volume
				volume += 0.01
				if (volume <= 0.5) {
					requestAnimationFrame(loop)
				}
			}
			loop()
		}
	},
	mounted() {
		this.audio = new Audio(this.songs[0].src)
		this.audio.volume = 0.5
		this.audio.addEventListener(
			'canplaythrough',
			this.setLoadedState.bind(this),
			{ once: true }
		)
		this.audio.addEventListener('ended', this.playlist.bind(this, 1))
	},
	beforeDestroy() {
		this.audio.pause()
		this[MUSIC_PLAY_PAUSE.action](false)
	}
}
</script>
