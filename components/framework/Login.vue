<template>
	<div class="login" @click="dispatchNext(true)">
		<component :key="current" v-bind:is="`slide${current}`" v-bind="content[current]" />
	</div>
</template>

<script>
import LoginSlide from '~/components/content/LoginSlide.vue'
import LoginInput from '~/components/content/LoginInput.vue'

export default {
	name: 'login',
	components: {
		slide0: LoginSlide,
		slide1: LoginSlide,
		slide2: LoginInput
	},
	data() {
		return {
			current: 0,
			timeout: null
		}
	},
	computed: {
		content() {
			return [
				{
					type: 'one',
					backgroundImage: '/img/login-slide.jpg',
					backgroundImageLow: '/img/login-slide_lo.jpg'
				},
				{
					type: 'two',
					backgroundImage: '/img/login-slide-2.jpg',
					backgroundImageLow: '/img/login-slide-2_lo.jpg',
					text: `There are many\nvariations of\npassages of\nwords which\ndon't look even`
				}
			]
		}
	},
	methods: {
		dispatchNext(immediate = false) {
			this.debounce(this.nextSlide, 7000, immediate)()
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
};
</script>