<template>
  <div class="music-player-video">
    <div class="music-player-video__media">
      <div class="music-player-video__iframe">
        <vimeo-player ref="player" :video-id="currentVideo.videoID" v-on:ready="onReady" v-on:ended="onEnded" controls="false" autoplay="true" height="198" width="270"></vimeo-player>
      </div>
      <p v-html="copy" />
    </div>
    <div class="music-player-video__controls">
			<button class="button" @click="toggle">
				<svg v-if="musicPlaying" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
					<path d="M11 9h3v12h-3zM16 9h3v12h-3z" />
				</svg>
				<svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
					<path d="M21.2 15.1l-10.1 6.1V9l10.1 6.1z" />
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
          videoID: '449670725'
        },
        {
          videoID: '449679851'
        },
        {
          videoID: '449679806'
        },
        {
          videoID: '449679720'
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