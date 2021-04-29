<template>
	<div
		class="collection"
		:class="{ 'collection--fun': collectionLayout == 1 }"
		:style="{ height: shifting ? 0 : '', overflow: shifting ? 'hidden' : '' }"
	>
		<group-navigation />
		<div
			class="collection__group"
			v-for="(group, i) in groupsRenderList"
			:key="'group' + i"
		>
			<!-- <h4 v-if="groupsRenderList.length > 1 && group.styles.length">
				{{ group.groupId.replace('-', ' ') }}
			</h4> -->

			<collection-header
				v-if="group.styles.length"
				:group="group"
				:mode="'flash'"
			/>

			<transition-group
				name="staggered-fade"
				tag="div"
				v-on:before-enter="beforeEnter"
				v-on:enter="enter"
				v-on:leave="leave"
				mode="out-in"
				class="collection__list"
			>
				<collection-item
					v-bind="item"
					v-for="(item, j) in group.styles"
					:key="`${item.styleId}${j}${i}`"
					:data-index="j"
				/>
				<!-- :canvasHover="j === 1" -->
			</transition-group>
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
			'collectionLayout',
			'currentStyles',
			// 'allGroups',
			'authorizedGroups',
			'activeGroup',
			'searchstring'
		]),

		groupsRenderList() {
			const isActive = g =>
				!this.activeGroup || g.groupId === this.activeGroup.groupId

			return this.authorizedGroups
				.filter(g => g.styles.length)
				.filter(isActive)
				.map(group => ({
					...group,
					styles: this.currentStyles.filter(e => {
						const sameGroup = e.groupId === group.groupId
						const searchableKeys = [
							'styleId',
							'programName',
							'material',
							'name'
						]
						const searchedFor = searchableKeys.find(key => {
							return e[key]
								.toLowerCase()
								.includes(this.searchstring.toLowerCase())
						})
						return sameGroup && searchedFor
					})
				}))

			// let groups = []

			// let cl = this.authorizedGroups.length
			// for (var j = 0; j < cl; j++) {
			// 	let groupItem = this.authorizedGroups[j]

			// 	groups.push({
			// 		name: groupItem.name,
			// 		styles: this.currentStyles.filter(
			// 			(e) => e.groupId === groupItem.groupId
			// 		),
			// 	})
			// }
			// return groups
		}
	},

	watch: {
		groupsRenderList() {
			this.shifting = true
			this.$nextTick(() => (this.shifting = false))
		}
	},

	methods: {
		...mapActions('utils', [DASHBOARD_DARK.action]),
		beforeEnter(el) {
			// el.style.transition = 'opacity .3s'
			el.style.opacity = 0
		},
		enter(el, done) {
			var delay = 100 + el.dataset.index * 50
			setTimeout(() => {
				el.style.opacity = 1
				done()
			}, delay)
		},
		leave(el, done) {
			var delay = el.dataset.index * 150
			setTimeout(() => {
				el.style.opacity = 1
				done()
			}, 0)
		}
	},

	mounted() {
		this[DASHBOARD_DARK.action](false)
	}
}
</script>
