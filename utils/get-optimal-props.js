import isMobile from '~/utils/is-mobile'

const WINDOW_CHROME_HEIGHT = 71
const WINDOW_CHROME_WIDTH = 2
const MOBILE_GUTTERS_HORIZONTAL = 10 + 10 //right + left
const MOBILE_GUTTERS_VERTICAL = 10 + (10 + 45) //top + (bottom + navbar)

export default function(windowContent) {

	let wW = window.innerWidth;
	let wH = window.innerHeight;

	let isMobile = isMobile();
	let newWindowContent = [];

	let wCL = windowContent.length

	for (var i = 0; i < wCL; i++) {
		let contentItem = windowContent[i];
		let contentType = contentItem.type;

		let windowProps = {};

		windowProps.modifierClass = contentType.defaultWindowProps.modifierClass ? contentType.defaultWindowProps.modifierClass : null;
		windowProps.noStatus = contentType.defaultWindowProps.noStatus ? contentType.defaultWindowProps.noStatus : false;
		windowProps.isMaximized = contentType.defaultWindowProps.isMaximized ? contentType.defaultWindowProps.isMaximized : false;
		windowProps.canResize = contentType.defaultWindowProps.canResize ? contentType.defaultWindowProps.canResize : true;
		
		windowProps.sizeW = contentType.defaultWindowProps.smallWidth > (wW + MOBILE_GUTTERS_HORIZONTAL) ? 
							(wW + MOBILE_GUTTERS_HORIZONTAL) : contentType.defaultWindowProps.smallWidth;
		windowProps.sizeH = contentType.defaultWindowProps.smallHeight > (wH + MOBILE_GUTTERS_VERTICAL) ? 
							(wH + MOBILE_GUTTERS_VERTICAL) : contentType.defaultWindowProps.smallWidth;

		if (!isMobile) {
			windowProps = {
				w: contentType.defaultWindowProps.largeWidth + WINDOW_CHROME_WIDTH,
				h: contentType.defaultWindowProps.largeHeight + WINDOW_CHROME_HEIGHT
			}
		}


		let offsetProps = windowContent[i];
		
		let newW = offsetProps.;
		let newH = 0;

		let newX = 0;
		let newY = 0;



		// DO STUFF


		newWindowContent.push()
	}


	return {
		positionX: newX,
		positionY: newY,
		sizeW: newW,
		sizeH: newH
	}
}