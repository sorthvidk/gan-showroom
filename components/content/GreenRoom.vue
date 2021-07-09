<template>
	<div class="green-room">
		<div
			class="green-room__item"
			v-for="(item, idx) in items"
			:key="item.text + '' + idx"
			:data-order="idx"
			ref="items"
			:class="{
				fixed: item.fixed,
				'enter-left': idx < items.length / 2,
				'is-link': item.link
			}"
			:style="{
				'--enter-duration': 2 + 's',
				'--enter-delay': idx / 10 + 's'
			}"
		>
			<!-- zIndex: items.length - idx, -->
			<img :src="item.cloudinaryUrl" v-if="!item.link" />

			<a
				v-else
				:href="item.link"
				target="_blank"
				@mouseenter="changeCursor('Read more', 'external')"
				@mouseleave="changeCursor('')"
			>
				<img :src="item.cloudinaryUrl" />
			</a>
			<div class="green-room__text" v-if="item.popup">
				<p v-html="item.popup" />
			</div>
		</div>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { TEXT_CURSOR } from '~/model/constants'

export default {
	name: 'green-room',
	data: () => ({}),
	computed: {
		...mapState('greenRoom', ['items'])
	},
	methods: {
		...mapActions('utils', [TEXT_CURSOR.action]),
		changeCursor(str, icon) {
			this[TEXT_CURSOR.action]({ str, icon })
		}
	},
	mounted() {},
	beforeDestroy() {
		this.changeCursor('')
	}
}
</script>
