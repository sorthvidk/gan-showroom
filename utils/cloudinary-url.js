export default function(asset) {
	if ( asset && asset.cloudinaryUrl ) return asset.cloudinaryUrl;
	else return '/img/styles/dummy.jpg';
	// return `https://res.cloudinary.com/sorthvid/image/upload/t_${capitalize(asset.imageAspect)}/${asset.assetId}/sample.jpg`;
}