/**
 * The cut-outs of clothes used in the collage
 */

const scale = 4.5
const scale2 = 2

export const state = () => ({
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
				src: '/img/collage/background.jpg',
				y: { mobile: 0, desktop: -250 },
				x: 0,
				width: { mobile: 360, desktop: 530 },
				height: { mobile: 510, desktop: 800 },

				layer: 'background'
			},
			{
				src: '/img/collage/bg1.jpg',
				y: { mobile: 0, desktop: -150 },
				x: 0,
				width: { mobile: 360, desktop: 1100 / scale2 },
				height: { mobile: 510, desktop: 1400 / scale2 },

				layer: 'background'
			},
			{
				src: '/img/collage/bg2.jpg',
				y: { mobile: 0, desktop: -150 },
				x: 0,
				width: { mobile: 360, desktop: 1100 / scale2 },
				height: { mobile: 510, desktop: 1400 / scale2 },

				layer: 'background'
			},
			{
				src: '/img/collage/bg3.jpg',
				y: { mobile: 0, desktop: -150 },
				x: 0,
				width: { mobile: 360, desktop: 1100 / scale2 },
				height: { mobile: 510, desktop: 1400 / scale2 },

				layer: 'background'
			},
			{
				src: '/img/collage/bg4.jpg',
				y: { mobile: 0, desktop: -150 },
				x: 0,
				width: { mobile: 360, desktop: 1100 / scale2 },
				height: { mobile: 510, desktop: 1400 / scale2 },

				layer: 'background'
			},
			{
				src: '/img/collage/bg5.jpg',
				y: { mobile: 0, desktop: -150 },
				x: 0,
				width: { mobile: 360, desktop: 1100 / scale2 },
				height: { mobile: 510, desktop: 1400 / scale2 },

				layer: 'background'
			},
			{
				src: '/img/collage/bg6.jpg',
				y: { mobile: 0, desktop: -150 },
				x: 0,
				width: { mobile: 360, desktop: 1100 / scale2 },
				height: { mobile: 510, desktop: 1400 / scale2 },

				layer: 'background'
			},
			{
				src: '/img/collage/bg7.jpg',
				y: { mobile: 0, desktop: -150 },
				x: 0,
				width: { mobile: 360, desktop: 1100 / scale2 },
				height: { mobile: 510, desktop: 1400 / scale2 },

				layer: 'background'
			},
			{
				src: '/img/collage/bg8.jpg',
				y: { mobile: 0, desktop: -150 },
				x: 0,
				width: { mobile: 360, desktop: 1100 / scale2 },
				height: { mobile: 510, desktop: 1400 / scale2 },

				layer: 'background'
			},
			{
				src: '/img/collage/bg9.jpg',
				y: { mobile: 0, desktop: -150 },
				x: 0,
				width: { mobile: 360, desktop: 1100 / scale2 },
				height: { mobile: 510, desktop: 1400 / scale2 },

				layer: 'background'
			}
		],
		accessories: [
			{
				src: '/img/collage/bag.png',
				width: 327 / scale,
				height: 458 / scale,
				y: 75,
				x: 350
			}
		],
		headgear: [
			{
				src: '/img/collage/barnie.png',
				width: 351 / scale,
				height: 276 / scale,
				y: 50,
				x: 50
			},
			{
				src: '/img/collage/hat1.png',
				width: 547 / scale,
				height: 311 / scale
			}
		],
		tops: [
			{
				src: '/img/collage/dress1.png',
				x: 0,
				y: 150,
				width: 816 / scale,
				height: 1482 / scale
			},
			{
				src: '/img/collage/vest.png',
				width: 443 / scale,
				height: 605 / scale
			},
			{
				src: '/img/collage/shirt1.png',
				width: 677 / scale,
				height: 750 / scale
			},
			{
				src: '/img/collage/dress2.png',
				width: 728 / scale,
				height: 854 / scale
			},
			{
				src: '/img/collage/vest2.png',
				width: 434 / scale,
				height: 774 / scale
			},
			{
				src: '/img/collage/dress3.png',
				width: 716 / scale,
				height: 779 / scale
			},
			{
				src: '/img/collage/dress4.png',
				width: 788 / scale,
				height: 1051 / scale
			},
			{
				src: '/img/collage/dress5.png',
				width: 427 / scale,
				height: 1469 / scale
			},
			{
				src: '/img/collage/dress6.png',
				width: 667 / scale,
				height: 1258 / scale
			},
			{
				src: '/img/collage/shirt3.png',
				width: 668 / scale,
				height: 994 / scale
			}
		],
		shoes: [
			{
				src: '/img/collage/shoes1.png',
				y: { mobile: 300, desktop: 300 },
				x: { mobile: 200, desktop: 350 },
				width: 688 / scale,
				height: 577 / scale
			},
			{
				src: '/img/collage/shoes2.png',
				width: 676 / scale,
				height: 249 / scale
			},
			{
				src: '/img/collage/shoes3.png',
				width: 637 / scale,
				height: 296 / scale
			}
		]
	}
})
