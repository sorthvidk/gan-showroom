<script>
import { vuex, mapActions, mapState } from 'vuex'

//ONLY FOR EXTENSION!!!

export default {
	name: 'window-content',
	props: {
		parentWindowId: {
			type: String,
			required: true
		}
	},
	data() {
		return {
			inFocus: false
		}
	},
	computed: {
		...mapState({
			topMostWindow: state => state.topMostWindow
		})
	},
	watch: {
		topMostWindow(newVal) {
			this.inFocus = newVal.windowId === this.parentWindowId
		}
	},
	mounted() {
		this.inFocus = this.topMostWindow.windowId === this.parentWindowId
	}
}
</script>
