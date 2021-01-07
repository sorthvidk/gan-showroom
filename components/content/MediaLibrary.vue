<template>
	<div class="media-library" @mouseleave="close">
		<a
			v-for="item in downloads"
			:key="item.name"
			:href="item.file"
			download
			class="media-library__item"
			>{{ item.name }}</a
		>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { MENU_SHOW } from '~/model/constants'

export default {
	name: 'media-library',
	computed: {
		...mapState('assets', ['downloads']),
	},
	methods: {
		...mapActions('utils', [MENU_SHOW.action]),
		close() {
			setTimeout(() => this[MENU_SHOW.action](false), 500)
		},
	},
}
</script>