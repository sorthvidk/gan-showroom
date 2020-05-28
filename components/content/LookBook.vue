<template>
	<transition name="fade">
		<div class="look-book">
			<div class="look-book__item" v-for="(item,index) in content" :key="'lookbook'+index">
				<img v-lazy="imageUrl(index)" alt="lookbook">				
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
		imageUrl(index) {
			return getCloudinaryUrl(this.$cloudinary, this.content[index], {width:400});
		}
	}
};
</script>