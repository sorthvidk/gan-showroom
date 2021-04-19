import Vue from 'vue'
import cloudinary from 'cloudinary-core'
import VueDraggableResizable from 'vue-draggable-resizable'
import VueLazyload from 'vue-lazyload'
import VueTyper from 'vue-typer'
import visibility from 'vue-visibility-change'
import WebCam from 'vue-web-cam'
import Vidle from 'v-idle'
import Konva from 'konva'
import Vuebar from 'vuebar'
import vueVimeoPlayer from 'vue-vimeo-player'
import * as dateFns from 'date-fns'
import viscosity from 'scroll-viscosity'

Vue.use(VueLazyload)
Vue.use(VueDraggableResizable)
Vue.use(VueTyper)
Vue.use(visibility)
Vue.use(Konva)
Vue.use(WebCam)
Vue.use(Vidle)
Vue.use(Vuebar)
Vue.use(vueVimeoPlayer)
Vue.use(dateFns)
Vue.use(viscosity)

/**
 * todo: turn of when bugfixing is done
 */
Vue.config.devtools = process.env.NODE_ENV !== 'production'

const $cloudinary = new cloudinary.Cloudinary({
	cloud_name: 'dd6fpxydm',
	secure: true,
	use_filename: true,
	unique_filename: false
})
$cloudinary.init()
Vue.prototype.$cloudinary = $cloudinary

export default ({ app }, inject) => {
	inject('cloudinary', $cloudinary)
	inject('visibility', visibility)
	inject('Vuebar', Vuebar)
}
