<template>
	<div>
		<h1>HIGHER LOVE TV</h1>
	</div>
</template>

<script>
import { mapActions } from 'vuex'
import { ASSISTANT_MODE, ASSISTANT_TEXT } from '~/model/constants'
import AssistantModes from '~/model/assistant-modes'

export default {
	name: 'higher-love-tv-page',
	components: {},
	methods: {
		...mapActions('assistant', [ASSISTANT_MODE.action, ASSISTANT_TEXT.action])
	},
	mounted() {
		this[ASSISTANT_MODE.action](AssistantModes.CUSTOM)
		this[ASSISTANT_TEXT.action]('higher-love-tv')
	}
}
</script>
