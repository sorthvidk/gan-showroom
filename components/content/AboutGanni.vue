<template>
	<div class="about-ganni">
		<div
			:class="itemClass(item)"
			v-for="(item, idx) in items"
			:key="idx"
			ref="items"
			:style="`order: ${item.order};`"
		>
			<img
				v-if="item.type === 'image'"
				:src="getMediaUrl(item.type, item.cloudinaryUrl).src"
				alt=""
			/>

			<div v-if="item.type === 'text'" v-html="item.text"></div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import getCloudinaryUrl from '~/utils/get-cloudinary-url'

export default {
	name: 'about-ganni',
	components: {},
	computed: {
		...mapState('aboutGanni', ['items'])
	},
	methods: {
		getMediaUrl(type, cloudinaryUrl, { thumbnail } = {}) {
			return {
				src: getCloudinaryUrl(
					this.$cloudinary,
					{ type, cloudinaryUrl },
					{ width: thumbnail ? 100 : window.innerWidth < 600 ? 300 : 900 }
				)
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
