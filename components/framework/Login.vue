<template>
	<div class="login" @click="nextSlide">
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
			timeoutHandle: null
		}
	},
	computed: {
		content() {
			return [
				{
					type: 'one',
					backgroundImage: '/img/login-slide.jpg'
				},
				{
					type: 'two',
					backgroundImage: '/img/login-slide-2.jpg',
					text: `There are many\nvariations of\npassages of\nwords which\ndon't look even`
				}
			]
		}
	},
	methods: {
		nextSlide() {
			clearTimeout(this.timeoutHandle);
			this.current = Math.min(this.content.length, this.current + 1) // cap at slide-amount + 1
			if ( this.current < this.content.length-1 ) {				
				setTimeout(this.nextSlide.bind(this), 5000);
			}
		}
	},
	mounted() {
		this.timeoutHandle = setTimeout(this.nextSlide.bind(this), 5000);
	}
};
</script>