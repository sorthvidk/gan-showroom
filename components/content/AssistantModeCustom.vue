<template>
	<div>
		<div class="assistant__content">
			<div class="assistant__text" v-if="customText">
				<h3 v-if="customText.headline">{{ customText.headline }}</h3>
				<p v-if="customText.bodyText" v-html="customText.bodyText"></p>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
	name: 'assistant-mode-custom',
	computed: {
		...mapState('assistant', ['customText'])
	}
}
</script>