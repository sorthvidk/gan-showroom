<template>
  <div class="music-player-video">
    <div class="music-player-video__media">
      <div class="music-player-video__iframe">
        <vimeo-player ref="player" :video-id="currentVideo.videoID" v-on:ready="onReady" v-on:ended="onEnded" controls="false" autoplay="true" height="198" width="270"></vimeo-player>
      </div>
      <p v-html="copy" />
    </div>
    <div class="music-player-video__controls">
			<button class="button" @click="toggle" :class="{'is-playing':musicPlaying}">
				<svg class="icon" v-if="musicPlaying" viewBox="0 0 156 149" xmlns="http://www.w3.org/2000/svg">					
          <g fill="#FFF" fill-rule="evenodd">
            <path d="M74 49.9267016L74 49.5366492 74 0 24.7958115 49.5366492 0 49.5366492 0 99.4633508 24.7958115 99.4633508 74 149 74 99.4633508 74 99.0732984z"/>
            <g fill-rule="nonzero">
              <path d="M12.3553398,95.6666667 L0,83.2467904 C6.14563107,77.0749141 9.52427184,68.8769759 9.52427184,60.1637388 C9.52427184,51.4622131 6.14563107,43.2584192 0,37.0982543 L12.3553398,24.6666667 C21.7980583,34.1587079 27,46.76011 27,60.1695945 C27,73.579079 21.7980583,86.1746254 12.3553398,95.6666667 Z" transform="translate(96.000000, 15.333333)"/>
              <path d="M35.329458,119.666667 L23,107.334278 C35.6142969,94.7229277 42.5608798,77.9736602 42.5608798,60.1666667 C42.5608798,42.3596731 35.6142969,25.6104057 23,12.9990558 L35.329458,0.666666667 C51.2339356,16.5674285 60,37.6987042 60,60.1666667 C60,82.6346292 51.2339356,103.765905 35.329458,119.666667 Z" transform="translate(96.000000, 15.333333)"/>
            </g>
          </g>
				</svg>
				<svg class="icon" v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 403 382">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M191 128V127V0L64 127H0V255H64L191 382V255V254V128Z" fill="white"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M322.822 159.784L274.039 111L243 142.039L291.784 190.822L243 239.606L274.039 270.644L322.822 221.861L371.606 270.644L402.644 239.606L353.86 190.822L402.644 142.039L371.605 111L322.822 159.784Z" fill="white"/>
        </svg>
			</button>
			<p>Playing:</p>
			<div :key="title">
				<!-- print 5 times so it can be css-animated -->
				<p class="title-marquee">{{title}} —&nbsp;</p>
				<p class="title-marquee">{{title}} —&nbsp;</p>
				<p class="title-marquee">{{title}} —&nbsp;</p>
				<p class="title-marquee">{{title}} —&nbsp;</p>
				<p class="title-marquee">{{title}} —&nbsp;</p>
			</div>
		</div>
  </div>
</template>

<script>

import path from 'path'
import { vueVimeoPlayer } from 'vue-vimeo-player';
import getRandomInt from '~/utils/get-random-int'

export default {
  name: 'music-player-video',
  components: { 
    vueVimeoPlayer 
  },  
  computed: {
    currentVideo() {
      return this.videos[this.currentVideoId]
    }
  },
  data() {
    return {
      title: '202020 Soundtrack',
      musicPlaying: false,
      currentVideoId: 0,
      options: {},
      playerReady: false,
      videoCount: 0,
      copy: "MARIA “DECIDA” WAHLBERG<br>STOCKHOLM<br>“202020 DANCE FILM – THRESHOLD”<br>HD DIGITAL VIDEO",
      videos: [
        {
          videoID: '449694982'
        },
        {
          videoID: '449694902'
        },
        {
          videoID: '449694909'
        },
        {
          videoID: '449694810'
        }
      ]
    }
  },
  methods: {
    onReady(instance) {
      // console.log("VIDEO READY",instance)      
      // try { instance.mute() } catch (e) {}
      try { this.$refs.player.mute() } catch (e) {}
    },
    onEnded() {
      // console.log("VIDEO ENDED, PLAY NEXT")
      this.currentVideoId ++;
      if ( this.currentVideoId == this.videoCount ) this.currentVideoId = 0;
    },
    toggle() {
      if(this.musicPlaying) {
        this.$refs.player.mute()
      } else {
        this.$refs.player.unmute()
      }

      this.musicPlaying = !this.musicPlaying
    }
  },
  mounted() {
    this.videoCount = this.videos.length;
    this.currentVideoId = getRandomInt(0, this.videoCount-1)

    // console.log(this.currentVideoId + " / "+this.videoCount)
  }

};

</script>