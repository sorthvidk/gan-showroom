const WINDOW_TOPBAR_BORDERS_HEIGHT = 30
const WINDOW_STATUSBAR_HR_HEIGHT = 40
const WINDOW_BORDERS_WIDTH = 0
const WINDOW_SCROLLBAR_WIDTH = 30

const WINDOW_DEFAULT_CHROME_WIDTH = WINDOW_BORDERS_WIDTH + WINDOW_SCROLLBAR_WIDTH
const WINDOW_TIGHT_CHROME_WIDTH = WINDOW_BORDERS_WIDTH
const WINDOW_DEFAULT_CHROME_HEIGHT = WINDOW_TOPBAR_BORDERS_HEIGHT + WINDOW_STATUSBAR_HR_HEIGHT
const WINDOW_NOSTATUS_CHROME_HEIGHT = WINDOW_TOPBAR_BORDERS_HEIGHT

export default {
	collection: {
		name: 'collection',
		contentComponent: 'collection',
		statusComponent: 'status-collection',
		allowedInstances: 1,
		defaultWindowProps: {
			largeWidth: 3 * 208 + 50 + WINDOW_DEFAULT_CHROME_WIDTH,
			smallWidth: 2 * 156 + 10 + WINDOW_DEFAULT_CHROME_WIDTH,
			largeHeight: 510 + WINDOW_DEFAULT_CHROME_HEIGHT,
			smallHeight: 510
		}
	},
	films: {
		name: 'films',
		contentComponent: 'films',
		statusComponent: 'status-static',
		allowedInstances: 1,
		defaultWindowProps: {
			largeWidth: 700 + WINDOW_DEFAULT_CHROME_WIDTH,
			smallWidth: 350,
			largeHeight: 510 + WINDOW_DEFAULT_CHROME_HEIGHT,
			smallHeight: 510
		}
	},
	musicPlayer: {
		name: 'musicPlayer',
		contentComponent: 'music-player',
		statusComponent: 'status-static',
		allowedInstances: 1,
		defaultWindowProps: {
			largeWidth: 320 + WINDOW_TIGHT_CHROME_WIDTH,
			smallWidth: 320,
			largeHeight: 113 + WINDOW_NOSTATUS_CHROME_HEIGHT,
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
			largeWidth: 700 + WINDOW_DEFAULT_CHROME_WIDTH,
			smallWidth: 350,
			largeHeight: 400 + WINDOW_NOSTATUS_CHROME_HEIGHT,
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
			largeWidth: 274 + WINDOW_TIGHT_CHROME_WIDTH,
			smallWidth: 274,
			largeHeight: 417 + WINDOW_DEFAULT_CHROME_HEIGHT,
			smallHeight: 417,
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
			largeWidth: 417 + WINDOW_TIGHT_CHROME_WIDTH,
			smallWidth: 417,
			largeHeight: 274 + WINDOW_DEFAULT_CHROME_HEIGHT,
			smallHeight: 274,
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
			largeWidth: 320 + WINDOW_TIGHT_CHROME_WIDTH,
			smallWidth: 320,
			largeHeight: 274 + WINDOW_DEFAULT_CHROME_HEIGHT,
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
			largeWidth: 274 + WINDOW_TIGHT_CHROME_WIDTH,
			smallWidth: 274,
			largeHeight: 417 + WINDOW_NOSTATUS_CHROME_HEIGHT,
			smallHeight: 417 + WINDOW_NOSTATUS_CHROME_HEIGHT,
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
			largeWidth: 608 + WINDOW_TIGHT_CHROME_WIDTH,
			smallWidth: 355,
			largeHeight: 342 + WINDOW_NOSTATUS_CHROME_HEIGHT,
			smallHeight: 200 + WINDOW_NOSTATUS_CHROME_HEIGHT,
			modifierClass: 'window--tight',
			noStatus: true
		}
	},
	gallery: {
		name: 'gallery',
		contentComponent: 'gallery',
		allowedInstances: 1,
		defaultWindowProps: {
			largeWidth: 600 + WINDOW_DEFAULT_CHROME_WIDTH,
			smallWidth: 600,
			largeHeight: 600 + WINDOW_DEFAULT_CHROME_HEIGHT,
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
			largeWidth: 705 + WINDOW_DEFAULT_CHROME_WIDTH,
			smallWidth: 355,
			largeHeight: 600 + WINDOW_DEFAULT_CHROME_HEIGHT,
			smallHeight: 400,
			modifierClass: 'window--wish-list'
		}
	},
	hampsterDance: {
		name: 'hampsterDance',
		contentComponent: 'hampster-dance',
		allowedInstances: 1,
		defaultWindowProps: {
			largeWidth: 460 + WINDOW_DEFAULT_CHROME_WIDTH,
			smallWidth: 355,
			largeHeight: 600 + WINDOW_DEFAULT_CHROME_HEIGHT,
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
			largeWidth: 705 + WINDOW_DEFAULT_CHROME_WIDTH,
			smallWidth: 355,
			largeHeight: 600 + WINDOW_DEFAULT_CHROME_HEIGHT,
			smallHeight: 600
		}
	},
	lookBook: {
		name: 'lookBook',
		contentComponent: 'look-book',
		statusComponent: 'status-static',
		allowedInstances: 1,
		defaultWindowProps: {
			largeWidth: 705 + WINDOW_DEFAULT_CHROME_WIDTH,
			smallWidth: 355,
			largeHeight: 600 + WINDOW_DEFAULT_CHROME_HEIGHT,
			smallHeight: 400
		}
	}
}
