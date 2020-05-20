<template>
	<div style="background-color: #fbd5c5">
		<transition name="startup-transition" mode="out-in">
			<login v-if="!loggedin" />
			<desktop v-else />
		</transition>


		<CookieControl>
			<template v-slot:bar>
				<h3>GANNI Showroom uses cookies</h3>
				<p>We track your interactions. That's all. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere odio ipsum reprehenderit nobis quam incidunt praesentium, cupiditate, beatae expedita? Natus harum autem eum accusamus labore, quod nemo deserunt, quos optio.</p>				
			</template>

			<template v-slot:modal>
				<h3>Modal title</h3>
				<p>Modal description</p>
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
			]
		}
	},
	mounted() {		
		// getShortUrl('https://docs.google.com/spreadsheets/d/16N3rdfFBeB9VKvNL98fKTk55mrST0QalrtUMqku3ZIk/edit').then((e)=>console.warn("SHORT URL???", e))
		
	}
};
</script>