<template>
	<div class="collection">
		<button v-for="(item, key) in collectionItems" @click.stop="onItemClick">
			<img :src="item.assets[0].dummyImage" alt="lorem">
			<p>{{topmostAsset.name}}</p>
		</button>
	</div>
</template>


<script>

// return `https://res.cloudinary.com/sorthvid/image/upload/t_${capitalize(topMostAsset.imageAspect)}/${topMostAsset.assetId}/sample.jpg`;


import { vuex, mapActions, mapState } from 'vuex'
import { OPEN_CONTENT } from '~/model/constants'
import capitalize from 'lodash/capitalize';

export default {
	name:'collection',
	computed: {
		...mapState({
			collectionItems: state => state.collection.currentStyles
		})
	},
	methods: {		
		...mapActions([
			OPEN_CONTENT.action
		]),
		onItemClick() {

			this[OPEN_CONTENT.action](['image1','image2']);
		}
	}
};

</script>