<template>
	<button class="collection-item" @click.stop="onItemClick">
		<img :src="imageUrl" alt="lorem">
		<p>{{imageName}}</p>
		<span v-if="responsible">🌍</span>
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
			return getCloudinaryUrl(this.$cloudinary, this.assets[0], {width: 196} );
		},
		imageName() {
			if ( this.assets[0] ) return this.name;
			return this.name+' | 0 assets, can\'t open' ;
		}
	},
	methods: {		
		...mapActions([
			OPEN_STYLE_CONTENT.action
		]),		
		onItemClick() {
			this[OPEN_STYLE_CONTENT.action]( this.styleId );
		}
	}
};

</script>