<template>
	<div class="access-menu">
		
		<button class="access-menu__trigger">
			🍔
		</button>

		<div class="access-menu__panel">
			<ul>
				<li>
					<shortcut
						v-for="item in menuItems"
						:key="item.shortcutId"
						:item="item"
					/>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>

import { vuex, mapActions, mapState } from 'vuex'

import Support from '~/components/framework/Support.vue'

import ContentTypes from '~/model/content-types'
import ShortcutTypes from '~/model/shortcut-types'
import CollectionLayouts from '~/model/collection-layouts'

export default {
	name:'access-menu',
	components: {
		Shortcut
	},
	data() {
		return {
			menuItems: [
				{
					type: ShortcutTypes.WINDOW,
					shortcutId: 'collection-ps21',
					// icon: '/img/shortcuts/ps21.png',
					icon: '/img/collage/dress2.png',
					label: 'PS21 collection',
					posH: 1,
					posV: 1,
					actions: [
						{
							name: COLLECTION_LAYOUT_CHANGE.action,
							param: CollectionLayouts.GRID
						}
					],
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
			]
		}
	},	
	computed: {
		...mapState({
			progressPct: state => state.progressPct
		}),
		text() {
			if ( this.progressPct == 0 ) return this.textStart;
			else if (this.progressPct == 100 ) return this.textEnd;
			else return this.textProgress;
		}
	}
};
</script>