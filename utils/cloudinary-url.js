export default function(asset) {
	return `https://res.cloudinary.com/sorthvid/image/upload/t_${capitalize(asset.imageAspect)}/${asset.assetId}/sample.jpg`;
}