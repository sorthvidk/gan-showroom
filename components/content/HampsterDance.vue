<template>
	<div class="hampster-dance">
		<span v-for="n in iterations">			
			<img v-for="(item,key) in hamsterList" :src="danceUrl(item)" alt="'hamster'+item" :key="'hamster'+n+key" />
		</span>
	</div>
</template>

<script>


export default {
	name:'hampster-dance',
	data() {
		return {
			el: null,
			hamsterList: [1,2,2,2,3,3,3,4,4,4],
			iterations: 20
		}
	},
	methods: {
		danceUrl(item) {
			return `/img/hamster${item}.gif`;
		},
		scrollListener() {
			if (!this.el) return false

			if ( this.el.scrollTop / this.el.offsetHeight > 0.75 ) {
				this.iterations += 3;
			}
		}
	},
	mounted() {
		this.el = this.$parent.$el.querySelector('.window__content');
		this.el.addEventListener('scroll', this.scrollListener.bind(this) );			
	},
	beforeDestroy() {
		let l = this.el.removeEventListener('scroll', this.scrollListener.bind(this) );
	}
};
</script>