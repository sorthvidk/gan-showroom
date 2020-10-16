<template>
	<div class="login-input">
		<fullpage-slide-show />

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
				:class="{ 'is-active': pwd.length > 0, 'is-invalid': showErrorMessage }"
				class="submit"
				@click.prevent="submitClickHandler"
			>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
					<path d="M12.7 21.9l-.7-.8 6.1-6.1L12 8.9l.7-.7 6.8 6.8z" />
				</svg>
			</button>
		</form>

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