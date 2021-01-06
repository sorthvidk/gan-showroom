<template>
	<div class="group-navigation">
		<label for="all">
			<input
				id="all"
				name="group-navigation"
				type="radio"
				@change="(e) => e.target.checked && groupHandler('')"
				:checked="!activeGroup"
			/>
			All ({{ allStyles.length }})
		</label>
		<label
			:for="group.groupId"
			v-for="group in authorizedGroups"
			:key="group.name"
			:class="{ disabled: group.styles.length === 0 }"
		>
			<input
				:id="group.groupId"
				name="group-navigation"
				type="radio"
				:disabled="group.styles.length === 0"
				@change="(e) => e.target.checked && groupHandler(group.groupId)"
				:checked="activeGroup && activeGroup.groupId === group.groupId"
			/>
			{{ group.name }}
			({{ group.styles.length }})
		</label>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import {
	SET_NEXT_GROUP,
	SET_PREVIOUS_GROUP,
	SET_GROUP_BY_IDENTIFIER,
} from '~/model/constants'
export default {
	name: 'group-navigation',
	computed: {
		...mapState('collection', ['allStyles', 'activeGroup', 'authorizedGroups']),
		groupName() {
			if (this.activeGroup) {
				return this.activeGroup.name
			} else {
				return 'All styles'
			}
		},
	},
	methods: {
		...mapActions('collection', [
			SET_PREVIOUS_GROUP.action,
			SET_NEXT_GROUP.action,
			SET_GROUP_BY_IDENTIFIER.action,
		]),
		groupPrevHandler() {
			this[SET_PREVIOUS_GROUP.action]()
		},
		groupNextHandler() {
			this[SET_NEXT_GROUP.action]()
		},
		groupHandler(id) {
			this[SET_GROUP_BY_IDENTIFIER.action](id)
		},
	},
}
</script>