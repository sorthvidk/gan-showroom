export default function(cl, asset, params={}) {
	let transform = {}
	let url

	if ( asset.cloudinaryUrl ) {
		if ( params.width ) {
			transform.width = params.width
		}
		if ( params.height ) {
			transform.height = params.height
		}

		if ( asset.type === 'image') {
		}
		else if ( asset.type === 'video' ) {
			transform.codec = 'h264'
		}

		url = cl.url(asset.cloudinaryUrl, transform);
	}
	else {
		url = asset.defaultImageUrl;
	}
	console.log("URL: "+url)
	
	return url;
}
