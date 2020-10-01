<template>
	<div class="collection" :class="{ 'collection--fun': collectionLayout == 1 }">
		<div v-if="!activeGroup">
			<!-- ALL STYLES -->
			<div
				class="collection__group"
				v-for="(group, groupKey) in groupsRenderList"
				:key="'group' + groupKey"
			>
				<h4 v-if="groupsRenderList.length > 1">{{ group.name }}</h4>
				<div>
					<collection-item
						v-for="(item, key) in group.styles"
						:key="'group' + groupKey + 'collectionItem' + key"
						v-bind="{ ...item }"
					/>
				</div>
			</div>
		</div>
		<div v-else>
			<!-- ONLY ACTIVE GROUP -->
			<div class="collection__group">
				<div>
					<collection-item
						v-for="(item, key) in currentStyles"
						:key="'collectionItem' + key"
						v-bind="{ ...item }"
					/>
				</div>
			</div>
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
			allGroups: state => state.collection.allGroups,
			activeGroup: state => state.collection.activeGroup
		}),

		groupsRenderList() {
			let groups = []

			let cl = this.allGroups.length
			for (var j = 0; j < cl; j++) {
				let groupItem = this.allGroups[j]

				groups.push({
					name: groupItem.name,
					styles: this.currentStyles.filter(
						e => e.groupId === groupItem.groupId
					)
				})
			}
			console.log('groups', groups)
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
