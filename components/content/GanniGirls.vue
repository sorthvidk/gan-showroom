<template>
	<transition name="fade">
		<div class="ganni-girls" :style="backgroundStyle">
			<div v-for="(post, key) in content.posts" class="ganni-girls__post" :key="'post'+key">
				<div class="thumb">
					<img v-lazy="post.thumbnailUrl" alt="thumb">
				</div>
				<div class="content">
					<div>
						<span>{{post.posterHandle}}</span>
						<span>{{post.postedDate}}</span>
					</div>

					<img v-if="post.type === 'image'" v-lazy="getMediaUrl(post.type, post.cloudinaryUrl)" alt=""/>
					<video v-if="post.type === 'video'" :src="getMediaUrl(post.type, post.cloudinaryUrl)" preload muted autoplay controls></video>

					<h3>{{post.title}}</h3>
					<p>{{post.bodyText}}</p>
				</div>
			</div>
		</div>	
	</transition>
</template>

<script>

import getCloudinaryUrl from '~/utils/get-cloudinary-url'


import { vuex, mapActions, mapState } from 'vuex'
import WindowContent from '~/components/framework/WindowContent.vue'

export default {
	extends: WindowContent,
	name:'ganni-girls',
	computed: {
		...mapState({
			content: state => state.assets.ganniGirls
		}),
		backgroundStyle() {
			return {backgroundImage: `url(${this.content.bgImageUrl})`};
		}
	},
	methods: {
		getMediaUrl(type,cURL) {
			return getCloudinaryUrl(this.$cloudinary, {type:type, cloudinaryUrl:cURL}, {width: 500});
		}
	}
};
</script>