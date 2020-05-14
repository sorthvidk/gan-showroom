<template>
	<div class="hampster-dance">
		<img :src="danceUrl" alt="img">
		<img :src="danceUrl" alt="img">
		<img :src="danceUrl" alt="img">
		<img :src="danceUrl" alt="img">
		<img :src="danceUrl" alt="img">
		<img :src="danceUrl" alt="img">
		<img :src="danceUrl" alt="img">
		<img :src="danceUrl" alt="img">
		<img :src="danceUrl" alt="img">
		<img :src="danceUrl" alt="img">
		<img :src="danceUrl" alt="img">
		<img :src="danceUrl" alt="img">
	</div>
</template>

<script>


export default {
	name:'hampster-dance',
	data() {
		return {
			danceUrl: '/img/dance.gif'
		}
	}
};
</script>