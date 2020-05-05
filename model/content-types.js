export default {
	collection: {
		name: 'collection',
		contentComponent:'collection', 
		statusComponent:'status-collection',		
		allowedInstances: 1,
		defaultWindowProps: {
			width: 700,
			height: 400
		}		
	},
	films: {
		name: 'films',
		contentComponent:'films',
		statusComponent:'status-static',
		allowedInstances: 1,
		defaultWindowProps: {
			width: 700,
			height: 400
		}
	},
	musicPlayer: {
		name: 'music-player',
		contentComponent:'music-player',
		statusComponent:'status-static',
		allowedInstances: 1,
		defaultWindowProps: {
			width: 320,
			height: 180,
			modifierClass:'window--tight'
		}
	},	
	textFile: {
		name: 'text-reader',
		contentComponent:'text-reader',
		statusComponent:'status-static',
		allowedInstances: 1,
		defaultWindowProps: {
			width: 700,
			height: 400,
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
			width: 274,
			height: 418,
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
			width: 416,
			height: 276,
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
			width: 320,
			height: 320,
			modifierClass:'window--tight'
		}
	},
	videoPortrait: {
		name: 'video-portrait',
		contentComponent:'video',
		statusComponent:'status-static',
		allowedInstances: 100,
		defaultWindowProps: {
			width: 180,
			height: 320,
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
			width: 320,
			height: 180,
			modifierClass:'window--tight',
			noStatus: true
		}
	}
};