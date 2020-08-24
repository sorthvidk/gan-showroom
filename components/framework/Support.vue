<template>
	<section
		class="window window--tight window--support support"
		:class="{'is-active': !minimized}"
		v-cloak
	>
		<header class="window__top">
			<h1 class="title">Need support?</h1>
			<button class="button close" @click.stop="minimizeHandler">
				<span class="icon" v-if="minimized">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
						<path d="M22.6 19.8L15 12.1l-7.6 7.7-.7-.7 8.3-8.4 8.4 8.4z" />
					</svg>
				</span>
				<span class="icon" v-if="!minimized">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
						<path d="M15 20.2l-8.4-8.4.8-.7 7.6 7.7 7.6-7.7.7.7z" />
					</svg>
				</span>
			</button>
		</header>

		<main class="window__content" v-if="!minimized" v-cloak>
			<div class="support__content">
				<img :src="avatar" />
				<p>At GANNI we're always here for you. Got a question? Just reach out.</p>
			</div>

			<footer class="support__footer">
				<a href="tel:+46739825022">
					<span class="icon">
						<svg viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								fill="#000"
								d="M8 17h3v1H8zM7 23h5v1H7zM7 18h5v5H7zM6 19h1v4H6zM16 9h1v2h-1zM17 9h7v2h-7zM18 7h5v2h-5z"
							/>
							<path
								fill="#000"
								d="M19 6h3v4h-3zM12 18h1v4h-1zM13 17h1v4h-1zM14 16h1v4h-1zM22 10h1v3h-1zM15 15h1v4h-1zM16 14h1v4h-1zM17 11h2v5h-2zM19 11h2v3h-2zM21 11h1v3h-1zM17 8h1v1h-1zM17 7h1v1h-1zM17 16h1v1h-1zM19 14h1v1h-1z"
							/>
						</svg>
					</span>
					<em>+46 739 82 50 22</em>
				</a>
				<a :href="emailUrl">
					<span class="icon">
						<svg viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path stroke="#000" d="M6.5 7.5h17v14h-17z" />
							<path
								fill="#000"
								d="M7 8h1v1H7zM8 9h1v1H8zM9 10h1v1H9zM10 11h1v1h-1zM11 12h1v1h-1zM11 16h1v1h-1zM10 17h1v1h-1zM9 18h1v1H9zM8 19h1v1H8zM7 20h1v1H7zM22 8h1v1h-1zM21 9h1v1h-1zM22 20h1v1h-1zM21 19h1v1h-1zM20 18h1v1h-1zM19 17h1v1h-1zM18 16h1v1h-1zM20 10h1v1h-1zM19 11h1v1h-1zM18 12h1v1h-1zM12 13h2v1h-2zM14 14h2v1h-2zM16 13h2v1h-2zM12 15h2v1h-2zM16 15h2v1h-2z"
							/>
						</svg>
					</span>
					<em>Send email</em>
				</a>
			</footer>
		</main>
	</section>
</template>

<script>
import ViewportSizes from '~/model/viewport-sizes'
import addMediaChangeListener from '~/utils/media-change'

export default {
	name: 'support',
	data() {
		return {
			viewPortSize: ViewportSizes.SMALL,
			minimized: true,
			avatar: '/img/avatar.png'
		}
	},
	computed: {
		emailUrl() {
			let subject = encodeURIComponent(
				'Quick question. I really have to know...'
			)
			let body = encodeURIComponent(
				"Dear GANNI,\n\nI'm loving exploring Ditte's Desktop! It is _________\n\nI have a question about _________\n\nSpeak soon!\n\nLove <3"
			)
			let u = `mailto:wholesale@ganni.com?subject=${subject}&body=${body}`
			return u
		}
	},
	methods: {
		minimizeHandler() {
			this.minimized = !this.minimized
		},
		isSmallViewport() {
			this.viewPortSize = ViewportSizes.SMALL
		},
		isLargeViewport() {
			this.viewPortSize = ViewportSizes.LARGE
		}
	},
	mounted() {
		let isMobile = addMediaChangeListener(
			this.isSmallViewport,
			this.isLargeViewport
		)
		if (!isMobile) {
			this.viewPortSize = ViewportSizes.LARGE
		}
	}
}
</script>
