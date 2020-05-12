const WINDOW_CHROME_HEIGHT = 71
const WINDOW_CHROME_WIDTH = 2

export default {
	collection: {
		name: 'collection',
		contentComponent: 'collection',
		statusComponent: 'status-collection',
		allowedInstances: 1,
		defaultWindowProps: {
			largeWidth: 4 * 160 + 32 + 10 + WINDOW_CHROME_WIDTH,
			smallWidth: 2 * 160 + 32 + 10,
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
		name: 'music-player',
		contentComponent: 'music-player',
		statusComponent: 'status-static',
		allowedInstances: 1,
		defaultWindowProps: {
			largeWidth: 320 + WINDOW_CHROME_WIDTH,
			smallWidth: 320,
			largeHeight: 180 + WINDOW_CHROME_HEIGHT,
			smallHeight: 180,
			modifierClass: 'window--tight'
		}
	},
	textFile: {
		name: 'text-reader',
		contentComponent: 'text-reader',
		statusComponent: 'status-static',
		allowedInstances: 1,
		defaultWindowProps: {
			largeWidth: 700 + WINDOW_CHROME_WIDTH,
			smallWidth: 350,
			largeHeight: 400 + WINDOW_CHROME_HEIGHT,
			smallHeight: 300,
			modifierClass: 'window--tight'
		}
	},
	imagePortrait: {
		name: 'image-portrait',
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
		name: 'image-landscape',
		contentComponent: 'single-image',
		statusComponent: 'status-static',
		allowedInstances: 100,
		defaultStatusComponentProps: {
			text: 'TIP! Click image to zoom.'
		},
		defaultWindowProps: {
			largeWidth: 274 + WINDOW_CHROME_WIDTH,
			smallWidth: 274,
			largeHeight: 180 + WINDOW_CHROME_HEIGHT,
			smallHeight: 180,
			modifierClass: 'window--tight'
		}
	},
	imageSquare: {
		name: 'image-square',
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
		name: 'video-portrait',
		contentComponent: 'video',
		statusComponent: 'status-static',
		allowedInstances: 100,
		defaultWindowProps: {
			largeWidth: 180 + WINDOW_CHROME_WIDTH,
			smallWidth: 180,
			largeHeight: 320 + WINDOW_CHROME_HEIGHT,
			smallHeight: 320,
			modifierClass: 'window--tight',
			noStatus: true
		}
	},
	videoLandscape: {
		name: 'video-landscape',
		contentComponent: 'video',
		statusComponent: 'status-static',
		allowedInstances: 100,
		defaultWindowProps: {
			largeWidth: 320 + WINDOW_CHROME_WIDTH,
			smallWidth: 320,
			largeHeight: 180 + WINDOW_CHROME_HEIGHT,
			smallHeight: 180,
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
		name: 'wish-list',
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
	}
}
