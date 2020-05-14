<template>
	<div class="look-book">
		<transition-group name="fade">
			<div class="look-book__item" v-for="(item,key) in content" :key="'lookbook'+key">
				<img :src="item.imageUrl" alt="lookbook">				
			</div>
		</transition-group>
	</div>
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