<template>
	<div>
		<div class="window__status" v-if="isMobile">
			<button class="button expand" @click="toggleExpanded">
				<span v-if="!expanded" class="icon">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15">
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M7 8v7h1V8h7V7H8V0H7v7H0v1h7z"
						/>
					</svg>
				</span>
				<span v-if="expanded" class="icon">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15">
						<path d="M0 7h15v1H0V7z" />
					</svg>
				</span>
				<p>Change clothes</p>
			</button>
		</div>

		<div
			class="assistant__content scroll"
			:class="{
				'is-collapsed': isMobile && !expanded
			}"
		>
			<div class="assistant__text">
				<ol>
					<li>Take a portrait photo of yourself and upload it.</li>
					<li>Try our new GANNI Pre-Spring 21 collection on for fun.</li>
					<li>Share looks with your team</li>
				</ol>
			</div>

			<div class="assistant__ctas">
				<div class="collage-buttons">
					<div class="row" v-for="item in Object.keys(clothes)" :key="item">
						<p class="title">{{ item | capitalize }}</p>
						<button
							class="button button--inline"
							@click="changeGarment(item, 1)"
						>
							<svg
								class="left"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 30 30"
							>
								<path d="M22.6 19.8L15 12.1l-7.6 7.7-.7-.7 8.3-8.4 8.4 8.4z" />
							</svg>
						</button>
						<button
							class="button button--inline"
							@click="changeGarment(item, 0)"
						>
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
		<div class="row collage-ctas">
			<button class="button button--half" @click="downloadImageClickHandler">
				<p>Save image</p>
			</button>
			<button class="button button--half" @click="makeBackgroundClickHandler">
				<p>Make background</p>
			</button>
		</div>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import {
	ASSISTANT_MODE,
	CHANGE_COLLAGE,
	SAVE_COLLAGE,
	MAKE_BACKGROUND,
	ASSISTANT_EXPANDED
} from '~/model/constants'

export default {
	name: 'assistant-mode-collage',
	computed: {
		...mapState('utils', ['isMobile']),
		...mapState('collage', ['collageIsOpen', 'clothes']),
		...mapState('assistant', ['expanded'])
	},
	watch: {
		collageIsOpen(open) {
			if (open) {
				this[ASSISTANT_MODE.action](AssistantModes.COLLAGE)
			}
		}
	},
	filters: {
		capitalize(value) {
			if (!value) return ''
			value = value.toString()
			return value.charAt(0).toUpperCase() + value.slice(1)
		}
	},
	methods: {
		...mapActions('assistant', [ASSISTANT_EXPANDED.action]),
		...mapActions('collage', [
			SAVE_COLLAGE.action,
			MAKE_BACKGROUND.action,
			CHANGE_COLLAGE.action
		]),
		toggleExpanded() {
			this[ASSISTANT_EXPANDED.action](!this.expanded)
		},
		downloadImageClickHandler() {
			this[SAVE_COLLAGE.action]()
		},
		makeBackgroundClickHandler() {
			this[MAKE_BACKGROUND.action]()
		},
		changeGarment(type, val) {
			// trigger used to inform watchers to re-run
			this[CHANGE_COLLAGE.action]({ trigger: Math.random(), type, val })
		}
	}
}
</script>