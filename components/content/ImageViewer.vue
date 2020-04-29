<template>
	<div class="image-viewer">
		<img :src="imageUrlDefault" alt="img">
	</div>
</template>

<script>

export default {
	name:'image-viewer',
	props: {
		imageUrlDefault: {
			type: String,
			default: ''
		}
	}
};
</script>