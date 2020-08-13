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
import Shortcut from './../framework/Shortcut.vue'

export default {
	name: 'archive',
	components: { Shortcut },
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
	}
}
</script>