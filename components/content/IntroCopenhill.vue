<template>
	<div class="intro-copenhill" @click="onClick">
		<img
			class="intro-copenhill__background fade"
			alt="The Copenhill plant"
			v-lazy="various.loginBackground[0]"
		/>
		<div class="intro-copenhill__text">
			<span class="higher">
				<span class="higher--animation">
					<span class="higher--translate">
						<span class="higher--rotate">HIGHER</span>
					</span>
				</span>
			</span>
			<span class="love">
				<span class="love--animation">
					<span class="love--translate">
						LOVE
					</span>
				</span>
			</span>
			<span class="ganni">
				<span class="ganni--animation">
					<span class="ganni--translate">
						GANNI
					</span>
				</span>
			</span>
			<span class="ss22">
				<span class="ss22--animation">
					<span class="ss22--translate">
						<span class="ss22--rotate"> <span class="small">ss</span>22 </span>
					</span>
				</span>
			</span>
		</div>

		<marquee />
	</div>
</template>

<script>
import Marquee from '~/components/content/Marquee.vue'
import { mapState } from 'vuex'

export default {
	name: 'intro-copenhill',
	components: {
		Marquee
	},
	computed: {
		...mapState('utils', ['various'])
	},
	methods: {
		onClick() {
			this.$emit('done')
		}
	}
}
</script>
