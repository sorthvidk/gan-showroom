<template>
	<section class="window window--tight window--support support" :class="{'is-active': !minimized}" v-cloak>
		<header class="window__top">
			<h1 class="title">☎️ Need support?</h1>
			<button class="button close" @click.stop="minimizeHandler">
				<span class="icon" v-if="minimized">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
					  <path d="M22.6 19.8L15 12.1l-7.6 7.7-.7-.7 8.3-8.4 8.4 8.4z"/>
					</svg>
				</span>
				<span class="icon" v-if="!minimized">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
					  <path d="M15 20.2l-8.4-8.4.8-.7 7.6 7.7 7.6-7.7.7.7z"/>
					</svg>
				</span>
			</button>
		</header>

		<main class="window__content" v-if="!minimized" v-cloak>
			<div class="support__content">
				<img :src="avatar" />
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis elementum tellus sed arcu fringilla, ut dictum leo luctus. Nunc non lectus et enim pellentesque suscipit.</p>
			</div>

			<footer class="support__footer">
				<a href="tel:004511223344">
					<span class="icon">📞</span>
					<em>+45 11 22 33 44</em>
				</a>
				<a href="mailto:support@ganni.com">
					<span class="icon">✉️</span>
					<em> Send email</em>
				</a>
			</footer>
		</main>

	</section>
</template>

<script>

import ViewportSizes from '~/model/viewport-sizes'
import addMediaChangeListener from '~/utils/media-change'
import isMobile from '~/utils/is-mobile'

export default {
	name: 'support',
	data() {
		return {
			viewPortSize: ViewportSizes.SMALL,
			minimized: true,
			avatar: '/img/avatar2.png'
		}
	},
	methods: {
		minimizeHandler() {
			this.minimized = !this.minimized
		},
		isSmallViewport() {
			this.viewPortSize = ViewportSizes.SMALL;
		},
		isLargeViewport() {
			this.viewPortSize = ViewportSizes.LARGE;			
		}
	},
	mounted() {
		addMediaChangeListener(this.isSmallViewport, this.isLargeViewport);
		if ( !isMobile() ) {
			this.viewPortSize = ViewportSizes.LARGE;
		}
	}
}
</script>
