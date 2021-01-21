export default {
	mode: 'universal',
	/*
	 ** Headers of the page
	 */
	head: {
		title: 'Ganni showroom',
		htmlAttrs: {
			lang: 'en'
		},
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{
				hid: 'description',
				name: 'description',
				content: process.env.npm_package_description || ''
			},
			{
				hid: 'image',
				property: 'og:image',
				content:
					'https://res.cloudinary.com/dd6fpxydm/image/upload/c_fill,q_60,w_1000/v1604531348/PF21_21.2/rails_ondisplay/original/DSC_4565_k0ipyx.jpg'
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
	serverMiddleware: ['~/api/headers.js'],
	/*
	 ** Customize the progress-bar color
	 */
	loading: { color: '#fff' },
	/**
	 * Always search for static in root
	 */
	static: {
		prefix: false
	},
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
	/**
	 * options for svg-sprite
	 */
	svgSprite: {
		input: '~/static/svg',
		output: '~/static/svg/sprite'
	},
	/*
	 ** Nuxt.js modules
	 */
	modules: [
		'@nuxtjs/svg-sprite',
		'@nuxtjs/markdownit',
		[
			'nuxt-cookie-control',
			{
				css: true,
				controlButton: false
			}
		]
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
					grid: false
				}
			}
		},
		vendor: ['vue-vimeo-player']
	}
}
