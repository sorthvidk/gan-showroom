<template>
	<div class="desktop desktop--countdown" :style="{backgroundImage: 'url(/img/sitebg.jpg)'}">
		<div class="window window--no-status">
			<header class="window__top">
				<span class="title">GANNI Showroom Countdown</span>
				<span class="button close">
					<span class="icon">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
							<path
								d="M15.7 15l7.8-7.8-.7-.7-7.8 7.8-7.8-7.8-.7.7 7.8 7.8-7.8 7.8.7.7 7.8-7.8 7.8 7.8.7-.7-7.8-7.8z"
							/>
						</svg>
					</span>
				</span>
			</header>		
			<div class="window__content">
				<div>
					<img src="/img/hamster2.gif" alt="hamster">
					<img src="/img/hamster2.gif" alt="hamster">
					<img src="/img/hamster2.gif" alt="hamster">
					<img src="/img/hamster2.gif" alt="hamster">
					
					<img src="/img/hamster1.gif" v-if="viewPortSize == 1" alt="hamster">
					<img src="/img/hamster1.gif" v-if="viewPortSize == 1" alt="hamster">
					<img src="/img/hamster1.gif" v-if="viewPortSize == 1" alt="hamster">
					<img src="/img/hamster1.gif" alt="hamster">

					<img src="/img/hamster3.gif" v-if="viewPortSize == 1" alt="hamster">
					<img src="/img/hamster3.gif" v-if="viewPortSize == 1" alt="hamster">
					<img src="/img/hamster3.gif" v-if="viewPortSize == 1" alt="hamster">
					<img src="/img/hamster3.gif" v-if="viewPortSize == 1" alt="hamster">
					<img src="/img/hamster3.gif" v-if="viewPortSize == 1" alt="hamster">
					<img src="/img/hamster3.gif" alt="hamster">
					<img src="/img/hamster3.gif" alt="hamster">
					<img src="/img/hamster3.gif" alt="hamster">
					<img src="/img/hamster3.gif" alt="hamster">

					<img src="/img/hamster1.gif" v-if="viewPortSize == 1" alt="hamster">
					<img src="/img/hamster1.gif" v-if="viewPortSize == 1" alt="hamster">
					<img src="/img/hamster1.gif" alt="hamster">

					<img src="/img/hamster4.gif" v-if="viewPortSize == 1" alt="hamster">
					<img src="/img/hamster4.gif" v-if="viewPortSize == 1" alt="hamster">
					<img src="/img/hamster4.gif" v-if="viewPortSize == 1" alt="hamster">
					<img src="/img/hamster4.gif" v-if="viewPortSize == 1" alt="hamster">
					
					<img src="/img/hamster4.gif" v-if="viewPortSize == 1" alt="hamster">
					<img src="/img/hamster4.gif" v-if="viewPortSize == 1" alt="hamster">
					<img src="/img/hamster4.gif" v-if="viewPortSize == 1" alt="hamster">
					<img src="/img/hamster4.gif" alt="hamster">
					<img src="/img/hamster4.gif" alt="hamster">
					<img src="/img/hamster4.gif" alt="hamster">

					<img src="/img/hamster1.gif" v-if="viewPortSize == 1" alt="hamster">
					<img src="/img/hamster1.gif" v-if="viewPortSize == 1" alt="hamster">
					<img src="/img/hamster1.gif" v-if="viewPortSize == 1" alt="hamster">
					<img src="/img/hamster1.gif" alt="hamster">

					<img src="/img/hamster2.gif" v-if="viewPortSize == 1" alt="hamster">
					<img src="/img/hamster2.gif" v-if="viewPortSize == 1" alt="hamster">
					<img src="/img/hamster2.gif" alt="hamster">
					<img src="/img/hamster2.gif" alt="hamster">
					<img src="/img/hamster2.gif" alt="hamster">

					<img src="/img/hamster1.gif" v-if="viewPortSize == 1" alt="hamster">
					<img src="/img/hamster1.gif" v-if="viewPortSize == 1" alt="hamster">
					<img src="/img/hamster1.gif" v-if="viewPortSize == 1" alt="hamster">
					<img src="/img/hamster1.gif" alt="hamster">
				</div>

				<div>
					<h2>
						<span id="countdownDays">00</span>:<span id="countdownHours">00</span>:<span id="countdownMinutes">00</span>:<span id="countdownSeconds">00</span>					
					</h2>

					<h3>
						<span>Soon you will be able to enter Ganni Virtual Showroom</span> <br>
						<span v-if="calendarLinks && calendarLinks.google" v-html="calendarLinks.google"></span>
						<span v-if="calendarLinks && calendarLinks.yahoo" v-html="calendarLinks.yahoo"></span>
						<span v-if="calendarLinks && calendarLinks.ical" v-html="calendarLinks.ical"></span>
						<span v-if="calendarLinks && calendarLinks.outlook" v-html="calendarLinks.outlook"></span>
					</h3>

					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo modi distinctio delectus unde, excepturi possimus qui necessitatibus ducimus, mollitia ex hic. Nostrum eligendi, exercitationem cum, maxime necessitatibus fuga eum dicta.</p>
				</div>

				<div>					
					<img src="/img/hamster2.gif" alt="hamster">
					<img src="/img/hamster2.gif" alt="hamster">
					<img src="/img/hamster2.gif" alt="hamster">
					<img src="/img/hamster2.gif" alt="hamster">
					
					<img src="/img/hamster1.gif" v-if="viewPortSize == 1" alt="hamster">
					<img src="/img/hamster1.gif" v-if="viewPortSize == 1" alt="hamster">
					<img src="/img/hamster1.gif" v-if="viewPortSize == 1" alt="hamster">
					<img src="/img/hamster1.gif" alt="hamster">

					<img src="/img/hamster3.gif" v-if="viewPortSize == 1" alt="hamster">
					<img src="/img/hamster3.gif" v-if="viewPortSize == 1" alt="hamster">
					<img src="/img/hamster3.gif" v-if="viewPortSize == 1" alt="hamster">
					<img src="/img/hamster3.gif" v-if="viewPortSize == 1" alt="hamster">
					<img src="/img/hamster3.gif" v-if="viewPortSize == 1" alt="hamster">
					<img src="/img/hamster3.gif" alt="hamster">
					<img src="/img/hamster3.gif" alt="hamster">
					<img src="/img/hamster3.gif" alt="hamster">
					<img src="/img/hamster3.gif" alt="hamster">

					<img src="/img/hamster1.gif" v-if="viewPortSize == 1" alt="hamster">
					<img src="/img/hamster1.gif" v-if="viewPortSize == 1" alt="hamster">
					<img src="/img/hamster1.gif" alt="hamster">

					<img src="/img/hamster4.gif" v-if="viewPortSize == 1" alt="hamster">
					<img src="/img/hamster4.gif" v-if="viewPortSize == 1" alt="hamster">
					<img src="/img/hamster4.gif" v-if="viewPortSize == 1" alt="hamster">
					<img src="/img/hamster4.gif" v-if="viewPortSize == 1" alt="hamster">
					
					<img src="/img/hamster4.gif" v-if="viewPortSize == 1" alt="hamster">
					<img src="/img/hamster4.gif" v-if="viewPortSize == 1" alt="hamster">
					<img src="/img/hamster4.gif" v-if="viewPortSize == 1" alt="hamster">
					<img src="/img/hamster4.gif" alt="hamster">
					<img src="/img/hamster4.gif" alt="hamster">
					<img src="/img/hamster4.gif" alt="hamster">

					<img src="/img/hamster1.gif" v-if="viewPortSize == 1" alt="hamster">
					<img src="/img/hamster1.gif" v-if="viewPortSize == 1" alt="hamster">
					<img src="/img/hamster1.gif" v-if="viewPortSize == 1" alt="hamster">
					<img src="/img/hamster1.gif" alt="hamster">

					<img src="/img/hamster2.gif" v-if="viewPortSize == 1" alt="hamster">
					<img src="/img/hamster2.gif" v-if="viewPortSize == 1" alt="hamster">
					<img src="/img/hamster2.gif" alt="hamster">
					<img src="/img/hamster2.gif" alt="hamster">
					<img src="/img/hamster2.gif" alt="hamster">

					<img src="/img/hamster1.gif" v-if="viewPortSize == 1" alt="hamster">
					<img src="/img/hamster1.gif" v-if="viewPortSize == 1" alt="hamster">
					<img src="/img/hamster1.gif" v-if="viewPortSize == 1" alt="hamster">
					<img src="/img/hamster1.gif" alt="hamster">

					<img src="/img/hamster2.gif" alt="hamster">
					<img src="/img/hamster2.gif" alt="hamster">
					<img src="/img/hamster2.gif" alt="hamster">
					<img src="/img/hamster2.gif" alt="hamster">
					
					<img src="/img/hamster1.gif" v-if="viewPortSize == 1" alt="hamster">
					<img src="/img/hamster1.gif" v-if="viewPortSize == 1" alt="hamster">
					<img src="/img/hamster1.gif" v-if="viewPortSize == 1" alt="hamster">
					<img src="/img/hamster1.gif" alt="hamster">

					<img src="/img/hamster3.gif" v-if="viewPortSize == 1" alt="hamster">
					<img src="/img/hamster3.gif" v-if="viewPortSize == 1" alt="hamster">
					<img src="/img/hamster3.gif" v-if="viewPortSize == 1" alt="hamster">
					<img src="/img/hamster3.gif" v-if="viewPortSize == 1" alt="hamster">
					<img src="/img/hamster3.gif" v-if="viewPortSize == 1" alt="hamster">
					<img src="/img/hamster3.gif" alt="hamster">
					<img src="/img/hamster3.gif" alt="hamster">
					<img src="/img/hamster3.gif" alt="hamster">
					<img src="/img/hamster3.gif" alt="hamster">

					<img src="/img/hamster1.gif" v-if="viewPortSize == 1" alt="hamster">
					<img src="/img/hamster1.gif" v-if="viewPortSize == 1" alt="hamster">
					<img src="/img/hamster1.gif" alt="hamster">

					<img src="/img/hamster4.gif" v-if="viewPortSize == 1" alt="hamster">
					<img src="/img/hamster4.gif" v-if="viewPortSize == 1" alt="hamster">
					<img src="/img/hamster4.gif" v-if="viewPortSize == 1" alt="hamster">
					<img src="/img/hamster4.gif" v-if="viewPortSize == 1" alt="hamster">
					
					<img src="/img/hamster4.gif" v-if="viewPortSize == 1" alt="hamster">
					<img src="/img/hamster4.gif" v-if="viewPortSize == 1" alt="hamster">
					<img src="/img/hamster4.gif" v-if="viewPortSize == 1" alt="hamster">
					<img src="/img/hamster4.gif" alt="hamster">
					<img src="/img/hamster4.gif" alt="hamster">
					<img src="/img/hamster4.gif" alt="hamster">

					<img src="/img/hamster1.gif" v-if="viewPortSize == 1" alt="hamster">
					<img src="/img/hamster1.gif" v-if="viewPortSize == 1" alt="hamster">
					<img src="/img/hamster1.gif" v-if="viewPortSize == 1" alt="hamster">
					<img src="/img/hamster1.gif" alt="hamster">

					<img src="/img/hamster2.gif" v-if="viewPortSize == 1" alt="hamster">
					<img src="/img/hamster2.gif" v-if="viewPortSize == 1" alt="hamster">
					<img src="/img/hamster2.gif" alt="hamster">
					<img src="/img/hamster2.gif" alt="hamster">
					<img src="/img/hamster2.gif" alt="hamster">

					<img src="/img/hamster1.gif" v-if="viewPortSize == 1" alt="hamster">
					<img src="/img/hamster1.gif" v-if="viewPortSize == 1" alt="hamster">
					<img src="/img/hamster1.gif" v-if="viewPortSize == 1" alt="hamster">
					<img src="/img/hamster1.gif" alt="hamster">
				</div>
			</div>
		</div>
	</div>
