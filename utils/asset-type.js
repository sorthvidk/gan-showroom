import ContentTypes from '~/model/content-types'

export default function(asset) {

	switch (asset.type) {
		case 'image':
			switch (asset.imageAspect) {
				case 'portrait':
					return ContentTypes.imagePortrait;
				break;
				case 'landscape':
					return ContentTypes.imageLandscape;
				break;
				case 'square':
					return ContentTypes.imageSquare;
				break;				
			}
		break;
		case 'video':
			case 'portrait':
				return ContentTypes.videoPortrait;
			break;
			case 'landscape':
				return ContentTypes.videoLandscape;
			break;
		break;
	}

	//if all else fails
	console.warn("NO ASSET TYPE FOUND", asset)
	return ContentTypes.imagePortrait;
}