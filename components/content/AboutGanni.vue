<template>
	<div class="about-ganni">
		<div
			v-for="(item, index) in items"
			:key="index"
			class="about-ganni__item"
			:style="`background-image: url(${getImage(item.cloudinaryUrl).src});`"
		>
			<div
				v-if="item.headline"
				class="about-ganni__headline"
				v-html="item.headline"
			></div>
			<div
				class="about-ganni__bodyText"
				v-if="item.bodyText"
				v-html="item.bodyText"
			></div>
		</div>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { AUDIOPLAYER_DARK } from '~/model/constants'
import getCloudinaryUrl from '~/utils/get-cloudinary-url'
import { greyPixel } from '~/utils/placeholders'

export default {
	name: 'about-ganni',
	components: {},
	computed: {
		...mapState('aboutGanni', ['items'])
	},
	mounted() {
		console.log('bum')
		this[AUDIOPLAYER_DARK.action](true)
	},
	beforeDestroy() {
		console.log('unmounted')
		this[AUDIOPLAYER_DARK.action](false)
	},
	methods: {
		...mapActions('utils', [AUDIOPLAYER_DARK.action]),
		getImage(src) {
			return {
				src: getCloudinaryUrl(this.$cloudinary, { cloudinaryUrl: src }),
				loading: greyPixel
			}
		},

		itemClass(item) {
			return {
				'about-ganni__item': true,
				'about-ganni__item-media': item.type === 'image',
				'about-ganni__item-text': item.type === 'text'
			}
		}
	}
}
</script>
