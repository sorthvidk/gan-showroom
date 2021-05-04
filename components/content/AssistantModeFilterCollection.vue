<template>
	<div>
		<div
			class="assistant__content"
			:class="{
				'is-collapsed': isMobile && !expanded,
			}"
		>
			<div class="assistant__filters">
				<h3>{{ texts.collection.headline }}</h3>
				<p>{{ texts.collection.bodyText }}</p>

				<!-- <div class="assistant__search">
					<input
						type="text"
						placeholder="filter"
						:value="searchstring"
						@input="onSearchInput"
					/>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 451 451">
						<path
							d="M447 428L337 318a192 192 0 10-19 19l110 110c3 3 6 4 10 4s6-1 9-4c5-5 5-14 0-19zM27 192a165 165 0 11331 1 165 165 0 01-331-1z"
						/>
					</svg>
				</div> -->

				<div class="assistant__filters__list">
					<filter-button
						v-for="(item, key) in groupFiltersNonNull"
						:key="key"
						:name="item.name"
						:count="item.styleIds.length"
						:filter-id="item.filterId"
						:is-big="['accessories', 'shoes'].includes(item.name.toLowerCase())"
					/>
					<span class="filter-button" v-if="groupFiltersNonNull.length % 2 > 0">
						&nbsp;
					</span>
				</div>
			</div>
		</div>

		<div class="assistant__ctas">
			<button class="button view-wishlist button--half" @click="viewWishList">
				<p>{{ viewWishListButtonLabel }}</p>
			</button>

			<a
				class="button download-collection button--half"
				:class="{ 'is-animating': downloadPreparing }"
				@click="downloadCollection"
				:href="
					__prod__
						? `${pdfDownloadLink}&url=${encodeURIComponent(collectionUrl)}`
						: '#'
				"
			>
				<!-- :href="pdfDownloadLink" -->
				<p>{{ downloadCollectionButtonLabel }}</p>
			</a>
		</div>
	</div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import {
	OPEN_WISH_LIST,
	DOWNLOAD_PREPARING,
	SET_PREVIOUS_GROUP,
	SET_NEXT_GROUP,
	SET_SEARCHSTRING,
} from '~/model/constants'
import FilterButton from '~/components/content/FilterButton.vue'

export default {
	name: 'assistant-mode-filter-collection',
	components: {
		FilterButton,
	},
	computed: {
		// ...mapState('user', ['keyPressed']),
		...mapState('utils', ['isMobile', 'downloadPreparing', '__prod__']),
		...mapState('assistant', ['expanded', 'pdfDownloadLink', 'texts']),
		...mapState('collection', [
			'groupFilters',
			'activeGroup',
			'activeFilter',
			'searchstring',
		]),
		...mapGetters('assistant', ['viewWishListButtonLabel']),
		downloadCollectionButtonLabel() {
			if (this.activeFilter.filterId) {
				return 'Download ' + this.activeFilter.name
			}
			return 'Download all'
		},
		collectionUrl() {
			const filterParam = this.activeFilter.filterId
				? 'filter=' + this.activeFilter.filterId
				: ''
			const groupParam = this.activeGroup
				? 'group=' + this.activeGroup.groupId
				: ''
			const delimiter = filterParam && groupParam ? '&' : ''

			if (filterParam || groupParam) {
				return `${window.location}export/?${filterParam}${delimiter}${groupParam}`
			}
			// /export with no params shows all styles
			return `${window.location}export`
		},
		groupFiltersNonNull() {
			const others = {
				filterId: 'others',
				name: 'Others',
				order: 9999,
				styleIds: this.groupFilters
					.filter((f) => !f.filterId)
					.map((f) => f.styleIds)
					.flat(),
			}
			if (others.styleIds.length) {
				console.warn(
					`Found no matching filters for:\n\n${others.styleIds.join(
						'\n'
					)}\n\nThese items will only be shown when no filter is active`
				)
			}
			return this.groupFilters.filter((f) => f.filterId)
		},
	},
	watch: {
		// keyPressed(event) {
		// 	if (event.key === 'ArrowLeft') {
		// 		this.previousGroupHandler()
		// 	}
		// 	if (event.key === 'ArrowRight') {
		// 		this.nextGroupHandler()
		// 	}
		// }
	},
	methods: {
		...mapActions([OPEN_WISH_LIST.action]),
		...mapActions('collection', [
			SET_PREVIOUS_GROUP.action,
			SET_NEXT_GROUP.action,
			SET_SEARCHSTRING.action,
		]),
		...mapActions('utils', [DOWNLOAD_PREPARING.action]),
		viewWishList() {
			this[OPEN_WISH_LIST.action]()
		},
		downloadCollection() {
			if (window.GS_LOGS) console.log('Download collection')
			// history.pushState({}, '', this.collectionUrl)
			// setTimeout(() => history.back(), 30000) // revert url after 30 sec
			this[DOWNLOAD_PREPARING.action](true)
		},
		previousGroupHandler() {
			this[SET_PREVIOUS_GROUP.action]()
		},
		nextGroupHandler() {
			this[SET_NEXT_GROUP.action]()
		},
		onSearchInput(event) {
			this[SET_SEARCHSTRING.action](event.target.value)
		},
	},
	// beforeDestroy() {
	// 	this[SET_SEARCHSTRING.action]('')
	// },
}
</script>