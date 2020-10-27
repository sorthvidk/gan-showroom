<template>
	<div class="color-picker" v-if="active">
		<div class="window window--no-status window--tight">
			<header class="window__top">
				<span class="title">Choose color</span>
				<button class="button close" @click.stop="cancelClickHandler">
					<span class="icon">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
							<path
								d="M15.7 15l7.8-7.8-.7-.7-7.8 7.8-7.8-7.8-.7.7 7.8 7.8-7.8 7.8.7.7 7.8-7.8 7.8 7.8.7-.7-7.8-7.8z"
							/>
						</svg>
					</span>
				</button>
			</header>
			<div class="window__content">
				<div class="inner">
					<img src="/img/gan_color_wheel.png" alt="Color wheel" />
					<ul>
						<li v-for="(item, key) in availableColorList" :key="item">
							<button @click="toggleColorClickHandler(item)" :class="{'is-active': colorIsChosen(item)}">
								<strong>{{item}}</strong>
							</button>
						</li>
					</ul>
				</div>

				<button :class="{'is-inactive':showErrorMessage}" class="button ok" @click="saveClickHandler">OK</button>
				<p v-if="showErrorMessage">You have to choose at least 1 color</p>
			</div>
		</div>
	</div>
</template>

<script>
import { vuex, mapActions, mapState } from 'vuex'

import { TOGGLE_COLOR_PICKER } from '~/model/constants'

export default {
	name: 'color-picker',
	computed: {
		...mapState({
			keyPressed: state => state.keyPressed,
			colorPickerStyle: state => state.collection.colorPickerStyle,
			colorPickerChosenColorList: state =>
				state.collection.colorPickerChosenColorList,
			colorPickerCallback: state => state.collection.colorPickerCallback
		})
	},
	data() {
		return {
			active: false,
			showErrorMessage: false,
			availableColorList: [],
			chosenColorList: []
		}
	},
	watch: {
		colorPickerStyle(newVal) {
			if (newVal) {
				this.active = true
				this.availableColorList = newVal.colorNames.split(', ')
			} else {
				this.active = false
				this.availableColorList = []
			}
		},
		colorPickerChosenColorList(newVal) {
			if (newVal) {
				this.chosenColorList = []
				newVal.forEach(i => this.chosenColorList.push(i))
			} else {
				this.chosenColorList = []
			}
		},
		keyPressed(event) {
			if (event.key === 'Escape') {
				this.cancelClickHandler()
			}
		}
	},
	methods: {
		...mapActions('collection', [TOGGLE_COLOR_PICKER.action]),
		saveClickHandler() {
			if (this.chosenColorList.length === 0) {
				this.showErrorMessage = true
				return
			}
			if (this.colorPickerCallback) {
				try {
					this.colorPickerCallback(this.colorPickerStyle, this.chosenColorList)
				} catch (error) {}
			}
			this.cancelClickHandler()
		},
		cancelClickHandler() {
			this.chosenColorList = []
			this[TOGGLE_COLOR_PICKER.action]({
				styleItem: null,
				chosenColorList: null,
				callbackFunction: null
			})
		},
		colorIsChosen(colorString) {
			let found = false
			for (var i = this.chosenColorList.length - 1; i >= 0; i--) {
				if (this.chosenColorList[i] === colorString) found = true
			}
			return found
		},
		toggleColorClickHandler(colorString) {
			this.showErrorMessage = false

			if (!this.colorIsChosen(colorString)) {
				this.chosenColorList.push(colorString)
			} else {
				this.chosenColorList = this.chosenColorList.filter(
					e => e != colorString
				)
			}
		}
	}
}
</script>