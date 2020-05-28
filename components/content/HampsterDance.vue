<template>
	<div class="hampster-dance">
		<span v-for="n in iterations" :key="`hampster${n}`">
			<img
				v-for="(item,key) in hamsterList"
				v-lazy="danceUrl(item)"
				alt="'hamster'+item"
				:key="'hamster'+n+key"
			/>
		</span>
	</div>
</template>

<script>
import { vuex, mapActions, mapState } from 'vuex'
import { FORCE_STOP_MUSIC } from '~/model/constants'
import WindowContent from '~/components/framework/WindowContent.vue'

export default {
	extends: WindowContent,
	name: 'hampster-dance',
	data() {
		return {
			audio: new Audio('/audio/hampster.mp3'),
			el: null,
			hamsterList: [1, 2, 2, 2, 3, 3, 3, 4, 4, 4],
			iterations: 20
		}
	},
	methods: {
		...mapActions([FORCE_STOP_MUSIC.action]),
		danceUrl(item) {
			return `/img/hamster${item}.gif`
		},
		scrollListener() {
			if (!this.el) return false

			if (this.el.scrollTop / this.el.offsetHeight > 0.75) {
				this.iterations += 3
			}
		},
		audioTimeUpdate() {
			if(this.audio.currentTime > this.audio.duration - 1.2){
		        this.audio.currentTime = 0.05
		        this.audio.play()
		    }
		}
	},
	mounted() {
		this.el = this.$parent.$el.querySelector('.window__content')
		this.el.addEventListener('scroll', this.scrollListener.bind(this))
		this[FORCE_STOP_MUSIC.action]()
		this.audio.volume = 0.7
		this.audio.play()
		this.audio.addEventListener('timeupdate', this.audioTimeUpdate.bind(this) );
	},
	beforeDestroy() {
		this.audio.pause()
		this.audio.removeEventListener('timeupdate', this.audioTimeUpdate.bind(this) );
		let l = this.el.removeEventListener(
			'scroll',
			this.scrollListener.bind(this)
		)
	}
}
</script>