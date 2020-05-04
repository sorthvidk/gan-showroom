export default {
	collection: {
		name: 'collection',
		component:'collection', 
		allowedInstances: 1,
		windowProps: {
			width: 4*180,
			height: 400
		}
	},
	imagePortrait: {
		name: 'image-portrait',
		component:'single-image',
		allowedInstances: 100,
		windowProps: {
			width: 274,
			height: 416,
			modifierClass:'window--tight'
		}
	},
	imageLandscape: {
		name: 'image-landscape',
		component:'single-image',
		allowedInstances: 100,
		windowProps: {
			width: 416,
			height: 276,
			modifierClass:'window--tight'
		}
	},
	imageSquare: {
		name: 'image-square',
		component:'single-image',
		allowedInstances: 100,
		windowProps: {
			width: 320,
			height: 320,
			modifierClass:'window--tight'
		}
	},
	videoPortrait: {
		name: 'video-portrait',
		component:'video',
		allowedInstances: 100,
		windowProps: {
			width: 180,
			height: 320,
			modifierClass:'window--tight'
		}
	},
	videoLandscape: {
		name: 'video-landscape',
		component:'video',
		allowedInstances: 100,
		windowProps: {
			width: 320,
			height: 180,
			modifierClass:'window--tight'
		}
	},
	musicPlayer: {
		name: 'music-player',
		component:'music-player',
		allowedInstances: 1,
		windowProps: {
			width: 320,
			height: 180,
			modifierClass:'window--tight'
		}
	},
	textFile: {
		name: 'text-reader',
		component:'text-reader',
		allowedInstances: 1,
		windowProps: {
			width: 700,
			height: 400,
			modifierClass:'window--tight'
		}
	},
};