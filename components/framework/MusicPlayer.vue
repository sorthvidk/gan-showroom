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
					<svg v-if="isPlaying" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 299 299">
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
	</section>
</template>

<script>
import { mapActions,mapState } from 'vuex'
import { 
	TOGGLE_MUSIC_PLAYER, 
	MUSIC_PLAY_PAUSE 
} from '~/model/constants'

export default {
	name: 'music-player',
	props: {
		/**
		 * [{ title: 'Name of Song', src: 'path/to/song.mp3' }]
		 */
		songs: {
			type: Array,
			default: () => [],
			required: true
		}
	},
	data() {
		return {
			audioContext: null,
			audio: null,
			loaded: false,
			current: 0,
			audioPlaying: false
		}
	},
	watch: {
		isPlaying(playing) {
			this.audioPlaying = playing

			console.log("audioPlaying",this.audioPlaying)

			if (!this.audioPlaying) {
				this.audio.play().catch(err => console.warn(err))
			} else {
				this.audio.pause()
			}
		}
	},
	computed: {
		...mapState({
			isPlaying: state => state.musicPlaying
		})
	},
	methods: {
		...mapActions([
			TOGGLE_MUSIC_PLAYER.action,
			MUSIC_PLAY_PAUSE.action 
		]),
		closeHandler() {
			this[TOGGLE_MUSIC_PLAYER.action](!this.audioPlaying)
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
			this[MUSIC_PLAY_PAUSE.action](!this.isPlaying);
		},
		playNewSong() {
			this.audio.pause()
			this.audio.src = this.songs[this.current].src
			this.audio.currentTime = 0
			setTimeout(() => {
				if (this.isPlaying) {
					this.audio.play().catch(err => console.warn(err))
				}
			}, 100)
		},
		visualize() {
			const canvasContainer = this.$refs.canvasContainer
			const canvas = this.$refs.canvas

			// setup / style canvas
			const dpr = window.devicePixelRatio || 1
			canvas.width =
				parseInt(window.getComputedStyle(canvasContainer).width) * dpr
			canvas.height =
				parseInt(window.getComputedStyle(canvasContainer).height) * dpr
			const ctx = canvas.getContext('2d')
			ctx.translate(-0.5, -0.5)
			ctx.scale(dpr, dpr)

			// setup audio context
			const analyser = this.audioContext.createAnalyser()
			var buffer = this.audioContext.createBuffer(1, 1, 22050)
			var source = this.audioContext.createBufferSource()

			const src = this.audioContext.createMediaElementSource(this.audio)
			src.buffer = buffer
			src.connect(analyser)
			analyser.connect(this.audioContext.destination)
			analyser.fftSize = 256
			const bufferLength = analyser.frequencyBinCount
			const dataArray = new Uint8Array(bufferLength)

			if (src.start) {
				src.start(0)
			} else if (src.play) {
				src.play(0)
			} else if (src.noteOn) {
				src.noteOn(0)
			}

			const WIDTH = canvas.width / dpr
			const HEIGHT = canvas.height / dpr
			const BG_COLOR = window.getComputedStyle(canvasContainer).backgroundColor

			const barWidth = WIDTH / bufferLength + 3

			const renderFrame = () => {
				if ( !this.isPlaying ) return false;
				
				requestAnimationFrame(renderFrame)
				console.log("anim")
				analyser.getByteFrequencyData(dataArray)

				ctx.fillStyle = BG_COLOR
				ctx.fillRect(0, 0, WIDTH, HEIGHT)

				const grd = ctx.createLinearGradient(0, 0, 0, HEIGHT)
				grd.addColorStop(0, 'darksalmon')
				grd.addColorStop(0.5, 'peachpuff')
				grd.addColorStop(1, '#FBD5C5')

				dataArray.forEach((freq, i) => {
					const barHeight = (freq * HEIGHT) / 270
					const x = (barWidth + 1) * i

					ctx.fillStyle = grd
					ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight)
				})
			}

			renderFrame()
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
			console.log("music-player setLoadedState")
			this.loaded = true
			const AudioContext = window.AudioContext || window.webkitAudioContext
			this.audioContext = new AudioContext()
			this.unlockAudioContext(this.audioContext) // fixes no-sound in safari
			this.init()
		},
		init() {
			console.log('music-player init')
			this.visualize()
			// this.audio.volume = 1
			// this.audio.pause()
			this.audio.play().catch(console.warn)
		}
	},
	mounted() {
		this.audio = new Audio(this.songs[0].src);
		this.audio.addEventListener( 'canplaythrough', this.setLoadedState.bind(this), { once: true } )
	},
	beforeDestroy() {
		this[MUSIC_PLAY_PAUSE.action](false);
	}
};
</script>
