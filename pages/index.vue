<template>
	<div style="background-color: #fbd5c5">
		<transition name="startup-transition" mode="out-in">
			<login v-if="!loggedin" />
			<desktop v-else />
		</transition>
	</div>
</template>


<script>
import { mapState } from 'vuex'

import Login from '~/components/framework/Login.vue'
import Desktop from '~/components/framework/Desktop.vue'

export default {
	components: {
		Login,
		Desktop
	},
	computed: mapState(['loggedin']),
	head() {
		return {
			script: [
				{ src: 'https://identity.netlify.com/v1/netlify-identity-widget.js' }
			],
			link: [
				{
					rel: 'stylesheet',
					type: 'text/css',
					href:
						'https://fonts.googleapis.com/css?family=Roboto:400,500,600&amp;subset=latin,latin-ext'
				}
			]
		}
	}
}
</script>