<template>
	<div style="background-color: #fbd5c5">
		<transition name="startup-transition" mode="out-in">
			<login v-if="!loggedin" />
			<desktop v-else />
		</transition>

		<CookieControl>
			<template v-slot:bar>
				<h3>GANNI USES COOKIES ON THIS WEBSITE</h3>
				<p>We use cookies to analyse how our website is used and to simplify and improve your visit. If you continue to browse our website, you accept our use of cookies, in accordance with our <a href="https://www.ganni.com/en-gb/customer-service/cookies-2/cookie-policy.html" target="_blank">Cookie Policy</a>.</p>
			</template>
		</CookieControl>
	</div>
</template>


<script>
import { mapState } from 'vuex'

import Login from '~/components/framework/Login.vue'
import Desktop from '~/components/framework/Desktop.vue'

import getShortUrl from '~/utils/get-short-url'

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
			],
			title: 'GANNI space - our digital showroom'
		}
	},
};
</script>