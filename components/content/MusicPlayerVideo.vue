<template>
  <div class="music-player-video">
    <vimeo-player ref="player" :video-id="currentVideo.videoID" v-on:ready="onReady" v-on:ended="onEnded" controls="false" autoplay="true" muted="true" height="198" width="270"></vimeo-player>
    <p v-html="copy" />
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
      copy: "MARIA “DECIDA” WAHLBERG<br>STOCKHOLM<br>“202020 DANCE FILM – THRESHOLD”<br>HD DIGITAL VIDEO",
      videos: [
        {
          videoID: '449670725'
        },
        {
          videoID: '449670725'
        },
        {
          videoID: '449670725'
        },
        {
          videoID: '449670725'
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