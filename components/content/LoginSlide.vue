<template>
	<div class="login-slide" :class="type" v-lazy:background-image="backgroundImageObj">
		<div class="logo" v-if="type === 'one'" >
			<img :src="'/img/ganni_logo_low.png'" alt="Logo">
		</div>
		
		<vue-typer v-if="text" :text="text" :repeat="0" :pre-type-delay="1200" :type-delay="40"></vue-typer>
	</div>
</template>

<script>
export default {
	name: 'login-slide',
	props: {
		type: {
			type: String,
			default: 'two',
			required: false
		},
		text: {
			type: String,
			default: '',
			required: false
		},
		backgroundImage: {
			type: String,
			default: '',
			required: false
		},
		backgroundImageLow: {
			type: String,
			default: '',
			required: false
		}
	},
	data() {
		return {
			backgroundImageObj: {
				src: this.backgroundImage,
				loading: this.backgroundImageLow
			}
		}
	}
};
</script>