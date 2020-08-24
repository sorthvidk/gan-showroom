<template>
	<div class="archive">
		<shortcut
			v-for="(item, i) in authenticatedShortcuts"
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
		...mapState(['loggedIn']),
		...mapState('collection', ['collections']),
		...mapState('shortcuts', ['list']),
		archiveShortcuts() {
			return this.list.filter(shortcut =>
				this.shortcuts.includes(shortcut.shortcutId)
			)
		},
		authenticatedShortcuts() {
			return this.archiveShortcuts.filter(shortcut => {
				/**
				 * if the shortcut isn't a collection icon, just return true,
				 * b/c they are never password protected
				 */
				if (
					!shortcut.windowContent ||
					!shortcut.windowContent[0].contentComponentProps ||
					!shortcut.windowContent[0].contentComponentProps.collectionId
				) {
					return true
				}

				const shortcutCollection =
					shortcut.windowContent[0].contentComponentProps.collectionId
				const collection = this.collections.find(
					c => c.collectionId === shortcutCollection
				)

				return (
					!collection.passwords || // open for all
					!collection.passwords.length || // open for all
					collection.passwords.includes(this.loggedIn.hash) // collection open for used password
				)
			})
		},
		mounted() {}
	}
}
</script>