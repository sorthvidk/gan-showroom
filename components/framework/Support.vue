<template>
	<section class="window window--tight window--support support">
		<header class="window__top">
			<h1 class="title">☎️ Need support?</h1>
			<button class="button close" @click.stop="minimizeHandler">{{ icon }}</button>
		</header>

		<main class="window__content" v-if="!minimized">
			<div class="support__top">
				<h3>Support</h3>
				<a href="tel:#">+45 11 22 33 44</a>
				<div class="social">
					<a href="#">IG</a>
					<a href="#">FB</a>
				</div>
			</div>
			<div class="support__content">
				<img :src="avatar" />
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis elementum tellus sed arcu fringilla, ut dictum leo luctus. Nunc non lectus et enim pellentesque suscipit.</p>
			</div>
		</main>

		<footer class="support__footer" v-if="!minimized">
			<a class="button" href="mailto:#">Send email</a>
		</footer>
	</section>
</template>

<script>
export default {
	name: 'support',
	data() {
		return {
			minimized: false,
			avatar: '/img/avatar.png'
		}
	},
	computed: {
		icon() {
			return this.minimized ? 'Λ' : 'V'
		}
	},
	methods: {
		minimizeHandler() {
			this.minimized = !this.minimized
		}
	}
}
</script>
