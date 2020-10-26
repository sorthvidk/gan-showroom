<template>
	<div>
		<div class="assistant__content">
			<div class="assistant__text">
				<h3>{{ texts.puzzle.headline }}</h3>
				<p>{{ texts.puzzle.bodyText }}</p>
			</div>
		</div>

		<div class="assistant__content scroll">
			<div class="assistant__ctas">
				<div class="puzzle-buttons">
					<div class="row">
						<p class="title">Change puzzle</p>
						<button class="button button--inline" @click="next">
							<svg
								class="left"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 30 30"
							>
								<path d="M22.6 19.8L15 12.1l-7.6 7.7-.7-.7 8.3-8.4 8.4 8.4z" />
							</svg>
						</button>
						<button class="button button--inline" @click="prev">
							<svg
								class="right"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 30 30"
							>
								<path d="M22.6 19.8L15 12.1l-7.6 7.7-.7-.7 8.3-8.4 8.4 8.4z" />
							</svg>
						</button>
					</div>
				</div>
			</div>
		</div>
		<!-- <div class="row collage-ctas">
			<button class="button button--half" @click="downloadImageClickHandler">
				<p>Save image</p>
			</button>
			<button class="button button--half" @click="makeBackgroundClickHandler">
				<p>Make background</p>
			</button>
		</div> -->
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
	name: 'assistant-mode-puzzle',
	computed: {
		...mapState('assistant', ['texts'])
	},
	methods: {
		...mapActions('puzzle', ['next', 'prev'])
	}
}
</script>