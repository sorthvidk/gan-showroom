<template>
	<div class="films">
		<films-item v-for="(item, key) in filmsItems" v-bind="{...item}" />
	</div>
</template>

<script>

import { vuex, mapActions, mapState } from 'vuex'

import FilmsItem from '~/components/content/FilmsItem.vue'

export default {
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