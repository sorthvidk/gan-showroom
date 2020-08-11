<template>
	<div class="archive">
		<shortcut
			v-for="(item, i) in archiveShortcuts"
			:key="'shortcut' + i"
			:type="item.type"
			:position-h="item.posH"
			:position-v="item.posV"
			:icon="item.icon"
			:label="item.label"
			:shortcut-id="item.shortcutId"
			:actions="item.actions"
			:window-content="item.windowContent"
			:href="item.href"
			:nth-child="i"
		/>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import shortcut from './../framework/Shortcut.vue'
import ShortcutTypes from '~/model/shortcut-types'

export default {
	name: 'archive',
	components: { shortcut },
	props: {
		shortcuts: { type: Array }
	},
	computed: {
		...mapState('shortcuts', ['list']),
		archiveShortcuts() {
			return this.list.filter(shortcut =>
				this.shortcuts.includes(shortcut.shortcutId)
			)
		}
	},
	mounted() {
		console.log('Archive erik', this.shortcuts, this.archiveShortcuts)
	}
}
</script>