import ViewportSizes from '~/model/viewport-sizes'

export default function() {
	let mobileViewport = window.matchMedia(`(max-width: ${ViewportSizes.SMALL.boundHigh}px)`).matches;
	return mobileViewport;
};