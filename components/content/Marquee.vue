<template>
	<div class="marquee">
		<p>{{text}}</p>
	</div>
</template>

<script>

export default {
	name:'marquee',
	props: {
		text: {
			type: String,
			default: ''
		}
	}
};
</script>