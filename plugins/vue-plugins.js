import Vue from 'vue'
import VueDraggableResizable from 'vue-draggable-resizable'
import VueTyper from 'vue-typer'

Vue.use(VueDraggableResizable)
Vue.use(VueTyper)

import cloudinary from 'cloudinary-core'

const $cloudinary = new cloudinary.Cloudinary({
	cloud_name: 'dd6fpxydm',
	secure: true
})
$cloudinary.init()
Vue.prototype.$cloudinary = $cloudinary

export default ({ app }, inject) => {
	inject('cloudinary', $cloudinary)
}
