<template>
	<div>
		<button
			v-if="isMobile"
			:class="['dashboard__menu-button', !menuClosed ? 'moved-up' : '']"
			@click="toggleMenu"
		>
			{{ !menuClosed ? 'CLOSE' : 'MENU' }}
		</button>
		<transition-expand>
			<div
				v-show="!isMobile || !menuClosed"
				class="dashboard__shortcuts"
				@click="closeMenu"
			>
				<shortcut
					v-for="item in desktopIcons"
					:key="item.shortcutId"
					:label="item.label"
					:shortcut-id="item.shortcutId"
				/>

				<button
					@click="openMenu"
					:class="{ open: showMenu }"
					class="shortcut shortcut-bottombar"
				>
					<span class="text">Tools</span>
				</button>
			</div>
		</transition-expand>

		<media-library v-if="showMenu" />
	</div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import TransitionExpand from '~/components/transitions/Expand.vue'
import ShortcutTypes from '~/model/shortcut-types'
import Shortcut from '~/components/framework/Shortcut.vue'
import { MENU_SHOW } from '~/model/constants'
import MediaLibrary from '~/components/content/MediaLibrary.vue'

export default {
	name: 'bottombar',
	components: {
		TransitionExpand,
		Shortcut,
		MediaLibrary
	},
	data() {
		return {
			menuClosed: !this.isMobile
		}
	},
	computed: {
		...mapState('shortcuts', ['list', 'textStyledWithoutIcon']),
		...mapState('utils', ['isMobile', 'showMenu']),
		...mapGetters('shortcuts', ['authorizedShortcuts']),

		desktopIcons() {
			return this.authorizedShortcuts.filter(
				s => s.type == ShortcutTypes.WINDOW || s.type == ShortcutTypes.URL
			)
		}
	},
	methods: {
		...mapActions('utils', [MENU_SHOW.action]),
		toggleMenu() {
			this.menuClosed = !this.menuClosed
		},
		closeMenu() {
			this.menuClosed = true
		},
		openMenu() {
			this[MENU_SHOW.action]({ toggle: true })
		}
	}
}
</script>
