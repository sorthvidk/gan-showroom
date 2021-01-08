<template>
	<div class="copyright-message">
		<transition
			@before-appear="copyrightBeforeAnimateIn"
			@appear="copyrightAnimateIn"
		>
			<div class="window window--no-status window--tight">
				<header class="window__top">
					<span class="title">Important Info</span>
				</header>
				<div class="window__content">
					<span class="icon">
						<!-- <img src="/img/smiley-bw.png" /> -->

						<p>
							Hi, we hope you will enjoy your Ganni Space Virtual Showroom
							experience.<br /><br />
							Please note that all visual material and images are for internal
							use only and not to be distributed outside this platform.
						</p>
					</span>
					<button class="button ok" @click="copyrightMessageClickHandler">
						OK
					</button>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
import { mapActions } from 'vuex'
import { COPYRIGHT_ACCEPT } from '~/model/constants'

export default {
	name: 'copywrite-message',
	methods: {
		...mapActions('user', [COPYRIGHT_ACCEPT.action]),
		copyrightMessageClickHandler() {
			this[COPYRIGHT_ACCEPT.action](true)
		},
		copyrightBeforeAnimateIn(el) {
			TweenLite.set(el, { scale: 0, opacity: 0 })
		},
		copyrightAnimateIn(el) {
			TweenLite.to(el, 0.3, {
				delay: 2,
				scale: 1,
				opacity: 1,
				ease: 'power4.inOut',
			})
		},
	},
}
</script>