<template>
	<button class="collection-item" @click.stop="onItemClick">
		<img :src="imageUrl" alt="lorem">
		<p>{{imageName}}</p>
		<span v-if="sustainable">Sustainable</span>
	</button>
</template>


<script>



import { vuex, mapActions, mapState } from 'vuex'
import { OPEN_STYLE_CONTENT } from '~/model/constants'
import getCloudinaryUrl from '~/utils/cloudinary-url'
import CollectionItemModel from '~/model/collection-item'
import capitalize from 'lodash/capitalize'

export default {
	name:'collectionItem',
	props: CollectionItemModel,
	computed: {
		imageUrl() {
			return getCloudinaryUrl(this.assets[0]);
		},
		imageName() {
			return this.assets[0].name		
		}
	},
	methods: {		
		...mapActions([
			OPEN_STYLE_CONTENT.action
		]),		
		onItemClick() {
			console.log("STYLE CLICK")
			this[OPEN_STYLE_CONTENT.action]( this.styleId );
		}
	}
};

</script>