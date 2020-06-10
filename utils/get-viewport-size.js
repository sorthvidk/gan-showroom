import ViewportSizes from '~/model/viewport-sizes'

export default function() {
	let viewportMatch
	Object.keys(ViewportSizes).forEach(name => {
		let current = ViewportSizes[name]
		let boundLow = current.boundLow ? current.boundLow : 0
		let boundHigh = current.boundHigh ? current.boundHigh : 100000
		if ( window.matchMedia(`(min-width: ${boundLow}px) and (max-width: ${boundHigh}px)`).matches ) viewportMatch = name
	})
	return viewportMatch
};