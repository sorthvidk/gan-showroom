import {
	SAVE_AS_BACKGROUND,
	COLLAGE_IS_OPEN,
	SAVE_COLLAGE,
	MAKE_BACKGROUND,
	CHANGE_COLLAGE
} from '~/model/constants'

const SCALE = 4.5
const SCALE_2 = 2

export const state = () => ({
	webcamImage: '',

	collageIsOpen: false,
	saveCollage: false,
	makeBackground: false,
	changeCollage: {},

	clothes: {
		background: [
			{
				src: '/img/collage/empty.png',
				y: 0,
				x: 0,
				width: { mobile: 560, desktop: 600 },
				height: { mobile: 530, desktop: 520 },

				layer: 'background'
			},
			{
				src: '/img/collage/bg1.jpg',
				y: { mobile: 0, desktop: -150 },
				x: 0,
				width: { mobile: 360, desktop: 1100 / SCALE_2 },
				height: { mobile: 510, desktop: 1400 / SCALE_2 },

				layer: 'background'
			},
			{
				src: '/img/collage/bg2.jpg',
				y: { mobile: 0, desktop: -150 },
				x: 0,
				width: { mobile: 360, desktop: 1100 / SCALE_2 },
				height: { mobile: 510, desktop: 1400 / SCALE_2 },

				layer: 'background'
			},
			{
				src: '/img/collage/bg3.jpg',
				y: { mobile: 0, desktop: -150 },
				x: 0,
				width: { mobile: 360, desktop: 1100 / SCALE_2 },
				height: { mobile: 510, desktop: 1400 / SCALE_2 },

				layer: 'background'
			},
			{
				src: '/img/collage/bg4.jpg',
				y: { mobile: 0, desktop: -150 },
				x: 0,
				width: { mobile: 360, desktop: 1100 / SCALE_2 },
				height: { mobile: 510, desktop: 1400 / SCALE_2 },

				layer: 'background'
			},
			{
				src: '/img/collage/bg5.jpg',
				y: { mobile: 0, desktop: -150 },
				x: 0,
				width: { mobile: 360, desktop: 1100 / SCALE_2 },
				height: { mobile: 510, desktop: 1400 / SCALE_2 },

				layer: 'background'
			},
			{
				src: '/img/collage/bg6.jpg',
				y: { mobile: 0, desktop: -150 },
				x: 0,
				width: { mobile: 360, desktop: 1100 / SCALE_2 },
				height: { mobile: 510, desktop: 1400 / SCALE_2 },

				layer: 'background'
			},
			{
				src: '/img/collage/bg7.jpg',
				y: { mobile: 0, desktop: -150 },
				x: 0,
				width: { mobile: 360, desktop: 1100 / SCALE_2 },
				height: { mobile: 510, desktop: 1400 / SCALE_2 },

				layer: 'background'
			},
			{
				src: '/img/collage/bg8.jpg',
				y: { mobile: 0, desktop: -150 },
				x: 0,
				width: { mobile: 360, desktop: 1100 / SCALE_2 },
				height: { mobile: 510, desktop: 1400 / SCALE_2 },

				layer: 'background'
			}
		],
		accessories: [
			{
				src: '/img/collage/bag.png',
				width: 327 / SCALE,
				height: 458 / SCALE,
				y: 75,
				x: { mobile: 175, desktop: 350 }
			},
			{
				src: '/img/collage/bag2.png',
				width: 394 / SCALE,
				height: 479 / SCALE
			},
			{
				src: '/img/collage/top2.png',
				width: 364 / SCALE,
				height: 223 / SCALE
			},
			{
				src: '/img/collage/top3.png',
				width: 559 / SCALE,
				height: 279 / SCALE
			}
		],
		headgear: [
			{
				src: '/img/collage/barnie.png',
				width: 351 / SCALE,
				height: 276 / SCALE,
				y: 50,
				x: 50
			},
			{
				src: '/img/collage/hat1.png',
				width: 547 / SCALE,
				height: 311 / SCALE
			},
			{
				src: '/img/collage/hat.png',
				width: 385 / SCALE,
				height: 270 / SCALE
			},
			{
				src: '/img/collage/barnie2.png',
				width: 351 / SCALE,
				height: 276 / SCALE
			}
		],
		tops: [
			{
				src: '/img/collage/dress1.png',
				x: 0,
				y: 150,
				width: 816 / SCALE,
				height: 1482 / SCALE
			},
			{
				src: '/img/collage/vest.png',
				width: 443 / SCALE,
				height: 605 / SCALE
			},
			{
				src: '/img/collage/shirt1.png',
				width: 677 / SCALE,
				height: 750 / SCALE
			},
			{
				src: '/img/collage/dress2.png',
				width: 728 / SCALE,
				height: 854 / SCALE
			},
			{
				src: '/img/collage/vest2.png',
				width: 434 / SCALE,
				height: 774 / SCALE
			},
			{
				src: '/img/collage/dress3.png',
				width: 716 / SCALE,
				height: 779 / SCALE
			},
			{
				src: '/img/collage/dress4.png',
				width: 788 / SCALE,
				height: 1051 / SCALE
			},
			{
				src: '/img/collage/dress5.png',
				width: 427 / SCALE,
				height: 1469 / SCALE
			},
			{
				src: '/img/collage/dress6.png',
				width: 667 / SCALE,
				height: 1258 / SCALE
			},
			{
				src: '/img/collage/shirt3.png',
				width: 668 / SCALE,
				height: 994 / SCALE
			},
			{
				src: '/img/collage/t-shirt.png',
				width: 689 / SCALE,
				height: 641 / SCALE
			},
			{
				src: '/img/collage/top.png',
				width: 421 / SCALE,
				height: 772 / SCALE
			}
		],
		bottoms: [
			{
				src: '/img/collage/pants.png',
				width: 486 / SCALE,
				height: 986 / SCALE,
				x: { mobile: 150, desktop: 200 },
				y: { mobile: 100, desktop: 300 }
			},
			{
				src: '/img/collage/dress7.png',
				width: 592 / SCALE,
				height: 826 / SCALE
			}
		],
		shoes: [
			{
				src: '/img/collage/shoes1.png',
				y: { mobile: 300, desktop: 300 },
				x: { mobile: 200, desktop: 350 },
				width: 688 / SCALE,
				height: 577 / SCALE
			},
			{
				src: '/img/collage/shoes2.png',
				width: 676 / SCALE,
				height: 249 / SCALE
			},
			{
				src: '/img/collage/shoes3.png',
				width: 637 / SCALE,
				height: 296 / SCALE
			},
			{
				src: '/img/collage/shoes4.png',
				width: 643 / SCALE,
				height: 322 / SCALE
			},
			{
				src: '/img/collage/shoes5.png',
				width: 652 / SCALE,
				height: 157 / SCALE
			},
			{
				src: '/img/collage/socks1.png',
				width: 643 / SCALE,
				height: 531 / SCALE
			},
			{
				src: '/img/collage/socks2.png',
				width: 604 / SCALE,
				height: 582 / SCALE
			},
			{
				src: '/img/collage/socks3.png',
				width: 585 / SCALE,
				height: 611 / SCALE
			}
		]
	}
})

export const mutations = {
	[SAVE_COLLAGE.mutation](state) {
		state.saveCollage = !state.saveCollage
	},

	[MAKE_BACKGROUND.mutation](state) {
		state.makeBackground = !state.makeBackground
	},

	[COLLAGE_IS_OPEN.mutation](state, open) {
		state.collageIsOpen = open
	},

	[SAVE_AS_BACKGROUND.mutation](state, img) {
		state.webcamImage = img
	},

	[CHANGE_COLLAGE.mutation](state, change) {
		state.changeCollage = change
	}
}

export const actions = {
	[SAVE_COLLAGE.action]({ commit }) {
		commit(SAVE_COLLAGE.mutation)
	},

	[MAKE_BACKGROUND.action]({ commit }) {
		commit(MAKE_BACKGROUND.mutation)
	},

	[COLLAGE_IS_OPEN.action]({ commit }, open) {
		commit(COLLAGE_IS_OPEN.mutation, open)
	},

	[CHANGE_COLLAGE.action]({ commit }, change) {
		commit(CHANGE_COLLAGE.mutation, change)
	},

	[SAVE_AS_BACKGROUND.action]({ commit }, img) {
		commit(SAVE_AS_BACKGROUND.mutation, img)
	}
}
