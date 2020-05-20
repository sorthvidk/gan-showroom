export default {
	mode: 'universal',
	/*
	 ** Headers of the page
	 */
	head: {
		title: process.env.npm_package_name || '',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{
				hid: 'description',
				name: 'description',
				content: process.env.npm_package_description || ''
			}
		],
		link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
	},
	// generate: {
	// 	routes: function() {
	// 		const fs = require('fs')
	// 		return fs.readdirSync('./assets/content/blog').map(file => {
	// 			return {
	// 				route: `/blog/${file.slice(2, -5)}`,
	// 				payload: require(`./assets/content/blog/${file}`)
	// 			}
	// 		})
	// 	}
	// },
	/*
	 ** Customize the progress-bar color
	 */
	loading: { color: '#fff' },
	/*
	 ** Global CSS
	 */
	css: ['@/assets/scss/main.scss'],
	/*
	 ** Plugins to load before mounting the App
	 */
	plugins: [
		{
			src: '~/plugins/vue-plugins.js',
			mode: 'client'
		},
		{
			src: '~/plugins/vuex-plugins.js',
			mode: 'client',
			ssr: false
		},
		{
			src: '~/plugins/other-plugins.js',
			mode: 'client'
		}
	],
	/*
	 ** Nuxt.js dev-modules
	 */
	buildModules: ['@nuxtjs/gtm'],
	gtm: {
		dev: false,
		id: 'GTM-P2ZL2V6'
	},
	/*
	 ** Nuxt.js modules
	 */
	modules: [
		'@nuxtjs/markdownit',
		['nuxt-cookie-control', {
			css: false
		}]
	],
	markdownit: {
		injected: true
	},
	/*
	 ** Build configuration
	 */
	build: {
		/*
		 ** You can extend webpack config here
		 */
		devtools: true,
		analyze: false, // only for debugging
		extend(config, ctx) {
			// console.log('config.entry: ', config.entry);
		},
		postcss: {
			plugins: {
				'postcss-units': { fallback: false, precision: 3 },
				'postcss-inline-svg': { path: 'static/svg/', removeFill: true }
			},
			preset: {
				// Change the postcss-preset-env settings
				autoprefixer: {
					// browsers: ['last 4 versions', '> 1%', 'ie 6-8'],
					// browsers: ['defaults'],
					grid: true
				}
			}
		}
	}
}
