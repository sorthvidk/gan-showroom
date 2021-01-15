<template>
	<div class="collection" :class="{ 'collection--fun': collectionLayout == 1 }">
		<div
			class="collection__group"
			v-for="(group, i) in groupsRenderList"
			:key="'group' + i"
		>
			<h4 v-if="groupsRenderList.length > 2 && group.styles.length">
				{{ group.name }}
			</h4>

			<collection-header :group="group" :mode="'flash'" />

			<transition-group
				name="staggered-fade"
				tag="div"
				v-on:before-enter="beforeEnter"
				v-on:enter="enter"
				v-on:leave="leave"
				mode="out-in"
			>
				<collection-item
					v-bind="item"
					v-for="(item, j) in group.styles"
					:key="`${item.styleId}${j}${i}`"
					:data-index="j"
				/>
			</transition-group>
		</div>
	</div>
</template>

<script>
import { vuex, mapActions, mapState } from 'vuex'
import CollectionItem from '~/components/content/CollectionItem.vue'
import CollectionHeader from '~/components/content/CollectionHeader.vue'
import WindowContent from '~/components/framework/WindowContent.vue'
import { TweenLite } from 'gsap'

export default {
	extends: WindowContent,
	name: 'collection',
	components: {
		CollectionItem,
		CollectionHeader,
	},
	computed: {
		...mapState('collection', [
			'collectionLayout',
			'currentStyles',
			// 'allGroups',
			'authorizedGroups',
			'activeGroup',
		]),

		groupsRenderList() {
			const isActive = (g) =>
				!this.activeGroup || g.groupId === this.activeGroup.groupId

			return this.authorizedGroups
				.filter((g) => g.styles.length)
				.filter(isActive)
				.map((group) => ({
					...group,
					styles: this.currentStyles.filter((e) => e.groupId === group.groupId),
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
		},
	},
	// watch: {
	// 	collectionLayout(newVal) {
	// 		console.log('collectionLayout', newVal)
	// 	}
	// }
	methods: {
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
		},
	},
}
</script>
