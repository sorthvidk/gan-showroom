const WINDOW_CHROME_HEIGHT = 71
const WINDOW_CHROME_WIDTH = 2

export default {
	collection: {
		name: 'collection',
		contentComponent: 'collection',
		statusComponent: 'status-collection',
		allowedInstances: 1,
		defaultWindowProps: {
			largeWidth: 3 * 208 + 31 + 50 + WINDOW_CHROME_WIDTH,
			smallWidth: 2 * 156 + 31 + 10,
			largeHeight: 510 + WINDOW_CHROME_HEIGHT,
			smallHeight: 510
		}
	},
	films: {
		name: 'films',
		contentComponent: 'films',
		statusComponent: 'status-static',
		allowedInstances: 1,
		defaultWindowProps: {
			largeWidth: 700 + WINDOW_CHROME_WIDTH,
			smallWidth: 350,
			largeHeight: 510 + WINDOW_CHROME_HEIGHT,
			smallHeight: 510
		}
	},
	musicPlayer: {
		name: 'musicPlayer',
		contentComponent: 'music-player',
		statusComponent: 'status-static',
		allowedInstances: 1,
		defaultWindowProps: {
			largeWidth: 320 + WINDOW_CHROME_WIDTH,
			smallWidth: 320,
			largeHeight: 45 + WINDOW_CHROME_HEIGHT,
			smallHeight: 100,
			noStatus: true,
			canResize: false,
			noPlacement: true,
			modifierClass: 'window--tight window--music-player music-player'
		}
	},
	textFile: {
		name: 'textFile',
		contentComponent: 'text-reader',
		statusComponent: 'status-static',
		allowedInstances: 1,
		defaultWindowProps: {
			largeWidth: 700 + WINDOW_CHROME_WIDTH,
			smallWidth: 350,
			largeHeight: 400 + WINDOW_CHROME_HEIGHT,
			smallHeight: 300,
			noStatus: true
		}
	},
	imagePortrait: {
		name: 'imagePortrait',
		contentComponent: 'single-image',
		statusComponent: 'status-static',
		allowedInstances: 100,
		defaultStatusComponentProps: {
			text: 'TIP! Click image to zoom.'
		},
		defaultWindowProps: {
			largeWidth: 274 + WINDOW_CHROME_WIDTH,
			smallWidth: 274,
			largeHeight: 418 + WINDOW_CHROME_HEIGHT,
			smallHeight: 418,
			modifierClass: 'window--tight'
		}
	},
	imageLandscape: {
		name: 'imageLandscape',
		contentComponent: 'single-image',
		statusComponent: 'status-static',
		allowedInstances: 100,
		defaultStatusComponentProps: {
			text: 'TIP! Click image to zoom.'
		},
		defaultWindowProps: {
			largeWidth: 600 + WINDOW_CHROME_WIDTH,
			smallWidth: 274,
			largeHeight: 300 + WINDOW_CHROME_HEIGHT,
			smallHeight: 180,
			modifierClass: 'window--tight'
		}
	},
	imageSquare: {
		name: 'imageSquare',
		contentComponent: 'single-image',
		statusComponent: 'status-static',
		allowedInstances: 100,
		defaultStatusComponentProps: {
			text: 'TIP! Click image to zoom.'
		},
		defaultWindowProps: {
			largeWidth: 320 + WINDOW_CHROME_WIDTH,
			smallWidth: 320,
			largeHeight: 274 + WINDOW_CHROME_HEIGHT,
			smallHeight: 274,
			modifierClass: 'window--tight'
		}
	},
	videoPortrait: {
		name: 'videoPortrait',
		contentComponent: 'single-video',
		statusComponent: 'status-static',
		allowedInstances: 100,
		defaultWindowProps: {
			largeWidth: 274 + WINDOW_CHROME_WIDTH,
			smallWidth: 274,
			largeHeight: 418 + WINDOW_CHROME_HEIGHT,
			smallHeight: 418,
			modifierClass: 'window--tight',
			noStatus: true
		}
	},
	videoLandscape: {
		name: 'videoLandscape',
		contentComponent: 'single-video',
		statusComponent: 'status-static',
		allowedInstances: 100,
		defaultWindowProps: {
			largeWidth: 600 + WINDOW_CHROME_WIDTH,
			smallWidth: 600,
			largeHeight: 300 + WINDOW_CHROME_HEIGHT,
			smallHeight: 300,
			modifierClass: 'window--tight',
			noStatus: true
		}
	},
	gallery: {
		name: 'gallery',
		contentComponent: 'gallery',
		allowedInstances: 1,
		defaultWindowProps: {
			largeWidth: 600 + WINDOW_CHROME_WIDTH,
			smallWidth: 600,
			largeHeight: 600 + WINDOW_CHROME_HEIGHT,
			smallHeight: 600,
			noStatus: true,
			isMaximized: true,
			canResize: false,
			modifierClass: 'window--gallery'
		}
	},
	wishList: {
		name: 'wishList',
		contentComponent: 'wish-list',
		statusComponent: 'status-wish-list',
		allowedInstances: 1,
		defaultWindowProps: {
			largeWidth: 705 + WINDOW_CHROME_WIDTH,
			smallWidth: 355,
			largeHeight: 600 + WINDOW_CHROME_HEIGHT,
			smallHeight: 400,
			modifierClass: 'window--wish-list'
		}
	},
	hampsterDance: {
		name: 'hampsterDance',
		contentComponent: 'hampster-dance',
		allowedInstances: 1,
		defaultWindowProps: {
			largeWidth: 460 + WINDOW_CHROME_WIDTH,
			smallWidth: 355,
			largeHeight: 600 + WINDOW_CHROME_HEIGHT,
			smallHeight: 400,
			noStatus: true
		}
	},
	ganniGirls: {
		name: 'ganniGirls',
		contentComponent: 'ganni-girls',
		allowedInstances: 1,
		statusComponent: 'status-static',
		defaultWindowProps: {
			largeWidth: 705 + WINDOW_CHROME_WIDTH,
			smallWidth: 355,
			largeHeight: 600 + WINDOW_CHROME_HEIGHT,
			smallHeight: 600
		}
	},
	lookBook: {
		name: 'lookBook',
		contentComponent: 'look-book',
		statusComponent: 'status-static',
		allowedInstances: 1,
		defaultWindowProps: {
			largeWidth: 705 + WINDOW_CHROME_WIDTH,
			smallWidth: 355,
			largeHeight: 600 + WINDOW_CHROME_HEIGHT,
			smallHeight: 400
		}
	}
}
