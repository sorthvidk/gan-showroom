<template>
	<div
		style="
			position: fixed;
			top: 0;
			left: 0;
			width: 100vw;
			height: 100vh;
			background-color: var(--color-secondary);
			z-index: 10000;
			color: var(--color-primary);
			display: grid;
			place-items: center;
			text-align: center;
		"
	>
		<div>
			<h1 style="font-size: 5vw">Hey, we just wannna play a quick game</h1>
			<button
				style="
					border: 2px solid;
					font-size: 5vw;
					padding: 0.5em 1em;
					margin-top: 5vw;
				"
				@click="tickTock"
			>
				Let's play 🎟
			</button>
		</div>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { HAS_AUTHENTICATED, LOGIN } from '~/model/constants'

export default {
	name: 'auth-popup',
	methods: {
		...mapActions('user', [LOGIN.action, HAS_AUTHENTICATED.action]),
		tickTock() {
			let isGood = false

			window.addEventListener('keydown', (e) => {
				if (e.key === 'g') {
					console.log("You're good")
					isGood = true
				}
			})

			setTimeout(() => {
				console.log('Are you good?', isGood)

				if (!isGood) {
					this[LOGIN.action](false)
				}

				this[HAS_AUTHENTICATED.action](isGood)

				isGood = false
			}, 4000)
		},
	},
	mounted() {},
}
</script>