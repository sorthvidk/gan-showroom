export default function(maxWidth=1024) {
	let mobileViewport = window.matchMedia(`(max-width: ${maxWidth}px)`).matches;
	return mobileViewport;
};