</template>

<script>

import getCalendarLinks from '~/utils/get-calendar-links'
import addMediaChangeListener from '~/utils/media-change'
import ViewportSizes from '~/model/viewport-sizes'

export default {
	head() {
		return {
			script: [
				{ src: 'https://identity.netlify.com/v1/netlify-identity-widget.js' }
			],
			link: [
				{ 
					rel: "stylesheet", 
					type: "text/css", 
					href: "https://fonts.googleapis.com/css?family=Roboto:400,500,600&amp;subset=latin,latin-ext" 
				} 
			]
		}
	},
	data() {
		return {
			calendarLinks: null,
			viewPortSize: ViewportSizes.SMALL
		}
	},
	methods: {
		isSmallViewport() {
			this.viewPortSize = ViewportSizes.SMALL
		},
		isLargeViewport() {
			this.viewPortSize = ViewportSizes.LARGE
		}
	},
	mounted() {
		let isMobile = addMediaChangeListener(
			this.isSmallViewport,
			this.isLargeViewport
		)
		if (!isMobile) {
			this.viewPortSize = ViewportSizes.LARGE
		}


		var countdownDays = document.querySelector('#countdownDays'),
			countdownHours = document.querySelector('#countdownHours'),
			countdownMinutes = document.querySelector('#countdownMinutes'),
			countdownSeconds = document.querySelector('#countdownSeconds');

		var second = 1000,
			minute = second * 60,
			hour = minute * 60,
			day = hour * 24;

		var countDown = new Date('Jun 9, 2020 12:00').getTime(),
			interval = setInterval(function() {
				let now = new Date().getTime(),
				distance = countDown - now;

				countdownDays.innerText = 
					Math.floor(distance / (day)) < 10 ? 
						'0'+Math.floor(distance / (day)) : 
						Math.floor(distance / (day))
				countdownHours.innerText = 
					Math.floor((distance % (day)) / (hour)) < 10 ? 
						'0'+Math.floor((distance % (day)) / (hour)) : 
						Math.floor((distance % (day)) / (hour))
				countdownMinutes.innerText = 
					Math.floor((distance % (hour)) / (minute)) < 10 ? 
						'0'+Math.floor((distance % (hour)) / (minute)) : 
						Math.floor((distance % (hour)) / (minute))
				countdownSeconds.innerText = 
					Math.floor((distance % (minute)) / second) < 10 ? 
						'0'+Math.floor((distance % (minute)) / second) : 
						Math.floor((distance % (minute)) / second)
		}, second);

		let data = {
		    // Event title
		    title: 'Ganni Showroom Opening',

		    // Event start date
		    start: new Date('June 9, 2020 12:00'),
		    
		    // Event duration (IN MINUTES)
		    duration: 60,

		    // You can also choose to set an end time
		    // If an end time is set, this will take precedence over duration
		    end: new Date('June 9, 2020 13:00'),     

		    // Event Address
		    address: 'online',

		    // Event Description
		    description: 'Browse the new GANNI Showroom and check out the PS21 collection'
		}

		let CL = getCalendarLinks({data: data});
		this.calendarLinks = CL;
	}
};
	
</script>