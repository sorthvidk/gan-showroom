<template>
	<div
		class="single-image"
		:class="{ 'is-interactive': asset.styleId && inFocus }"
	>
		<loading />

		<transition name="fade">
			<img v-lazy="assetUrl" alt="img" @click="clickHandler" />
		</transition>
	</div>
</template>

<script>
import { vuex, mapActions, mapState } from 'vuex'
import { OPEN_GALLERY } from '~/model/constants'
import getCloudinaryUrl from '~/utils/get-cloudinary-url'

import WindowContent from '~/components/framework/WindowContent.vue'
import Loading from '~/components/content/Loading.vue'

export default {
	extends: WindowContent,
	components: { Loading },
	name: 'single-image',
	props: {
		asset: {
			type: Object,
			required: true,
		},
	},
	computed: {
		assetUrl() {
			return getCloudinaryUrl(this.$cloudinary, this.asset, {
				width: this.asset.aspect === 'landscape' ? 592 : 370,
				height: this.asset.aspect === 'portrait' ? 563 : 390,
			})
		},
	},
	methods: {
		...mapActions([OPEN_GALLERY.action]),
		clickHandler() {
			if (this.asset.styleId && this.inFocus) {
				this[OPEN_GALLERY.action](this.asset)
			}
		},
	},
}
</script>