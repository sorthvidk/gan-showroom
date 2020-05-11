export default function(callbackSmallViewport, callbackLargeViewport, maxWidth=1024) {
	let mql = window.matchMedia(`(max-width: ${maxWidth}px)`);

	function screenTest(e) {
		if (e.matches) {
			try {
				callbackSmallViewport();
			}catch(error) {
				console.warn(error);
			}

		} else {
			try {
				callbackLargeViewport();
			}catch(error) {
				console.warn(error);
			}
		}
	}

	mql.addListener(screenTest);

	return mql.matches;
}