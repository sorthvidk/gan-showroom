/**
 * The cut-outs of clothes used in the collage
 */

export const state = () => ({
	clothes: {
		background: [
			{
				src: '/img/collage/empty.png',
				y: 0,
				x: 0,
				width: { mobile: 350, desktop: 600 },
				height: { mobile: 470, desktop: 520 },

				background: true
			},
			{
				src: '/img/collage/background.jpg',
				y: 0,
				x: 0,
				width: { mobile: 350, desktop: 530 },
				height: { mobile: 470, desktop: 520 },

				background: true
			},
			{
				src: '/img/collage/runway.jpg',
				y: 0,
				x: 0,
				width: { mobile: 350, desktop: 530 },
				height: { mobile: 470, desktop: 520 },

				background: true
			}
		],
		headgear: [
			{
				src: '/img/collage/hat.png',
				y: 100,
				x: 50,
				width: 100,
				height: 75
			},
			{
				src: '/img/collage/hat2.png',
				y: 100,
				x: 50,
				width: 130,
				height: 75
			},
			{
				src: '/img/collage/hat3.png',
				y: 100,
				x: 50,
				width: 100,
				height: 75
			}
		],
		tops: [
			{
				src: '/img/collage/dress.png',
				y: 50,
				x: 24,
				width: 240,
				height: 300
			}
		],
		shoes: [
			{
				src: '/img/collage/boots.png',
				y: 300,
				x: 100,
				width: 110,
				height: 100
			}
		]
	}
})
