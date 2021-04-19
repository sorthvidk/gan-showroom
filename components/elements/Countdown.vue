
<template>
	<p class="countdown">{{ preText }} {{ duration }} {{ postText }}</p>
</template>

<script>
import * as dateFns from 'date-fns'

export default {
	name: 'countdown',
	data: () => ({
		duration: '',
	}),
	props: {
		preText: {
			type: String,
		},
		postText: {
			type: String,
		},
		deadline: {
			type: Array,
			default: () => [],
		},
	},
	methods: {
		updateDuration() {
			const time = dateFns.intervalToDuration({
				start: new Date(),
				end: new Date(...this.deadline),
			})

			this.dur = dateFns.formatDuration(time)

			this.duration = time.seconds
				? this.dur.replace('minutes', 'minutes and')
				: this.dur
		},
		loop() {
			setTimeout(() => {
				this.updateDuration()
				this.loop()
			}, 1000)
		},
	},
	mounted() {
		this.updateDuration()
		this.loop()
	},
}
</script>
