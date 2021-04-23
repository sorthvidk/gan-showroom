<template>
	<div class="login-input">
		<form
			ref="form"
			@submit.prevent="loginInput"
			class="form"
			:style="{ opacity: !showMessage && !pwd ? '1' : '0' }"
		>
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
				v-model="pwd"
				ref="passwordInput"
			/>
			<!-- <button
				:class="{
					'is-active': pwd.length > 0,
					'is-invalid': showErrorMessage,
				}"
				class="submit"
				@click.prevent="submitClickHandler"
			>
				{{ showErrorMessage ? 'Wrong password' : 'Enter' }}
			</button> -->
		</form>

		<div
			class="login-input__message"
			v-show="showMessage && !pwd"
			:style="{
				position: 'absolute',
				top: '50%',
				left: '50%',
				transform: 'translate(-50%, -50%)',
				width: '100%',
			}"
		>
			<p>Please type password</p>
		</div>

		<div
			class="login-input__canvas"
			:style="{
				position: 'absolute',
				top: '50%',
				left: '50%',
				transform: 'translate(-50%, -50%)',
				width: '100%',
				zIndex: '-1',
			}"
		>
			<login-asterixes
				:key="pwd.length"
				:amount="pwd.length"
				:start="valid ? true : false"
			/>
		</div>

		<!-- <div class="error-message" v-if="showErrorMessage">
			<p>Wrong password</p>
		</div> -->
	</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { LOGIN } from '~/model/constants'
import hash from 'hash.js'
import FullpageSlideShow from '~/components/content/FullpageSlideShow.vue'
import LoginAsterixes from '~/components/content/LoginAsterixes.vue'

export default {
	name: 'login',
	components: {
		FullpageSlideShow,
		LoginAsterixes,
	},
	data() {
		return {
			pwd: '',
			valid: true,
			isFocus: false,
			showErrorMessage: false,
			showMessage: false,
		}
	},
	computed: {
		...mapState('user', ['loggedIn', 'passwords', 'cookiesAccepted']),
	},
	methods: {
		...mapActions('user', [LOGIN.action]),

		updateValidState() {
			const passwordUsed = hash.sha256().update(this.pwd).digest('hex')

			const authorized = this.passwords.find(
				(pw) => pw.hash.toLowerCase() === passwordUsed.toLowerCase()
			)

			setTimeout(() => {
				this[LOGIN.action](authorized)
			}, 5000)

			this.valid = authorized
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
		},

		initMessage() {
			setTimeout(() => {
				this.showMessage = !this.showMessage
				this.initMessage()
			}, 4000)
		},
	},
	mounted() {
		this.$refs.passwordInput.focus()

		this.initMessage()
		document.body.addEventListener('click', () =>
			this.$refs.passwordInput.focus()
		)
	},
}
</script>