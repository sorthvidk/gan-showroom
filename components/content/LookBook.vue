<template>
	<transition name="fade">
		<div class="look-book">
			<div class="look-book__item" v-for="(item,key) in content" :key="'lookbook'+key">
				<img :src="item.cloudinaryUrl" alt="lookbook">				
			</div>
		</div>
	</transition>
</template>

<script>

import { vuex, mapActions, mapState } from 'vuex'


export default {
	name:'look-book',
	computed: {
		...mapState({
			content: state => state.assets.lookBook
		})
	},
};
</script>