export default function(cl, asset, tf={}) {
	let transform = tf
	let resultUrl
	let parseUrl
	
	if ( asset.cloudinaryUrl ) {
		parseUrl = asset.cloudinaryUrl.split('upload/')[1]
		transform.crop = 'scale'

		if ( asset.type === 'video' ) {			
			transform.fetchFormat = 'auto' //may need to be h264?
			transform.width = 608
			transform.height = 342
			if ( asset.aspect === 'portrait' ) {
				transform.width = 274
				transform.height = 417
			}
			
			resultUrl = cl.video_url(parseUrl, transform);
		}
		else {
			resultUrl = cl.url(parseUrl, transform);
		}
	}
	else if ( typeof asset.defaultImageUrl != 'undefined' ) {
		resultUrl = asset.defaultImageUrl;
	}
	else {
		resultUrl = '/img/under-construction.gif' //fallback
	}

	console.warn('CLOUDINARY URL', parseUrl, transform, resultUrl)
	
	return resultUrl;
}
