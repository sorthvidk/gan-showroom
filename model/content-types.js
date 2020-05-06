export default {
	collection: {
		name: 'collection',
		contentComponent:'collection', 
		statusComponent:'status-collection',		
		allowedInstances: 1,
		defaultWindowProps: {
			largeWidth: 4*160 + 31 + 10,
			smallWidth: 2*160 + 31 + 10,
			largeHeight: 510,
			smallHeight: 510
		}		
	},
	films: {
		name: 'films',
		contentComponent:'films',
		statusComponent:'status-static',
		allowedInstances: 1,
		defaultWindowProps: {
			largeWidth: 700,
			smallWidth: 350,
			largeHeight: 510,
			smallHeight: 510
		}
	},
	musicPlayer: {
		name: 'music-player',
		contentComponent:'music-player',
		statusComponent:'status-static',
		allowedInstances: 1,
		defaultWindowProps: {
			largeWidth: 320,
			smallWidth: 320,
			largeHeight: 180,
			smallHeight: 180,
			modifierClass:'window--tight'
		}
	},	
	textFile: {
		name: 'text-reader',
		contentComponent:'text-reader',
		statusComponent:'status-static',
		allowedInstances: 1,
		defaultWindowProps: {
			largeWidth: 700,
			smallWidth: 350,
			largeHeight: 400,
			smallHeight: 300,
			modifierClass:'window--tight'
		}
	},
	imagePortrait: {
		name: 'image-portrait',
		contentComponent:'single-image',
		statusComponent:'status-static',
		allowedInstances: 100,
		defaultStatusComponentProps: {
			text: 'TIP! Click image to zoom.'
		},
		defaultWindowProps: {
			largeWidth: 274,
			smallWidth: 274,
			largeHeight: 418,
			smallHeight: 418,
			modifierClass:'window--tight'
		}
	},
	imageLandscape: {
		name: 'image-landscape',
		contentComponent:'single-image',
		statusComponent:'status-static',
		allowedInstances: 100,
		defaultStatusComponentProps: {
			text: 'TIP! Click image to zoom.'
		},
		defaultWindowProps: {
			largeWidth: 274,
			smallWidth: 274,
			largeHeight: 180,
			smallHeight: 180,
			modifierClass:'window--tight'
		}
	},
	imageSquare: {
		name: 'image-square',
		contentComponent:'single-image',
		statusComponent:'status-static',
		allowedInstances: 100,
		defaultStatusComponentProps: {
			text: 'TIP! Click image to zoom.'
		},
		defaultWindowProps: {
			largeWidth: 320,
			smallWidth: 320,
			largeHeight: 274,
			smallHeight: 274,
			modifierClass:'window--tight'
		}
	},
	videoPortrait: {
		name: 'video-portrait',
		contentComponent:'video',
		statusComponent:'status-static',
		allowedInstances: 100,
		defaultWindowProps: {
			largeWidth: 180,
			smallWidth: 180,
			largeHeight: 320,
			smallHeight: 320,
			modifierClass:'window--tight',
			noStatus: true
		}
	},
	videoLandscape: {
		name: 'video-landscape',
		contentComponent:'video',
		statusComponent:'status-static',
		allowedInstances: 100,
		defaultWindowProps: {
			largeWidth: 320,
			smallWidth: 320,
			largeHeight: 180,
			smallHeight: 180,
			modifierClass:'window--tight',
			noStatus: true
		}
	},
	gallery: {
		name: 'gallery',
		contentComponent:'gallery', 
		allowedInstances: 1,
		defaultWindowProps: {
			largeWidth: 600,
			smallWidth: 600,
			largeHeight: 600,
			smallHeight: 600,
			noStatus: true,
			isMaximized: true,
			canResize: false,
			modifierClass:'window--full-screen',
		}		
	}
};