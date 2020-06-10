<template>
	<div class="films">
		<films-item v-for="(item, key) in filmsItems" :key="key" v-bind="{...item}" />
	</div>
</template>

<script>

import { vuex, mapActions, mapState } from 'vuex'

import FilmsItem from '~/components/content/FilmsItem.vue'
import WindowContent from '~/components/framework/WindowContent.vue'

export default {
	extends: WindowContent,
	name:'films',
	components: {
		FilmsItem
	},
	computed: {
		...mapState({
			filmsItems: state => state.assets.films
		})
	}
};

</script>