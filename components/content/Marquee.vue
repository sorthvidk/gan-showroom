<template>
	<div class="marquee marquee3k" data-speed="1" data-pausable="true">
		<p @click="marqueeClickHandler">{{text}}</p>
	</div>
</template>

<script>
import { vuex, mapActions, mapState } from 'vuex'
import { OPEN_STYLE_CONTENT } from '~/model/constants'
import getCloudinaryUrl from '~/utils/cloudinary-url'
import Marquee3k from 'marquee3000'

export default {
	name: 'marquee',
	props: {
		text: {
			type: String,
			default: ''
		}
	},
	methods: {
		...mapActions([OPEN_STYLE_CONTENT.action]),
		marqueeClickHandler() {
			this[OPEN_STYLE_CONTENT.action]('F5987334')
		}
	},
	mounted() {
		Marquee3k.init()
	}
}
</script>