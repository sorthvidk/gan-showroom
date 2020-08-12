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
		})
	},
	data() {
		return {
			active: false,
			availableColorList: [],
			chosenColorList: []
		}
	},
	watch: {
		colorPickerStyle(newVal) {
			if (newVal) {
				this.active = true
				this.availableColorList = newVal.colorNames.split(', ')
			}
			else {
				this.active = false
				this.availableColorList = []
			}
		},
		colorPickerChosenColorList(newVal) {
			if (newVal) {
				this.chosenColorList = [] 
				newVal.forEach(i=>this.chosenColorList.push(i))
			}
			else {
				this.chosenColorList = []				
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
			this.chosenColorList = []
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
			console.log("toggle '"+colorString+"'")
			if ( !this.colorIsChosen(colorString) ) {
				console.log("this.chosenColorList??? a",this.chosenColorList)
				this.chosenColorList.push(colorString);
			} else {
				console.log("this.chosenColorList??? r",this.chosenColorList)
				this.chosenColorList = this.chosenColorList.filter(e => e != colorString)
			}
			console.log("after toggle",this.chosenColorList)
		}
	}
};
</script>