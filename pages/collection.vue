<template>
	<div>
		<collection />

		<div class="desktop__windows">
			<transition-group
				tag="div"
				name="window-animation"
				@before-enter="setTransformOrigin"
			>
				<window
					v-for="(item, index) in windowList"
					:key="item.windowId"
					v-bind="item.windowProps"
					:position-z="item.positionZ"
					:window-id="item.windowId"
					:content-type="item.contentType"
					:content-name="item.contentName"
					:content-component="item.contentComponent"
					:status-component="item.statusComponent"
					:content-component-props="item.contentComponentProps"
					:group-id="item.groupId"
					:status-component-props="item.statusComponentProps"
					:window-info="item.customAssistantText"
					:title="item.title"
					:content-id="item.contentId"
					:data-index="index"
				/>
			</transition-group>
		</div>
	</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Collection from '~/components/content/Collection.vue'
import AssistantModes from '~/model/assistant-modes'
import Window from '~/components/framework/Window.vue'
import {
	SET_CURRENT_FILTER,
	SET_GROUP_BY_INDEX,
	ASSISTANT_MODE
} from '~/model/constants'

export default {
	name: 'collection-page',
	components: {
		Collection,
		Window
	},
	computed: {
		...mapState(['windowList']),
		...mapState('user', ['mousepos'])
	},
	methods: {
		...mapActions('collection', [
			SET_GROUP_BY_INDEX.action,
			SET_CURRENT_FILTER.action
		]),
		...mapActions('assistant', [ASSISTANT_MODE.action]),

		setTransformOrigin(el) {
			el.style.transformOrigin = `${this.mousepos.x}px ${this.mousepos.y}px`
			el.style.transitionDelay = `${el.dataset.index * 0.05 - 0.05}s`
		},

		parseUrl(param, cb, err) {
			const query = new URL(window.location.href).searchParams.get(param)
			if (!query) {
				if (err) err('No search query')
				return
			}

			cb(query)
		}
	},
	mounted() {
		this[SET_GROUP_BY_INDEX.action](-1)
		this[SET_CURRENT_FILTER.action]('')
		this[ASSISTANT_MODE.action](AssistantModes.FILTER_COLLECTION)

		/**
		 * Open a single style if the url contains a query with a styleId
		 * f.ex. gannispace.com/collection?q=A3765_135 -> opens A3765_135
		 */
		this.parseUrl('q', param => {
			const isStyle = this.allStyles.find(style => style.styleId === param)

			if (!isStyle) {
				console.error(
					`The query string: "${param}" is not an existing style. No style to open.`
				)
				return
			}

			if (param && isStyle) {
				sendTracking('Product click', param)

				this[OPEN_STYLE_CONTENT.action](param)
			}
		})
	}
}
</script>
