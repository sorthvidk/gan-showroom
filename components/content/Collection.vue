<template>
	<div class="collection">
		<button @click.stop="onItemClick">
			<img src="//placeimg.com/200/400/people" alt="">
			<p>pleaded_skirt_1.jpg</p>
		</button>
		<button @click.stop="onItemClick2">
			<img src="//placeimg.com/200/400/people" alt="">
			<p>pleaded_skirt_1.jpg</p>
		</button>
		<button @click.stop="onItemClick3">
			<img src="//placeimg.com/200/400/people" alt="">
			<p>pleaded_skirt_1.jpg</p>
		</button>
	</div>
</template>

<script>
import { vuex, mapActions, mapState } from 'vuex'
import { OPEN_CONTENT } from '~/model/constants'

export default {
	name:'collection',
	props: {
		collectionId: {
			type: String,
			default: '',
			required: true
		}
	},
	methods: {
		...mapActions([
			OPEN_CONTENT.action
		]),
		onItemClick() {
			this[OPEN_CONTENT.action](['image1','image2']);			
		},
		onItemClick2() {
			this[OPEN_CONTENT.action](['image3']);			
		},
		onItemClick3() {
			this[OPEN_CONTENT.action](['image4','image5','image6']);			
		}
	}
};
</script>