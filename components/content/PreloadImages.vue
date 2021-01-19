<template>
	<div class="preload-images" style="opacity: 0; pointer-events: none">
		<img
			v-for="(src, i) in srcs"
			:key="'preload-image-' + i"
			:src="src"
			alt="An image that should be cached"
		/>
	</div>
</template>
<script>
export default {
	name: 'preload-images',
	props: {
		srcs: { type: Array, default: () => [] },
	},
}
</script>