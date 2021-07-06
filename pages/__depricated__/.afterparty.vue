<template>
	<afterparty />
</template>

<script>
import Afterparty from '~/components/content/Afterparty.vue'
import { mapActions } from 'vuex'
import { ASSISTANT_MODE, ASSISTANT_TEXT } from '~/model/constants'
import AssistantModes from '~/model/assistant-modes'

export default {
	name: 'afterparty-page',
	components: {
		Afterparty
	},
	methods: {
		...mapActions('assistant', [ASSISTANT_MODE.action, ASSISTANT_TEXT.action])
	},
	mounted() {
		this[ASSISTANT_MODE.action](AssistantModes.CUSTOM)
		this[ASSISTANT_TEXT.action]('afterparty')
	}
}
</script>
