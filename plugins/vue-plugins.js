import Vue from 'vue'
import VueDraggableResizable from 'vue-draggable-resizable'

Vue.use(VueDraggableResizable)

import cloudinary from 'cloudinary-core'

const $cloudinary = new cloudinary.Cloudinary({cloud_name: 'dd6fpxydm', secure: true})
$cloudinary.init();
Vue.prototype.$cloudinary = $cloudinary


export default ({ app }, inject) => {
  inject('cloudinary', $cloudinary)
}