<template>
	<transition name="fade">
		<div class="look-book">
			<div class="look-book__item" v-for="(item,index) in content" :key="'lookbook'+index">
				<img v-if="item.type === 'image'" v-lazy="getMediaUrl(item.type, item.cloudinaryUrl)" alt=""/>
				<video v-if="item.type === 'video'" :src="getMediaUrl(item.type, item.cloudinaryUrl)" preload muted controls></video>

			</div>
		</div>
	</transition>
</template>

<script>

import { vuex, mapActions, mapState } from 'vuex'


import getCloudinaryUrl from '~/utils/get-cloudinary-url'
import WindowContent from '~/components/framework/WindowContent.vue'

export default {
	extends: WindowContent,
	name:'look-book',
	computed: {
		...mapState({
			content: state => state.assets.lookBook
		})
	},
	methods: {
		getMediaUrl(type,cURL) {
			return getCloudinaryUrl(this.$cloudinary, {type:type, cloudinaryUrl:cURL}, {width: 500}, 2);
		}
	}
};
</script>