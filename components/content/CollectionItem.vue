<template>
	<button class="collection-item" @click.stop="onItemClick">
		<img :src="imageUrl" alt="lorem">
		<p>{{imageName}}</p>
	</button>
</template>


<script>



import { vuex, mapActions, mapState } from 'vuex'
import { OPEN_CONTENT, PROGRESS_UPDATE } from '~/model/constants'
import getAssetType from '~/utils/asset-type'
import getCloudinaryUrl from '~/utils/cloudinary-url'
import CollectionItemModel from '~/model/collection-item'
import capitalize from 'lodash/capitalize'

export default {
	name:'collectionItem',
	props: CollectionItemModel,
	computed: {
		imageUrl() {
			// return getCloudinaryUrl(this.assets[0]);
			return this.assets[0].dummyImage;
		},
		imageName() {
			// return getCloudinaryUrl(this.assets[0]);
			return this.assets[0].name;
		},
		assetContent() {
			let content = [];
			let al = this.assets.length;

			//backwards loop to ensure asset [0] gets on top (as sorted in $store)
			for (var i = al-1; i >= 0; i--) {
				let asset = this.assets[i];

				if ( asset.visible ) {
					content.push({
						title: asset.name,
						type: getAssetType(asset),
						componentProps: {
							asset: asset
						}
					});
				}
			}

			return content;
		}
	},
	methods: {		
		...mapActions([
			OPEN_CONTENT.action,
			'collection/'+PROGRESS_UPDATE.action
		]),		
		onItemClick() {
			this[OPEN_CONTENT.action]( this.assetContent );
			this['collection/'+PROGRESS_UPDATE.action]( this.styleId );
		}
	}
};

</script>