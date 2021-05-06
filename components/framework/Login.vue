<template>
	<div class="login">
		<!-- <background-image /> -->
		<!-- <client-only>
			<vimeo-player
				class="login__video"
				ref="player"
				v-if="various.vimeoUrl"
				:video-id="various.vimeoUrl"
				:autoplay="true"
				:loop="true"
				:controls="false"
				:options="{ muted }"
			/>
		</client-only> -->

		<!-- <button class="login__mute" @click="toggleMute">
			<svg-icon :name="muted ? 'muted' : 'audio-playing'" />
		</button> -->

		<!-- <h1>
			Ganni<br />love<br />
			for&shy;ever<br />
			fall<br />winter<br />2021
		</h1> -->

		<!-- <div v-if="!showInputField">
			<audio-visualizer @done="() => (showInputField = true)" />
		</div> -->

		<div class="login__form">
			<login-input />
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import LoginSlide from '~/components/content/LoginSlide.vue'
import LoginInput from '~/components/content/LoginInput.vue'
import AudioVisualizer from '~/components/content/AudioVisualizer.vue'
import BackgroundImage from '../content/BackgroundImage.vue'

export default {
	name: 'login',
	components: {
		LoginInput,
		BackgroundImage,
		AudioVisualizer,
	},
	data() {
		return {
			muted: true,
			showInputField: false,
			// current: 0,
			// timeout: null,
			// slideDuration: 100000000000,
		}
	},
	computed: {
		...mapState('utils', ['various']),
		...mapState('user', ['loggedIn']),
		content() {
			return [
				{
					type: 'one',
					// backgroundImageLow: '/img/login-slide_lo.jpg'
				},
			]
		},
	},
	methods: {
		toggleMute() {
			if (this.muted) {
				this.$refs.player.unmute()
			} else {
				this.$refs.player.mute()
			}
			this.muted = !this.muted
		},
		// dispatchNext(immediate = false) {
		// 	this.debounce(this.nextSlide, this.slideDuration, immediate)()
		// },
		// nextSlide() {
		// 	this.current = Math.min(this.content.length, this.current + 1) // cap at slide-amount + 1
		// 	this.dispatchNext()
		// },
		// debounce(func, wait, immediate) {
		// 	return () => {
		// 		var later = () => {
		// 			this.timeout = null
		// 			func.apply(this)
		// 		}
		// 		clearTimeout(this.timeout)
		// 		this.timeout = setTimeout(later, immediate ? 0 : wait)
		// 	}
		// },
	},
	// mounted() {
	// 	this.dispatchNext()
	// },
}
</script>