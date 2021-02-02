<template>
	<div class="download-message">
		<div class="window window--no-status window--tight">
			<header class="window__top">
				<span class="title">Please wait</span>
			</header>
			<div class="window__content">
				<img src="/img/ganni_popcorn_animation.gif" alt />
				<p>Your download is being prepared...</p>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'download-message',
}
</script>