<template>
	<div class="cookie-banner">
		<div>			
			<h3>GANNI USES COOKIES ON THIS WEBSITE</h3>
			<p>We use cookies to analyse how our website is used and to simplify and improve your visit. If you continue to browse our website, you accept our use of cookies, in accordance with our <a href="/cookies" target="_blank">Cookie Policy</a>.</p>
		</div>
		
		<button class="button close" @click="closeHandler">Close</button>
	</div>
</template>

<script>

import { vuex, mapActions, mapState } from 'vuex'

import {
	COOKIES_ACCEPT
} from '~/model/constants'

export default {
	name: 'cookie-banner',
	methods: {
		...mapActions([
			COOKIES_ACCEPT.action
		]),
		closeHandler() {
			this[COOKIES_ACCEPT.action]();
		}
	}
};
</script>