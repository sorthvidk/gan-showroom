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
		// slide2: LoginSlide,
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
					backgroundImage: '/img/intro/into_backgrounds_low.jpg'
					// backgroundImageLow: '/img/login-slide_lo.jpg'
				},
				{
					type: 'two',
					backgroundImage: '/img/intro/into_backgrounds2_low.jpg',
					// backgroundImageLow: '/img/login-slide-2_lo.jpg',
					copy: `ABOUT GANNI 202020<br><br>QUESTION “WHAT ARE THE 20S GONNA BE LIKE” THIS TIME BY FOCUSING ON THE QUESTIONS OF WHAT WE’VE LEARNED SO FAR AND WHERE WE GO FROM HERE? THE RESULT IS A FIVE-PIECE INSTALLATION THAT COMES TO LIFE THROUGH DIFFERENT LENSES AND MEDIUMS, CREATING A MULTITUDE OF PERSPECTIVES, BRINGING TOGETHER A COMMUNITY FOR SPRING SUMMER 2021 WE CONTINUE TO PURSUE THE OF GANNI CREATIVES FROM BERLIN, NEW YORK, LONDON, STOCKHOLM, MONTREAL AND COPENHAGEN.`
				}
				// {
				// 	type: 'two',
				// 	backgroundImage: '/img/intro/into_backgrounds3_low.jpg'
				// 	// backgroundImageLow: '/img/login-slide-2_lo.jpg',
				// 	// text: `You are now entering\nGANNI Pre-Spring 21\n"Home Is Where The\nHeart Is” collection`
				// }
			]
		}
	},
	methods: {
		dispatchNext(immediate = false) {
			this.debounce(this.nextSlide, 700000, immediate)()
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