<template>
	<div class="fabrics">
		<text-cursor :text="'+zoom'" />
		<div
			class="fabrics__item"
			v-for="(item, idx) in items"
			:key="item.text"
			ref="items"
		>
			<img
				:src="getUrl(item.cloudinaryUrl)"
				:alt="'One of GANNIs many really nice fabrics'"
				:style="{
					transformOrigin: `
                    ${mousepos.x - ownPos(idx).left}px
                    ${mousepos.y - ownPos(idx).top}px`,
				}"
				@click="zoom"
			/>
			<div class="fabrics__text" v-if="item.text">
				<p>{{ item.text }}</p>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import getCloudinaryUrl from '~/utils/get-cloudinary-url'
import TextCursor from '~/components/elements/TextCursor.vue'

export default {
	name: 'fabrics',
	components: {
		TextCursor,
	},
	data: () => ({
		topPositions: [],
	}),
	computed: {
		...mapState('fabrics', ['items']),
		...mapState('user', ['mousepos', 'currentScroll']),
	},
	methods: {
		getUrl(cloudinaryUrl) {
			return getCloudinaryUrl(this.$cloudinary, {
				cloudinaryUrl,
				type: 'image',
			})
		},
		zoom(e) {
			e.target.classList.toggle('zoomed')
			this.topPositions = this.$refs.items.map((item) => {
				return getComputedStyle(item).height
			})
		},
		ownPos(idx) {
			if (!this.$refs.items) return 0

			const pos = this.$refs.items[idx].getBoundingClientRect()

			return { top: pos.top, left: pos.left }
		},
	},
}
</script>