<template>
	<div class="download-modal">
		<span class="icon">
			<img src="/img/smiley-bw.png" />
		</span>
		<div>
			<p>
				You are about to download a zip archive!
			</p>
			<a :href="path" download>Download</a>
		</div>
		<!-- <button class="button ok" @click="copyrightMessageClickHandler">
						OK
					</button> -->
	</div>
</template>

<script>
export default {
	name: 'download-modal',
	data: () => ({ path: '/files/example.zip' })
}
</script>