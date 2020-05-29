import Vue from 'vue'
import VueDraggableResizable from 'vue-draggable-resizable'
import VueLazyload from 'vue-lazyload'
import VueTyper from 'vue-typer'
import visibility from 'vue-visibility-change'

Vue.use(VueLazyload)
Vue.use(VueDraggableResizable)
Vue.use(VueTyper)
Vue.use(visibility)

import cloudinary from 'cloudinary-core'

const $cloudinary = new cloudinary.Cloudinary({
	cloud_name: 'dd6fpxydm',
	secure: true
})
$cloudinary.init()
Vue.prototype.$cloudinary = $cloudinary

export default ({ app }, inject) => {
	inject('cloudinary', $cloudinary)
	inject('visibility', visibility)
}
