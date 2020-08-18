<template>
  <div class="music-player-video">
    <video muted autoplay loop>
        <source
          v-for="source in sources"
          :src="source.src"
          :type="`video/${source.format}`" />
    </video>
    <p v-html="copy" />
  </div>
</template>

<script>
import path from 'path'

export default {
  name: 'music-player-video',
  data() {
    return {
      copy: 'MARIA “DECIDA” WAHLBERG<br>STOCKHOLM<br>“202020 DANCE FILM – THRESHOLD”<br>HD DIGITAL VIDEO',
      srcs: ['/video/anakras_landscape.mp4']
    }
  },
  computed: {
    sources() {
      return this.srcs.map(src => ({
        src,
        format: path.extname(src).substr(1)
      }))
    }
  }
}
</script>