<template>
	<div class="ganni-girls" :style="backgroundStyle">
		<transition-group name="fade">
			<div v-for="(post, key) in content.posts" class="ganni-girls__post" :key="'post'+key">
				<div class="thumb">
					<img :src="post.thumbnailUrl" alt="thumb">
				</div>
				<div class="content">
					<div>
						<span>{{post.posterHandle}}</span>
						<span>{{post.postedDate}}</span>
					</div>

					<img v-if="post.imageUrl" :src="post.imageUrl" alt=""/>
					<video v-if="post.videoUrl" :src="post.videoUrl" preload muted autoplay controls></video>

					<h3>{{post.title}}</h3>
					<p>{{post.bodyText}}</p>
				</div>
			</div>
		</transition-group>
	</div>
</template>

<script>


import { vuex, mapActions, mapState } from 'vuex'

export default {
	name:'ganni-girls',
	computed: {
		...mapState({
			content: state => state.assets.ganniGirls
		}),
		backgroundStyle() {
			return {backgroundImage: `url(${this.content.bgImageUrl})`};
		}
	},
};
</script>