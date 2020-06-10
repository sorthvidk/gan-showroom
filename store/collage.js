/**
 * The cut-outs of clothes used in the collage
 */

const scale = 4.5

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
			}
			// {
			// 	src: '/img/collage/runway.jpg',
			// 	y: 0,
			// 	x: 0,
			// 	width: { mobile: 360, desktop: 530 },
			// 	height: { mobile: 510, desktop: 520 },

			// 	layer: 'background'
			// }
		],
		headgear: [
			{
				src: '/img/collage/barnie.png',
				width: 351 / scale,
				height: 276 / scale,
				y: 50,
				x: 50
			}
			// {
			// 	src: '/img/collage/hat.png',
			// 	width: 100,
			// 	height: 75
			// }
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
				src: '/img/collage/boots.png',
				y: { mobile: 300, desktop: 300 },
				x: { mobile: 200, desktop: 350 },
				width: 110,
				height: 100
			}
		]
	}
})
