<template>
	<div class="text-reader">
		<p v-html="text"></p>
	</div>
</template>

<script>
import WindowContent from '~/components/framework/WindowContent.vue'

export default {
	extends: WindowContent,
	name:'text-reader',
	props: {
		text: {
			type: String,
			default: ''
		}
	}
};
</script>