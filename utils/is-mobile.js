export default function(maxWidth=1023) {
	let mobileViewport = window.matchMedia(`(max-width: ${maxWidth}px)`).matches;
	return mobileViewport;
};