import Vue from 'vue'
import VueDraggableResizable from 'vue-draggable-resizable'
import VueLazyload from 'vue-lazyload'
import VueTyper from 'vue-typer'
import visibility from 'vue-visibility-change'
import WebCam from 'vue-web-cam'
import Vidle from 'v-idle'
import Konva from 'konva'
import Vuebar from 'vuebar'

Vue.use(VueLazyload)
Vue.use(VueDraggableResizable)
Vue.use(VueTyper)
Vue.use(visibility)
Vue.use(Konva)
Vue.use(WebCam)
Vue.use(Vidle)
Vue.use(Vuebar)

/**
 * todo: turn of when bugfixing is done
 */
Vue.config.devtools = true

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
	inject('Vuebar', Vuebar)
}
