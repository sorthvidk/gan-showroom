<template>
	<div class="login">
		<background-image />

		<h1>
			Ganni<br />love<br />
			for&shy;ever<br />
			fall<br />winter<br />2021
		</h1>

		<div class="login__form">
			<login-input />
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import LoginSlide from '~/components/content/LoginSlide.vue'
import LoginInput from '~/components/content/LoginInput.vue'
import BackgroundImage from '../content/BackgroundImage.vue'

export default {
	name: 'login',
	components: {
		LoginInput,
		BackgroundImage,
	},
	data() {
		return {
			// current: 0,
			// timeout: null,
			// slideDuration: 100000000000,
		}
	},
	computed: {
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