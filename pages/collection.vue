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
	ASSISTANT_MODE,
	OPEN_STYLE_CONTENT
} from '~/model/constants'

export default {
	name: 'collection-page',
	components: {
		Collection,
		Window
	},
	computed: {
		...mapState(['windowList']),
		...mapState('user', ['mousepos']),
		...mapState('collection', ['allStyles'])
	},
	methods: {
		...mapActions([OPEN_STYLE_CONTENT.action]),
		...mapActions('collection', [
			SET_GROUP_BY_INDEX.action,
			SET_CURRENT_FILTER.action
		]),
		...mapActions('assistant', [ASSISTANT_MODE.action]),

		setTransformOrigin(el) {
			el.style.transformOrigin = `${this.mousepos.x}px ${this.mousepos.y}px`
			el.style.transitionDelay = `${el.dataset.index * 0.05 - 0.05}s`
		}
	},
	mounted() {
		this[SET_GROUP_BY_INDEX.action](-1)
		this[SET_CURRENT_FILTER.action]('')
		this[ASSISTANT_MODE.action](AssistantModes.FILTER_COLLECTION)

		/**
		 * Parse url query and open corresponding style, if it exists
		 */
		if (
			this.$route.query.q &&
			this.allStyles.find(style => style.styleId === this.$route.query.q)
		) {
			this[OPEN_STYLE_CONTENT.action](this.$route.query.q)
		}
	}
}
</script>
