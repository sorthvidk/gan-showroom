
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
		slim: { type: Boolean },
	},
	methods: {
		updateDuration() {
			const durationRaw = dateFns.intervalToDuration({
				start: new Date(),
				end: new Date(...this.deadline),
			})

			this.duration = dateFns.formatDuration(durationRaw, {
				format: this.slim
					? ['months', 'days', 'hours']
					: ['days', 'hours', 'minutes', 'seconds'],
				zero: true,
			})
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
