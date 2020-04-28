<template>
  <vue-draggable-resizable
    class-name="window"
    class-name-active="is-active"
    @dragging="onDrag"
    @resizing="onResize"
    :handles="['br']"
    :drag-handle="'.window__top'"
    :x="positionX"
    :y="positionY"
    :w="sizeW"
    :h="sizeH"
    :z="positionZ"
  >
    <div class="window__top">
      <span class="title">{{title}}</span>
      <button @click="closeHandler">X</button>
    </div>
    <div class="window__content" @click="onMouseDown">
      <p>X: {{ x }} / Y: {{ y }} - Width: {{ width }} / Height: {{ height }}</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et vero voluptatum nulla, perferendis provident recusandae voluptatibus molestias nesciunt odio debitis numquam laudantium eum? Voluptatum atque in placeat ipsa praesentium obcaecati. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et vero voluptatum nulla, perferendis provident recusandae voluptatibus molestias nesciunt odio debitis numquam laudantium eum? Voluptatum atque in placeat ipsa praesentium obcaecati. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et vero voluptatum nulla, perferendis provident recusandae voluptatibus molestias nesciunt odio debitis numquam laudantium eum? Voluptatum atque in placeat ipsa praesentium obcaecati. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et vero voluptatum nulla, perferendis provident recusandae voluptatibus molestias nesciunt odio debitis numquam laudantium eum? Voluptatum atque in placeat ipsa praesentium obcaecati. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et vero voluptatum nulla, perferendis provident recusandae voluptatibus molestias nesciunt odio debitis numquam laudantium eum? Voluptatum atque in placeat ipsa praesentium obcaecati.</p>
    </div>
  </vue-draggable-resizable>
</template>

<script>
import { vuex, mapActions, mapState } from 'vuex'
import { TOPMOST_WINDOW } from '../store/constants'

import VueDraggableResizable from 'vue-draggable-resizable'

export default {
  name: 'window',
  components: {
    VueDraggableResizable
  },
  props: {
    title: {
      type: String
    },
    positionX: {
      type: Number
    },
    positionY: {
      type: Number
    },
    positionZ: {
      type: Number
    },
    sizeW: {
      type: Number
    },
    sizeH: {
      type: Number
    },
    id: {
      type: String
    }
  },
  watch: {
    topMostWindow(newVal) {
      console.log('newVal', newVal)
      if (newVal == this.id) {
        this.z = 1000
      } else {
        this.z = { ...this.positionZ } //default z
      }
    }
  },
  computed: {
    ...mapState({
      topMostWindow: state => state[TOPMOST_WINDOW.stateKey]
    })
  },
  data: function() {
    return {
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      z: 0
    }
  },
  methods: {
    ...mapActions([TOPMOST_WINDOW.action]),
    closeHandler(e) {
      console.log('CLOSE WINDOW')
    },
    onResize(x, y, width, height) {
      this.x = x
      this.y = y
      this.width = width
      this.height = height
    },
    onDrag(x, y) {
      this.x = x
      this.y = y
    },
    onMouseDown() {
      console.log('this.id', this.id)
      console.log('TOPMOST_WINDOW', TOPMOST_WINDOW)
      console.log('this[TOPMOST_WINDOW.action]', this[TOPMOST_WINDOW.action])

      this[TOPMOST_WINDOW.action](this.id)
      //this.$store.dispatch(TOPMOST_WINDOW.action, this.id)
    }
  },
  mounted() {
    console.log('TOPMOST_WINDOW', TOPMOST_WINDOW)
    this.onResize(this.positionX, this.positionY, this.sizeW, this.sizeH)
  }
}
</script>