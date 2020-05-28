<template>
	<div class="login-input" v-lazy:background-image="backgroundImageObj">
		<form ref="form" @submit.prevent="loginInput" class="form">
			<input
				:class="{'is-invalid': showErrorMessage}"
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
			<button :class="{'is-active': pwd.length > 0, 'is-invalid': showErrorMessage}" class="submit" @click.prevent="submitClickHandler">↪</button>
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

export default {
	name: 'login',
	data() {
		return {
			pwd: '',
			valid: true,
			isFocus: false,
			showErrorMessage: false,
			backgroundImageObj: {
				src: '/img/login-bg.jpg',
				loading: '/img/350x150.png'
			}
		}
	},
	computed: mapState(['loggedin', 'password']),
	methods: {
		...mapActions([LOGIN.action]),

		updateValidState() {
			const valid =
				hash
					.sha256()
					.update(this.pwd)
					.digest('hex') === this.password

			this[LOGIN.action](valid)
			this.valid = valid
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
			if (this.loggedin) return
			this.valid = true

			if (!this.pwd) {
				this.isFocus = false
			}
		},

		playSound() {
			const audio = new Audio('/audio/ganni_boot.mp3')
			audio.addEventListener('loadeddata', () => {audio.volume=0.4;audio.play();})
		}
	}
}
</script>