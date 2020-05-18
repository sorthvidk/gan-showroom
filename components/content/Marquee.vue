<template>
	<div @click="marqueeClickHandler" class="marquee marquee3k" data-speed="1" data-pausable="true">
		<p v-html="text"></p>
	</div>
</template>

<script>
import { vuex, mapActions, mapState } from 'vuex'
import { OPEN_STYLE_CONTENT } from '~/model/constants'
import getCloudinaryUrl from '~/utils/cloudinary-url'
// import Marquee3k from 'marquee3000'

export default {
	name: 'marquee',
	props: {
		text: {
			type: String,
			default: ''
		},
		linkTo: {
			type: String,
			default: ''
		}
	},
	methods: {
		...mapActions([OPEN_STYLE_CONTENT.action]),
		marqueeClickHandler() {
			this[OPEN_STYLE_CONTENT.action](this.linkTo)
		}
	},
	mounted() {
		// works when content doesn't have display none
		// this.$nextTick(Marquee3k.init)
	},
	beforeDestroy() {
		// this.$nextTick(Marquee3k.pauseAll)
	}
}
</script>