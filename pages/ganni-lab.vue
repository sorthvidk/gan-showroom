<template>
	<green-room />
</template>

<script>
import GreenRoom from '~/components/content/GreenRoom.vue'
import { mapActions } from 'vuex'
import { ASSISTANT_MODE, ASSISTANT_TEXT } from '~/model/constants'
import AssistantModes from '~/model/assistant-modes'

export default {
	name: 'ganni-lab-page',
	components: {
		GreenRoom
	},
	methods: {
		...mapActions('assistant', [ASSISTANT_MODE.action, ASSISTANT_TEXT.action])
	},
	mounted() {
		this[ASSISTANT_MODE.action](AssistantModes.WELCOME)
	}
}
</script>
