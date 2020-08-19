<template>
  <div class="music-player-video">
    <vimeo-player ref="player" :video-id="currentVideo.videoID" v-on:ready="onReady" v-on:ended="onEnded" controls="false" autoplay="true" muted="true"></vimeo-player>
    <p v-html="currentVideo.copy" />
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
      currentVideoId: 0,
      options: {},      
      playerReady: false,
      videoCount: 0,
      videos: [
        {
          videoID: '408058683',
          copy: '1 MARIA “DECIDA” WAHLBERG<br>STOCKHOLM<br>“202020 DANCE FILM – THRESHOLD”<br>HD DIGITAL VIDEO'
        },
        {
          videoID: '449208807',
          copy: '2 LARS ALLAN<br>CPH<br>“202020 DANCE FILM – THRESHOLD”<br>HD DIGITAL VIDEO'
        },
        {
          videoID: '408058683',
          copy: '3 MARIA “DECIDA” WAHLBERG<br>STOCKHOLM<br>“202020 DANCE FILM – THRESHOLD”<br>HD DIGITAL VIDEO'
        },
        {
          videoID: '449208807',
          copy: '4 LARS ALLAN<br>CPH<br>“202020 DANCE FILM – THRESHOLD”<br>HD DIGITAL VIDEO'
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
  },
  mounted() {
    this.videoCount = this.videos.length;
    this.currentVideoId = getRandomInt(0, this.videoCount-1)

    // console.log(this.currentVideoId + " / "+this.videoCount)
  }

};

</script>