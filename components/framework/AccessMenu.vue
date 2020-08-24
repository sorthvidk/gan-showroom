<template>
	<div class="access-menu" @click="() => open = !open">
		<button
			class="access-menu__trigger"
			@click.stop="() => open = !open"
			:class="{ open }"
		>{{open ? '—' : '|||'}} ARCHIVE</button>

		<div class="access-menu__backdrop" :class="{ open }"></div>

		<div class="access-menu__panel" :class="{ open }">
			<ul>
				<li>
					<shortcut v-for="item in menuItems" :key="item.shortcutId" :item="item" />
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { vuex, mapActions, mapState } from 'vuex'

import Support from '~/components/framework/Support.vue'
import Shortcut from '~/components/framework/Shortcut.vue'

import ContentTypes from '~/model/content-types'
import ShortcutTypes from '~/model/shortcut-types'
import CollectionLayouts from '~/model/collection-layouts'

export default {
	name: 'access-menu',
	components: {
		Shortcut
	},
	data() {
		return {
			open: false,
			menuItems: [
				{
					type: ShortcutTypes.WINDOW,
					shortcutId: 'collection-ps21',
					// icon: '/img/collage/dress2.png',
					label: 'PS21 collection',
					windowContent: [
						{
							title: 'PS21 collection',
							contentId: 'ps21-collection',
							type: ContentTypes.collection,
							contentComponentProps: {
								collectionId: 'PS21'
							}
						}
					]
				},
				{
					type: ShortcutTypes.URL,
					shortcutId: 'responsibility-report',
					// icon: '/img/collage/shirt2.png',
					label: 'Responsibility (pdf)',
					href: '/files/GANNI_RESPONSIBILITY_REPORT_19.pdf'
				}
			]
		}
	},
	computed: {
		...mapState(['progressPct']),
		text() {
			if (this.progressPct == 0) return this.textStart
			else if (this.progressPct == 100) return this.textEnd
			else return this.textProgress
		}
	}
}
</script>