const WINDOW_TOPBAR_BORDERS_HEIGHT = 30
const WINDOW_STATUSBAR_HR_HEIGHT = 40
const WINDOW_BORDERS_WIDTH = 0
const WINDOW_SCROLLBAR_WIDTH = 30

const WINDOW_DEFAULT_CHROME_WIDTH =
	WINDOW_BORDERS_WIDTH + WINDOW_SCROLLBAR_WIDTH
const WINDOW_TIGHT_CHROME_WIDTH = WINDOW_BORDERS_WIDTH
const WINDOW_DEFAULT_CHROME_HEIGHT =
	WINDOW_TOPBAR_BORDERS_HEIGHT + WINDOW_STATUSBAR_HR_HEIGHT
const WINDOW_NOSTATUS_CHROME_HEIGHT = WINDOW_TOPBAR_BORDERS_HEIGHT

export default {
	collection: {
		name: 'collection',
		contentComponent: 'collection',
		contentScore: 20,
		statusComponent: 'status-collection',
		allowedInstances: 1,
		defaultWindowProps: {
			largeWidth: 3 * 208 + 50 + WINDOW_DEFAULT_CHROME_WIDTH,
			smallWidth: 353,
			largeHeight: 510 + WINDOW_DEFAULT_CHROME_HEIGHT,
			smallHeight: 355
		}
	},
	films: {
		name: 'films',
		contentComponent: 'films',
		contentScore: 10,
		statusComponent: 'status-static',
		allowedInstances: 1,
		defaultWindowProps: {
			largeWidth: 670 + WINDOW_DEFAULT_CHROME_WIDTH,
			smallWidth: 320,
			largeHeight: 500 + WINDOW_DEFAULT_CHROME_HEIGHT,
			smallHeight: 400,
			noStatus: true
		}
	},
	musicPlayer: {
		name: 'musicPlayer',
		contentComponent: 'music-player',
		contentScore: 10,
		statusComponent: 'status-static',
		allowedInstances: 1,
		defaultWindowProps: {
			largeWidth: 320 + WINDOW_TIGHT_CHROME_WIDTH,
			smallWidth: 350,
			largeHeight: 113 + WINDOW_NOSTATUS_CHROME_HEIGHT,
			smallHeight: 113 + WINDOW_NOSTATUS_CHROME_HEIGHT,
			noStatus: true,
			canResize: false,
			noPlacement: true,
			wrapperClass: 'window--music-player__wrapper',
			modifierClass: 'window--music-player music-player window--tight'
		}
	},
	textFile: {
		name: 'textFile',
		contentComponent: 'text-reader',
		contentScore: 10,
		statusComponent: 'status-static',
		allowedInstances: 1,
		defaultWindowProps: {
			largeWidth: 600 + WINDOW_DEFAULT_CHROME_WIDTH,
			smallWidth: 300,
			largeHeight: 400 + WINDOW_NOSTATUS_CHROME_HEIGHT,
			smallHeight: 300,
			noStatus: true
		}
	},
	imagePortrait: {
		name: 'imagePortrait',
		contentComponent: 'single-image',
		contentScore: 0,
		statusComponent: 'status-static',
		allowedInstances: 100,
		defaultStatusComponentProps: {
			text: 'TIP! Click image to zoom.'
		},
		defaultWindowProps: {
			largeWidth: 274 + WINDOW_TIGHT_CHROME_WIDTH,
			smallWidth: 274 + WINDOW_TIGHT_CHROME_WIDTH,
			largeHeight: 417 + WINDOW_DEFAULT_CHROME_HEIGHT,
			smallHeight: 417 + WINDOW_DEFAULT_CHROME_HEIGHT,
			modifierClass: 'window--tight'
		}
	},
	imageLandscape: {
		name: 'imageLandscape',
		contentComponent: 'single-image',
		contentScore: 0,
		statusComponent: 'status-static',
		allowedInstances: 100,
		defaultStatusComponentProps: {
			text: 'TIP! Click image to zoom.'
		},
		defaultWindowProps: {
			largeWidth: 417 + WINDOW_TIGHT_CHROME_WIDTH,
			smallWidth: 353,
			largeHeight: 274 + WINDOW_DEFAULT_CHROME_HEIGHT,
			smallHeight: 232,
			modifierClass: 'window--tight'
		}
	},
	imageSquare: {
		name: 'imageSquare',
		contentComponent: 'single-image',
		contentScore: 0,
		statusComponent: 'status-static',
		allowedInstances: 100,
		defaultStatusComponentProps: {
			text: 'TIP! Click image to zoom.'
		},
		defaultWindowProps: {
			largeWidth: 320 + WINDOW_TIGHT_CHROME_WIDTH,
			smallWidth: 274 + WINDOW_TIGHT_CHROME_WIDTH,
			largeHeight: 320 + WINDOW_DEFAULT_CHROME_HEIGHT,
			smallHeight: 274 + WINDOW_DEFAULT_CHROME_HEIGHT,
			modifierClass: 'window--tight'
		}
	},
	videoPortrait: {
		name: 'videoPortrait',
		contentComponent: 'single-video',
		contentScore: 0,
		statusComponent: 'status-static',
		allowedInstances: 100,
		defaultWindowProps: {
			largeWidth: 274 + WINDOW_TIGHT_CHROME_WIDTH,
			smallWidth: 274 + WINDOW_TIGHT_CHROME_WIDTH,
			largeHeight: 417 + WINDOW_NOSTATUS_CHROME_HEIGHT,
			smallHeight: 417 + WINDOW_NOSTATUS_CHROME_HEIGHT,
			modifierClass: 'window--tight',
			noStatus: true
		}
	},
	videoLandscape: {
		name: 'videoLandscape',
		contentComponent: 'single-video',
		contentScore: 0,
		statusComponent: 'status-static',
		allowedInstances: 100,
		defaultWindowProps: {
			largeWidth: 608 + WINDOW_TIGHT_CHROME_WIDTH,
			smallWidth: 353,
			largeHeight: 342 + WINDOW_NOSTATUS_CHROME_HEIGHT,
			smallHeight: 199 + WINDOW_NOSTATUS_CHROME_HEIGHT,
			modifierClass: 'window--tight',
			noStatus: true
		}
	},
	videoSquare: {
		name: 'videoSquare',
		contentComponent: 'single-video',
		contentScore: 0,
		statusComponent: 'status-static',
		allowedInstances: 100,
		defaultWindowProps: {
			largeWidth: 320 + WINDOW_TIGHT_CHROME_WIDTH,
			smallWidth: 274 + WINDOW_TIGHT_CHROME_WIDTH,
			largeHeight: 320 + WINDOW_DEFAULT_CHROME_HEIGHT,
			smallHeight: 274 + WINDOW_DEFAULT_CHROME_HEIGHT,
			modifierClass: 'window--tight'
		}
	},
	gallery: {
		name: 'gallery',
		contentComponent: 'gallery',
		contentScore: 0,
		allowedInstances: 1,
		defaultWindowProps: {
			largeWidth: 600 + WINDOW_DEFAULT_CHROME_WIDTH,
			smallWidth: 600,
			largeHeight: 600 + WINDOW_DEFAULT_CHROME_HEIGHT,
			smallHeight: 600,
			noStatus: true,
			isMaximized: true,
			canResize: false,
			canReorder: false,
			wrapperClass: 'window--gallery__wrapper',
			modifierClass: 'window--gallery'
		}
	},
	wishList: {
		name: 'wishList',
		contentComponent: 'wish-list',
		contentScore: 10,
		statusComponent: 'status-wish-list',
		allowedInstances: 1,
		defaultWindowProps: {
			largeWidth: 705 + WINDOW_DEFAULT_CHROME_WIDTH,
			smallWidth: 353,
			largeHeight: 600 + WINDOW_DEFAULT_CHROME_HEIGHT,
			smallHeight: 400,
			wrapperClass: 'window--wish-list__wrapper',
			modifierClass: 'window--wish-list'
		}
	},
	hampsterDance: {
		name: 'hampsterDance',
		contentComponent: 'hampster-dance',
		contentScore: 10,
		allowedInstances: 1,
		defaultWindowProps: {
			largeWidth: 620 + WINDOW_DEFAULT_CHROME_WIDTH,
			smallWidth: 353,
			largeHeight: 600 + WINDOW_DEFAULT_CHROME_HEIGHT,
			smallHeight: 400,
			noStatus: true
		}
	},
	ganniGirls: {
		name: 'ganniGirls',
		contentComponent: 'ganni-girls',
		contentScore: 15,
		allowedInstances: 1,
		statusComponent: 'status-static',
		defaultWindowProps: {
			largeWidth: 705 + WINDOW_DEFAULT_CHROME_WIDTH,
			smallWidth: 353,
			largeHeight: 600 + WINDOW_DEFAULT_CHROME_HEIGHT,
			smallHeight: 355
		}
	},
	lookBook: {
		name: 'lookBook',
		contentComponent: 'look-book',
		contentScore: 15,
		statusComponent: 'status-static',
		allowedInstances: 1,
		defaultWindowProps: {
			largeWidth: 400 + WINDOW_DEFAULT_CHROME_WIDTH,
			smallWidth: 353,
			largeHeight: 600 + WINDOW_DEFAULT_CHROME_HEIGHT,
			smallHeight: 355
		}
	},
	collage: {
		name: 'collage',
		contentComponent: 'collage',
		contentScore: 16,
		statusComponent: 'status-static',
		allowedInstances: 1,
		defaultWindowProps: {
			largeWidth: 500 + WINDOW_DEFAULT_CHROME_WIDTH,
			smallWidth: 350,
			largeHeight: 550 + WINDOW_DEFAULT_CHROME_HEIGHT,
			smallHeight: 250,
			noStatus: true
		}
	}
}
