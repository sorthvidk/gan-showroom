<template>
	<div>
		<desktop></desktop>
	</div>
</template>


<script>

import Desktop from '~/components/framework/Desktop.vue'

export default {
	components: {
		Desktop
	},
	head() {
		return {
			script: [
				{ src: 'https://identity.netlify.com/v1/netlify-identity-widget.js' }
			],
			link: [
				{ 
					rel: "stylesheet", 
					type: "text/css", 
					href: "https://fonts.googleapis.com/css?family=Roboto:400,500,600&amp;subset=latin,latin-ext" 
				} 
			]
		}
	}
};
</script>