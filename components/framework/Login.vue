<template>
	<div class="login" @click="nextSlide">
		<transition name="slide-transition">
			<component :key="current" v-bind:is="`slide${current}`" v-bind="content[current]" />
		</transition>
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
			current: 0
		}
	},
	computed: {
		content() {
			return [
				{
					type: 'one',
					backgroundImage: 'url(/img/login-slide.jpg)'
				},
				{
					type: 'two',
					backgroundImage: 'url(/img/login-slide-2.jpg)',
					text: `There are many\nvariations of\npassages of\nwords which\ndon't look even`
				}
			]
		}
	},
	methods: {
		nextSlide() {
			this.current = Math.min(this.content.length, this.current + 1) // cap at slide-amount + 1
		}
	},
	mounted() {}
};
</script>