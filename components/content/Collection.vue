<template>
	<div
		class="collection"
		:style="{ height: shifting ? 0 : '', overflow: shifting ? 'hidden' : '' }"
	>
		<group-navigation />
		<div
			class="collection__group"
			v-for="(group, i) in groupsRenderList"
			:key="'group' + i"
		>
			<collection-header v-if="group.styles.length" :group="group" />

			<div class="collection__list">
				<collection-item
					v-bind="item"
					v-for="(item, j) in group.styles"
					:key="item.styleId"
					:data-index="j"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import CollectionItem from '~/components/content/CollectionItem.vue'
import CollectionHeader from '~/components/content/CollectionHeader.vue'
import WindowContent from '~/components/framework/WindowContent.vue'
import GroupNavigation from '~/components/content/GroupNavigation.vue'
import { DASHBOARD_DARK } from '~/model/constants'

export default {
	extends: WindowContent,
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
			'activeGroup'
		]),

		groupsRenderList() {
			const isActive = g =>
				!this.activeGroup || g.groupId === this.activeGroup.groupId

			return (
				this.authorizedGroups
					// .filter(g => g.styles.length)
					.filter(isActive)
					.map(group => ({
						...group,
						styles: this.currentStyles.filter(e => e.groupId === group.groupId)
					}))
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
