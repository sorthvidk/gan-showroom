<template>
	<div class="intro-copenhill" @click="onClick">
		<img
			class="intro-copenhill__background fade"
			alt="The Copenhill plant"
			v-lazy="
				'https://www.smartenup.in/wp-content/uploads/2021/02/Amager-Bakke-Climate-Friendly-Energy-Plant-1600x800.jpg'
			"
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

export default {
	name: 'intro-copenhill',
	components: {
		Marquee
	},
	methods: {
		onClick() {
			console.log('INTRO DONE')
			this.$emit('done')
		}
	}
}
</script>
