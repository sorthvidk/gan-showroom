<template>
	<div class="single-image">
		<img :src="asset.dummyImage" alt="img">
	</div>
</template>

<script>

export default {
	name:'single-image',
	props: {
		imageUrlDefault: {
			type: String,
			default: ''
		},
		asset: {
			type: Object,
			required: true
		}
	}
};
</script>