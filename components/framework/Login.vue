<template>
	<div class="login" @click="dispatchNext(true)">
		<component
			:key="current"
			v-bind:is="`slide${current}`"
			v-bind="content[current]"
		/>
	</div>
</template>

<script>
import LoginSlide from '~/components/content/LoginSlide.vue'
import LoginInput from '~/components/content/LoginInput.vue'

export default {
	name: 'login',
	components: {
		slide0: LoginSlide,
		// slide1: Logically nSlide,
		slide1: LoginInput
	},
	data() {
		return {
			current: 1,
			timeout: null,
			slideDuration: 150000000
		}
	},
	computed: {
		content() {
			return [
				{
					type: 'one'
					// backgroundImageLow: '/img/login-slide_lo.jpg'
				}
			]
		}
	},
	methods: {
		dispatchNext(immediate = false) {
			this.debounce(this.nextSlide, this.slideDuration, immediate)()
		},
		nextSlide() {
			this.current = Math.min(this.content.length, this.current + 1) // cap at slide-amount + 1
			this.dispatchNext()
		},
		debounce(func, wait, immediate) {
			return () => {
				var later = () => {
					this.timeout = null
					func.apply(this)
				}

				clearTimeout(this.timeout)
				this.timeout = setTimeout(later, immediate ? 0 : wait)
			}
		}
	},
	mounted() {
		this.dispatchNext()
	}
}
</script>