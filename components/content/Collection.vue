<template>
	<div class="collection" :class="{ 'collection--fun': collectionLayout == 1 }">
		<div v-if="!activeGroup">
			<!-- ALL STYLES -->
			<div
				class="collection__group"
				v-for="(group, groupKey) in groupsList"
				:key="'group' + groupKey"
			>
				<h4 v-if="groupsList.length > 1">{{ group.label }}</h4>
				<div>
					<!-- <collection-item
						v-for="(item, key) in group.styles"
						:key="'collectionItem' + key"
						v-bind="{ ...item }"
					/> -->
				</div>
			</div>
		</div>
		<div v-else>
			<!-- ONLY ACTIVE GROUP -->
			<collection-item
				v-for="(item, key) in currentStyles"
				:key="'collectionItem' + key"
				v-bind="{ ...item }"
			/>
		</div>
	</div>
</template>

<script>
import { vuex, mapActions, mapState } from 'vuex'

import CollectionItem from '~/components/content/CollectionItem.vue'

import WindowContent from '~/components/framework/WindowContent.vue'

export default {
	extends: WindowContent,
	name: 'collection',
	components: {
		CollectionItem
	},
	computed: {
		...mapState({
			collectionLayout: state => state.collectionLayout,
			currentStyles: state => state.collection.currentStyles,
			collectionGroups: state => state.collection.groups,
			activeGroup: state => state.collection.activeGroup
		}),

		groupsList() {
			let groups = []

			let cl = this.collectionGroups.length
			for (var j = 0; j < cl; j++) {
				let groupItem = this.collectionGroups[j]

				groups.push({
					label: groupItem.name,
					styles: [
						this.currentStyles.filter(e => e.groupId === groupItem.groupId)
					]
				})
			}
			return groups
		}
	},
	watch: {
		collectionLayout(newVal) {
			console.log('collectionLayout', newVal)
		}
	}
}
</script>
