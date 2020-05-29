import isMobile from '~/utils/is-mobile'
import getUniqueId from '~/utils/get-unique-id'

const LARGE_WINDOW = 320 // arbitary, kinda the size of a 'fullscreen' window of mobile
const RIGHT_CLEARENCE = 320 // arbitary, used to not place windows on top of the assistant

const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

const MOBILE_GUTTERS_HORIZONTAL = 10 // left margin
const MOBILE_GUTTERS_VERTICAL = 10 + (10 + 45) //top + (bottom + navbar)

// returns mobile_gutter if the window size is larger than 375
const safelyPlaceAt = (place, sizeW) =>
	place + sizeW > 375 ? MOBILE_GUTTERS_HORIZONTAL : place

// returns a semi-random value, depending on the length of state.windowList
// values are loosly structured on four columns
export const placementX = (state, sizeW) => {
	const amount = 4
	const gutter = (window.innerWidth - RIGHT_CLEARENCE) / (amount + 1)
	const placements = [gutter, gutter * 2, gutter * 3, gutter * 4]

	return isMobile() && sizeW > LARGE_WINDOW
		? MOBILE_GUTTERS_HORIZONTAL // place all the way to the left
		: isMobile()
		? safelyPlaceAt(
				MOBILE_GUTTERS_HORIZONTAL + (state.windowList.length % 4) * 15,
				sizeW
		  ) // if the window can fit, then place it staggering, or else all to the left
		: Math.max(
				random(10, 20),
				placements[(state.windowList.length + 1) % amount] -
					sizeW / 2 +
					random(-30, 30)
		  )
}

// returns a random value that takes the window size in account
export const placementY = (state, sizeH) => {
	return isMobile()
		? 50 + state.windowList.length * 15
		: Math.max(
				0,
				random(40, window.innerHeight - (sizeH || 0) - MOBILE_GUTTERS_VERTICAL)
		  )
}

export default function(state, currentWindow, groupId) {
	const {
		windowProps = {},
		type: contentType,
		title: contentName,
		contentComponentProps
	} = currentWindow

	const {
		contentComponent,
		statusComponent,
		defaultWindowProps
	} = currentWindow.type

	const sizeW =
		windowProps.width ||
		defaultWindowProps[isMobile() ? 'smallWidth' : 'largeWidth']
	const sizeH =
		windowProps.height ||
		defaultWindowProps[isMobile() ? 'smallHeight' : 'largeHeight']

	const conditionalAssignment = (obj, attr) => {
		if (typeof windowProps[attr] !== 'undefined') obj[attr] = windowProps[attr]
		else if (typeof defaultWindowProps[attr] !== 'undefined')
			obj[attr] = defaultWindowProps[attr]
	}

	let optionalProps = {}
	conditionalAssignment(optionalProps, 'noStatus')
	conditionalAssignment(optionalProps, 'canReorder')
	conditionalAssignment(optionalProps, 'canResize')
	conditionalAssignment(optionalProps, 'modifierClass')
	conditionalAssignment(optionalProps, 'isMaximized')
	conditionalAssignment(optionalProps, 'noPlacement')

	let onTop
	if (contentComponentProps && contentComponentProps.asset) {
		onTop = contentComponentProps.asset.onTop
	}

	return {
		...currentWindow,
		windowId: '' + getUniqueId(),
		groupId,

		contentType,
		contentName,

		contentComponent,
		statusComponent,

		positionZ: onTop ? 500 : windowProps.positionZ || state.highestZIndex + 1,

		windowProps: {
			...optionalProps,
			sizeW: sizeW,
			sizeH: sizeH,
			positionX: defaultWindowProps.noPlacement ? 0 : placementX(state, sizeW),
			positionY: defaultWindowProps.noPlacement ? 0 : placementY(state, sizeH)
		}
	}
}
