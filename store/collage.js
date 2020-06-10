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
				src: '/img/collage/runway.jpg',
				y: 0,
				x: 0,
				width: { mobile: 360, desktop: 530 },
				height: { mobile: 510, desktop: 520 },

				layer: 'background'
			}
		],
		headgear: [
			{
				src: '/img/collage/hat.png',
				y: 50,
				x: 50,
				width: 100,
				height: 75
			},
			{
				src: '/img/collage/hat2.png',
				width: 130,
				height: 75
			},
			{
				src: '/img/collage/hat3.png',
				width: 100,
				height: 75
			}
		],
		tops: [
			{
				src: '/img/collage/dress.png',
				x: 0,
				y: 150,
				width: 240,
				height: 300
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
