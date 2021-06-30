<template>
	<fabrics />
</template>

<script>
import Fabrics from '~/components/content/Fabrics.vue'
import { mapActions } from 'vuex'
import { ASSISTANT_MODE, ASSISTANT_TEXT } from '~/model/constants'
import AssistantModes from '~/model/assistant-modes'

export default {
	name: 'fabrics-page',
	components: {
		Fabrics
	},
	methods: {
		...mapActions('assistant', [ASSISTANT_MODE.action, ASSISTANT_TEXT.action])
	},
	mounted() {
		this[ASSISTANT_MODE.action](AssistantModes.WELCOME)
	}
}
</script>
