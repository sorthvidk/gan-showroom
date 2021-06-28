<template>
	<div class="group-navigation">
		<div class="group-navigation__content">
			<label for="all">
				<input
					id="all"
					name="group-navigation"
					type="radio"
					@change="e => e.target.checked && groupHandler('')"
					:checked="!activeGroup"
				/>
				All ({{ allStyles.length }})
			</label>
			<label
				:for="groupId"
				v-for="(obj, groupId) in groups"
				:key="groupId"
				:class="{ disabled: obj.styles.length === 0 }"
			>
				<input
					:id="groupId"
					name="group-navigation"
					type="radio"
					:disabled="obj.styles.length === 0"
					@change="e => e.target.checked && groupHandler(groupId)"
					:checked="activeGroup && activeGroup.groupId === groupId"
				/>
				{{ obj.group.name }}
				({{ obj.styles.length }})
			</label>
		</div>
	</div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import {
	SET_NEXT_GROUP,
	SET_PREVIOUS_GROUP,
	SET_GROUP_BY_IDENTIFIER
} from '~/model/constants'
export default {
	name: 'group-navigation',
	computed: {
		...mapState('collection', ['allStyles', 'activeGroup', 'authorizedGroups']),
		...mapGetters('collection', ['groups']),
		groupName() {
			if (this.activeGroup) {
				return this.activeGroup.name
			} else {
				return 'All styles'
			}
		}
	},
	methods: {
		...mapActions('collection', [
			SET_PREVIOUS_GROUP.action,
			SET_NEXT_GROUP.action,
			SET_GROUP_BY_IDENTIFIER.action
		]),
		groupPrevHandler() {
			this[SET_PREVIOUS_GROUP.action]()
		},
		groupNextHandler() {
			this[SET_NEXT_GROUP.action]()
		},
		groupHandler(id) {
			this[SET_GROUP_BY_IDENTIFIER.action](id)
		}
	}
}
</script>
