<template>
	<transition name="fade">
		<div class="artists">
			<a class="artists__item" v-for="(item,index) in content" :key="'lookbook'+index" @click="itemClickHandler(item)">
				<img v-if="item.type === 'image'" v-lazy="getMediaUrl(item.type, item.cloudinaryUrl)" alt=""/>
				<video v-if="item.type === 'video'" :src="getMediaUrl(item.type, item.cloudinaryUrl)" preload muted controls></video>
				<div>					
					<h3>{{item.name}}</h3>
					<p>{{item.description}}</p>
				</div>
			</a>
		</div>
	</transition>
</template>

<script>

import { vuex, mapActions, mapState } from 'vuex'

import { OPEN_ARTIST_CONTENT } from '~/model/constants'

import getCloudinaryUrl from '~/utils/get-cloudinary-url'
import WindowContent from '~/components/framework/WindowContent.vue'

export default {
	extends: WindowContent,
	name:'artists',
	computed: {
		...mapState({
			content: state => state.artists.list
		})
	},
	methods: {
		...mapActions('artists', [OPEN_ARTIST_CONTENT.action]),
		getMediaUrl(type,cURL) {
			return getCloudinaryUrl(this.$cloudinary, {type:type, cloudinaryUrl:cURL}, {width: 500}, 2);
		},
		itemClickHandler(item){
			this[OPEN_ARTIST_CONTENT.action](item.artistId)
		}
	}
};
</script>