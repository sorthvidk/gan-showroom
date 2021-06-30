<template>
	<div
		class="collection"
		:style="{ height: shifting ? 0 : '', overflow: shifting ? 'hidden' : '' }"
	>
		<group-navigation />

		<div
			class="collection__group"
			v-for="obj in filteredList"
			:key="obj.group.groupId"
		>
			<collection-header :group="obj.group" />

			<div class="collection__list">
				<collection-item
					v-bind="item"
					v-for="item in obj.styles"
					:key="item.styleId"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import CollectionItem from '~/components/content/CollectionItem.vue'
import CollectionHeader from '~/components/content/CollectionHeader.vue'
import GroupNavigation from '~/components/content/GroupNavigation.vue'
import { DASHBOARD_DARK } from '~/model/constants'

export default {
	name: 'collection',
	components: {
		CollectionItem,
		CollectionHeader,
		GroupNavigation
	},
	data: () => ({
		shifting: false
	}),
	computed: {
		...mapState('collection', [
			'currentStyles',
			'authorizedGroups',
			'activeGroup',
			'activeFilter'
		]),
		...mapGetters('collection', ['groups']),

		filteredList() {
			return !this.activeFilter.filterId
				? this.groupsRenderList
				: this.groupsRenderList.map(obj => ({
						...obj,
						styles: obj.styles.filter(style =>
							style.filters.includes(this.activeFilter.filterId)
						)
				  }))
		},

		groupsRenderList() {
			const isActive = groupId =>
				!this.activeGroup || groupId === this.activeGroup.groupId

			// console.log(
			// 	'activeGroup',
			// 	Object.values(this.groups).filter(({ group }) =>
			// 		isActive(group.groupId)
			// 	),
			// 	this.activeFilter
			// )

			return Object.values(this.groups).filter(({ group }) =>
				isActive(group.groupId)
			)
		}
	},

	watch: {
		groupsRenderList() {
			this.shifting = true
			this.$nextTick(() => (this.shifting = false))
		}
	},

	methods: {
		...mapActions('utils', [DASHBOARD_DARK.action])
	},

	mounted() {
		this[DASHBOARD_DARK.action](false)
	}
}
</script>
