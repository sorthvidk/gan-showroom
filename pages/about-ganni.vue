<template>
	<about-ganni />
</template>

<script>
import AboutGanni from '~/components/content/AboutGanni.vue'
import { mapActions } from 'vuex'
import { ASSISTANT_MODE, ASSISTANT_TEXT } from '~/model/constants'
import AssistantModes from '~/model/assistant-modes'

export default {
	name: 'about-ganni-page',
	components: {
		AboutGanni
	},
	methods: {
		...mapActions('assistant', [ASSISTANT_MODE.action, ASSISTANT_TEXT.action])
	},
	mounted() {
		this[ASSISTANT_MODE.action](AssistantModes.CUSTOM)
		this[ASSISTANT_TEXT.action]('about-ganni')
	}
}
</script>
