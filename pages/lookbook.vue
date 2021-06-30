<template>
	<lookbook-slideshow />
</template>

<script>
import LookbookSlideshow from '~/components/content/LookbookSlideshow.vue'
import { mapActions } from 'vuex'
import { ASSISTANT_MODE, ASSISTANT_TEXT } from '~/model/constants'
import AssistantModes from '~/model/assistant-modes'

export default {
	name: 'lookbook-page',
	components: {
		LookbookSlideshow
	},
	methods: {
		...mapActions('assistant', [ASSISTANT_MODE.action, ASSISTANT_TEXT.action])
	},
	mounted() {
		this[ASSISTANT_MODE.action](AssistantModes.CUSTOM)
		this[ASSISTANT_TEXT.action]('lookBook')
	}
}
</script>
