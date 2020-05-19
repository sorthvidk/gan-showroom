<template>
	<div class="login-input" :style="{ backgroundImage: 'url(/img/login-bg.jpg)' }">
		<form @submit.prevent="submit" class="form">
			<input
				:class="valid ? '' : 'invalid'"
				@blur="isBlur"
				@focus="isFocus = true"
				@input="valid = true"
				autocomplete="new-password"
				class="form__input"
				id="password"
				name="password"
				type="password"
				placeholder="LOGIN"
				v-model="pwd"
				ref="passwordInput"
			/>
		</form>
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
			isFocus: false
		}
	},
	computed: mapState(['loggedin', 'password']),
	methods: {
		...mapActions([LOGIN.action]),
		submit(e) {
			const input = e.currentTarget[0]
			const valid =
				hash
					.sha256()
					.update(this.pwd)
					.digest('hex') === this.password

			if (valid) {
				input.setCustomValidity('')
				document.body.classList.remove('is-fixed')
				this.playSound()
			} else {
				input.setCustomValidity('wrong password')
			}
			this[LOGIN.action](valid)
			this.valid = valid
		},
		isBlur(e) {
			if (this.loggedin) return
			const input = e.currentTarget
			input.setCustomValidity('')
			this.valid = true

			if (!this.pwd) {
				this.isFocus = false
			}
		},
		playSound() {
			const audio = new Audio('/audio/ganni_boot.mp3')
			audio.addEventListener('loadeddata', () => audio.play())
		}
	},
	mounted() {}
}
</script>