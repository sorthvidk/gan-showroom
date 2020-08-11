<template>
	<div class="color-picker" v-if="active">
		<div class="window window--no-status window--tight">
			<header class="window__top">
				<span class="title">Choose color</span>
			</header>
			<div class="window__content">
				<ul>
					<li v-for="(item, key) in availableColorList" :key="item">
						<button @click="toggleColorClickHandler(item)">
							<strong>{{item}}</strong> <span v-if="colorIsChosen(item)">X</span>
						</button>					
					</li>
				</ul>
				<button class="button save" @click="saveClickHandler" :class="{'is-disabled':chosenColorList.length == 0}">OK</button>
				<button class="button cancel" @click="cancelClickHandler">Cancel</button>
			</div>
		</div>
	</div>
</template>

<script>

import { vuex, mapActions, mapState } from 'vuex'

import {
	TOGGLE_COLOR_PICKER
} from '~/model/constants'

export default {
	name:'color-picker',
	computed: {
		...mapState({
			colorPickerStyle: state => state.collection.colorPickerStyle,
			colorPickerChosenColorList: state => state.collection.colorPickerChosenColorList,
			colorPickerCallback: state => state.collection.colorPickerCallback,
		}),
		availableColorList() {
			return this.colorPickerStyle.colorNames.split(', ')
		}
	},
	data() {
		return {
			active: false,
			chosenColorList: []
		}
	},
	watch: {
		colorPickerStyle(newVal) {
			if (newVal) {
				this.active = true
			}
			else {
				this.active = false
			}
		},
		colorPickerChosenColorList(newVal) {
			if (newVal) {
				this.chosenColorList = newVal
			}			
		}
	},
	methods: {
		...mapActions([			
			'collection/' + TOGGLE_COLOR_PICKER.action
		]),
		saveClickHandler() {
			if ( this.chosenColorList.length === 0 ) return;

			console.log("colorPickerCallback",this.colorPickerCallback)
			if ( this.colorPickerCallback ) {
				try {
					this.colorPickerCallback(this.colorPickerStyle, this.chosenColorList)
				} catch (error) { }
			}
			this.cancelClickHandler();
		},
		cancelClickHandler() {
			this['collection/' + TOGGLE_COLOR_PICKER.action]({styleItem:null, chosenColorList:null, callbackFunction:null})
		},
		colorIsChosen(colorString) {
			let found = false;
			for (var i = this.chosenColorList.length - 1; i >= 0; i--) {
				if ( this.chosenColorList[i] === colorString ) found = true;
			}
			return found;
		},
		toggleColorClickHandler(colorString) {
			if ( !this.colorIsChosen(colorString) ) {
				this.chosenColorList.push(colorString);
			} else {
				this.chosenColorList = this.chosenColorList.filter(e => e != colorString)
			}
			console.log("after toggle",this.chosenColorList)
		}
	}
};
</script>