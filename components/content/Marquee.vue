<template>
	<div class="marquee">
		<p @click="marqueeClickHandler">{{text}}</p>
	</div>
</template>

<script>

import { vuex, mapActions, mapState } from 'vuex'
import { OPEN_STYLE_CONTENT } from '~/model/constants'
import getCloudinaryUrl from '~/utils/cloudinary-url'

export default {
	name:'marquee',
	props: {
		text: {
			type: String,
			default: ''
		}
	},
	methods: {
		...mapActions([
			OPEN_STYLE_CONTENT.action
		]),	
		marqueeClickHandler() {
			this[OPEN_STYLE_CONTENT.action]('F5987334');
		}
	}
};
</script>