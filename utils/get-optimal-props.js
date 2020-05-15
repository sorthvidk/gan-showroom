import isMobile from '~/utils/is-mobile'
import getUniqueId from '~/utils/get-unique-id'

const RIGHT_CLEARENCE = 320 // arbitary, used to not place windows on top of the assistant

const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

const MOBILE_GUTTERS_HORIZONTAL = 10 + 10 //right + left
const MOBILE_GUTTERS_VERTICAL = 10 + (10 + 45) //top + (bottom + navbar)

// returns a semi-random value, depending on the length of state.windowList
// values are loosly structured on four columns
export const placementX = (state, sizeW) => {
	const amount = 4
	const gutter = (window.innerWidth - RIGHT_CLEARENCE) / (amount + 1)
	const placements = [gutter, gutter * 2, gutter * 3, gutter * 4]

	return Math.max(
		random(10, 20),
		placements[(state.windowList.length + 2) % amount] -
			sizeW / 2 +
			random(-30, 30)
	)
}

// returns a random value that takes the window size in account
export const placementY = (state, sizeH) => {
	return isMobile()
		? (state.windowList.length + 1) * 40
		: random(40, window.innerHeight - (sizeH || 0) - MOBILE_GUTTERS_VERTICAL)
}

export default function(state, currentWindow, groupId) {
	const { statusComponentProps = {}, windowProps = {} } = currentWindow

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

	return {
		...currentWindow,
		windowId: '' + getUniqueId(),
		groupId,

		contentComponent,
		statusComponent,

		positionZ: windowProps.positionZ || state.highestZIndex + 1,

		windowProps: {
			...defaultWindowProps,
			sizeW,
			sizeH,
			positionX: defaultWindowProps.noPlacement ? 0 : placementX(state, sizeW),
			positionY: defaultWindowProps.noPlacement ? 0 : placementY(state, sizeH)
		}
	}
}
