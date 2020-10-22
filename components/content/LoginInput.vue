<template>
	<div class="login-input">
		<fullpage-slide-show />

		<div class="moving">
			<div>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 553.9 144.9">
					<path
						d="M126.1 69.2H69.9V87h34.8c-.1 5.2-1 10.4-2.6 15.3-1.5 4.4-4 8.4-7.2 11.7-3.3 3.3-7.3 5.8-11.7 7.4-5.1 1.8-10.5 2.6-15.9 2.3-7.1 0-13.3-1.4-18.5-4.3-5.1-2.8-9.4-6.7-12.7-11.5-3.3-5-5.8-10.6-7.2-16.4-3.1-12.3-3.1-25.2 0-37.5 1.4-5.8 3.9-11.4 7.2-16.4 3.2-4.8 7.6-8.8 12.7-11.6 5.2-2.9 11.3-4.3 18.5-4.3 4.1 0 8.2.6 12.2 1.7 3.8 1.1 7.3 2.8 10.5 5.1 6.5 4.7 10.8 11.9 11.8 19.9h22.9c-.7-7-2.9-13.8-6.4-19.9-3.2-5.6-7.6-10.5-12.8-14.3-5.3-3.9-11.2-6.8-17.5-8.6-6.7-2-13.7-2.9-20.7-2.9-10 0-19 1.9-26.9 5.6-7.7 3.6-14.6 8.7-20.2 15.2-5.6 6.6-9.9 14.1-12.6 22.3-3 8.7-4.5 17.8-4.4 27C3 82.1 4.5 91.2 7.5 100c2.7 8.2 7 15.8 12.6 22.3 5.6 6.4 12.5 11.6 20.2 15.1 7.9 3.7 16.9 5.5 26.9 5.5 8.1 0 15.3-1.4 21.6-4.1s12.5-7.7 18.7-14.8l2.4 15.8h16.2V69.2zm137 70.6L211.5 5.9h-24.9l-51.4 133.9h24.2l12.6-35.4h53.4l12.6 35.4h25.1zm-43.9-53.3h-40.9l20.3-57.6h.6l20 57.6zm53.4 53.3h22.3V41.3h.6l60.9 98.5h24.8V5.9h-22.3v98.6h-.4L297.3 5.9h-24.8v133.9h.1zm127.7 0h22.3V41.3h.6l61 98.5H509V5.9h-22.3v98.6h-.4L425 5.9h-24.8v133.9h.1zm127.7 0h23.4V5.9H528v133.9z"
					/>
				</svg>
			</div>
			<form ref="form" @submit.prevent="loginInput" class="form">
				<h1>Introducing GANNI PF21 Collection</h1>
				<input
					:class="{ 'is-invalid': showErrorMessage }"
					@blur="isBlur"
					@focus="isFocus = true"
					@input="loginInput"
					autocomplete="new-password"
					class="form__input"
					id="password"
					name="password"
					type="password"
					placeholder="LOGIN"
					v-model="pwd"
					ref="passwordInput"
				/>
				<button
					:class="{
						'is-active': pwd.length > 0,
						'is-invalid': showErrorMessage
					}"
					class="submit"
					@click.prevent="submitClickHandler"
				>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
						<path d="M12.7 21.9l-.7-.8 6.1-6.1L12 8.9l.7-.7 6.8 6.8z" />
					</svg>
				</button>
			</form>
		</div>

		<div class="error-message" v-if="showErrorMessage">
			<p>Wrong password</p>
		</div>
	</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { LOGIN } from '~/model/constants'
import hash from 'hash.js'
import FullpageSlideShow from '~/components/content/FullpageSlideShow.vue'

export default {
	name: 'login',
	components: {
		FullpageSlideShow
	},
	data() {
		return {
			pwd: '',
			valid: true,
			isFocus: false,
			showErrorMessage: false,
			backgroundImageObj: {
				src: '/img/login-bg.jpg',
				loading: '/img/login-bg_lo.jpg'
			}
		}
	},
	computed: {
		...mapState('user', ['loggedIn', 'passwords'])
	},
	methods: {
		...mapActions('user', [LOGIN.action]),

		updateValidState() {
			const passwordUsed = hash
				.sha256()
				.update(this.pwd)
				.digest('hex')

			const authorized = this.passwords.find(
				pw => pw.hash.toLowerCase() === passwordUsed.toLowerCase()
			)

			this[LOGIN.action](authorized)
			this.valid = authorized

			if (authorized) {
				this.playSound()
			}
		},

		loginInput(e) {
			this.updateValidState()
			this.showErrorMessage = false
		},

		submitClickHandler() {
			this.updateValidState()
			if (!this.valid) this.showErrorMessage = true
		},

		isBlur(e) {
			if (this.loggedIn) return
			this.valid = true

			if (!this.pwd) {
				this.isFocus = false
			}
		},

		playSound() {
			const audio = new Audio('/audio/ganni_boot.mp3')
			audio.addEventListener('loadeddata', () => {
				audio.volume = 0.4
				audio.play()
			})
		}
	}
}
</script>