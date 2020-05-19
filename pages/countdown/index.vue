<template>
	<div class="desktop" :style="{backgroundImage: 'url(/img/sitebg.jpg)'}">
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
					<img src="/img/dance.gif" alt="">
					<img src="/img/dance.gif" alt="">
				</div>

				<div>
					<h2>
						<span id="countdownDays">00</span>:<span id="countdownHours">00</span>:<span id="countdownMinutes">00</span>:<span id="countdownSeconds">00</span>					
					</h2>

					<h3>
						Soon you will be able to enter Ganni Virtual Showroom <br>
						<span v-if="calendarLinks && calendarLinks.google" v-html="calendarLinks.google"></span>
						<span v-if="calendarLinks && calendarLinks.yahoo" v-html="calendarLinks.yahoo"></span>
						<span v-if="calendarLinks && calendarLinks.ical" v-html="calendarLinks.ical"></span>
						<span v-if="calendarLinks && calendarLinks.outlook" v-html="calendarLinks.outlook"></span>
					</h3>

					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo modi distinctio delectus unde, excepturi possimus qui necessitatibus ducimus, mollitia ex hic. Nostrum eligendi, exercitationem cum, maxime necessitatibus fuga eum dicta.</p>
				</div>

				<div>					
					<img src="/img/dance.gif" alt="">
					<img src="/img/dance.gif" alt="">
					<img src="/img/dance.gif" alt="">
					<img src="/img/dance.gif" alt="">
					<img src="/img/dance.gif" alt="">
					<img src="/img/dance.gif" alt="">
					<img src="/img/dance.gif" alt="">
					<img src="/img/dance.gif" alt="">
					<img src="/img/dance.gif" alt="">
					<img src="/img/dance.gif" alt="">
					<img src="/img/dance.gif" alt="">
					<img src="/img/dance.gif" alt="">
					<img src="/img/dance.gif" alt="">
				</div>
			</div>
		</div>
	</div>
</template>

<style>
	.window {
		position: absolute;
		top: 10vh;
		left: 50%;		
		bottom: 10vh;
		-webkit-transform: translateX(-50%);
		-ms-transform: translateX(-50%);
		-o-transform: translateX(-50%);
		transform: translateX(-50%);
		max-width: rem(1600);
		min-width: 60vw;

	}
	.window__content div {
		text-align: center;
	}
	h2 {
		font-family: Helvetica Neue;
		font-style: normal;
		font-weight: 500;
		font-size: 78.3659px;
		line-height: 168%;
		/* identical to box height, or 132px */

		text-align: center;
		letter-spacing: -0.03em;

		/* Black */

		color: #000000;
	}
	h3 {
		font-family: Times New Roman;
		font-style: normal;
		font-weight: normal;
		font-size: 26px;
		line-height: 168%;
		/* identical to box height, or 44px */

		text-align: center;
		letter-spacing: -0.03em;

		/* Blue */

		color: #1400FF;
	}
	h3 a {
		font-size: 18px;
		font-weight: 600;
	}

	p {
		max-width: rem(800);
		margin: 0 auto rem(40);
		font-family: Times New Roman;
		font-style: normal;
		font-weight: normal;
		font-size: 13.9317px;
		line-height: 21px;
		/* or 150% */

		text-align: center;
		letter-spacing: -0.03em;

		/* Black */

		color: #000000;
	}
</style>

<script>

import getCalendarLinks from '~/utils/get-calendar-links'

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
			calendarLinks: null
		}
	},
	mounted() {
		var countdownDays = document.querySelector('#countdownDays'),
			countdownHours = document.querySelector('#countdownHours'),
			countdownMinutes = document.querySelector('#countdownMinutes'),
			countdownSeconds = document.querySelector('#countdownSeconds');

		var second = 1000,
			minute = second * 60,
			hour = minute * 60,
			day = hour * 24;

		var countDown = new Date('Jun 9, 2020 00:00:00').getTime(),
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
		    title: 'Get on the front page of HN',

		    // Event start date
		    start: new Date('June 9, 2020 12:00'),
		    
		    // Event duration (IN MINUTES)
		    duration: 60,

		    // You can also choose to set an end time
		    // If an end time is set, this will take precedence over duration
		    end: new Date('June 9, 2020 13:00'),     

		    // Event Address
		    address: 'The internet',

		    // Event Description
		    description: 'Get on the front page of HN, then prepare for world domination.'
		}

		let CL = getCalendarLinks({data: data});
		this.calendarLinks = CL;
	}
};
	
</script>