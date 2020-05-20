<template>
	<button class="collection-item" @click.stop="onItemClick">
		<img v-lazy="imageUrl" alt="imageName">
		<p>{{imageName}}</p>
		<span class="responsible" v-if="responsible">🌍</span>
		<span class="on-wishlist" v-if="onWishList">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
				<path class="checkmark" d="M24.75 62l27.5 27.5 51-51" />
			</svg>
		</span>
	</button>
</template>


<script>

import { vuex, mapActions, mapState } from 'vuex'
import { OPEN_STYLE_CONTENT } from '~/model/constants'
import CollectionItemModel from '~/model/collection-item'
import capitalize from 'lodash/capitalize'

import getCloudinaryUrl from '~/utils/cloudinary-url'
import sendTracking from '~/utils/send-tracking'

export default {
	name:'collectionItem',
	props: CollectionItemModel,
	computed: {
		...mapState({
			wishList: state => state.collection.wishList
		}),
		imageUrl() {
			return getCloudinaryUrl(this.$cloudinary, this.assets[0], {width: 196} );
		},
		imageName() {
			if ( this.assets[0] ) return this.name;
			return this.name+' | 0 assets, can\'t open' ;
		},
		onWishList() {
			return this.wishList.filter((e)=>e.styleId === this.styleId).length > 0
		}
	},
	methods: {		
		...mapActions([
			OPEN_STYLE_CONTENT.action
		]),		
		onItemClick() {
			sendTracking('Product click',this.styleId)
			
			this[OPEN_STYLE_CONTENT.action]( this.styleId )
		}
	}
};

</script>