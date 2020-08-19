<template>
  <div class="music-player-video">
    <vimeo-player ref="player" :video-id="currentVideo.videoID" v-on:ready="onReady" v-on:ended="onEnded" controls="false" autoplay="true"></vimeo-player>
    <p v-html="currentVideo.copy" />
  </div>
</template>

<script>

import path from 'path'
import { vueVimeoPlayer } from 'vue-vimeo-player';

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
      videos: [
        {
          videoID: '408058683',
          copy: 'MARIA “DECIDA” WAHLBERG<br>STOCKHOLM<br>“202020 DANCE FILM – THRESHOLD”<br>HD DIGITAL VIDEO'
        },
        {
          videoID: '449208807',
          copy: 'LARS ALLAN<br>CPH<br>“202020 DANCE FILM – THRESHOLD”<br>HD DIGITAL VIDEO'
        }
      ]
    }
  },
  methods: {
    onReady() {
      console.log("VIDEO READY")
    },
    onEnded() {
      console.log("VIDEO ENDED, PLAY NEXT")
    },
  }
};

</script>