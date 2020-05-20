import isMobile from '~/utils/is-mobile'
import getUniqueId from '~/utils/get-unique-id'

const LARGE_WINDOW = 320 // arbitary, kinda the size of a 'fullscreen' window of mobile
const RIGHT_CLEARENCE = 320 // arbitary, used to not place windows on top of the assistant

const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

const MOBILE_GUTTERS_HORIZONTAL = 10 // left margin
const MOBILE_GUTTERS_VERTICAL = 10 + (10 + 45) //top + (bottom + navbar)

const safelyPlaceAt = (place, sizeW) =>
	place + sizeW > 375 ? MOBILE_GUTTERS_HORIZONTAL : place

// returns a semi-random value, depending on the length of state.windowList
// values are loosly structured on four columns
export const placementX = (state, sizeW) => {
	const amount = 4
	const gutter = (window.innerWidth - RIGHT_CLEARENCE) / (amount + 1)
	const placements = [gutter, gutter * 2, gutter * 3, gutter * 4]

	return isMobile() && sizeW > LARGE_WINDOW
		? MOBILE_GUTTERS_HORIZONTAL // place all to the left
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

	const ifDefined = v =>
		windowProps[v] !== undefined
			? windowProps[v]
			: defaultWindowProps[v] !== undefined
			? defaultWindowProps[v]
			: null

	return {
		...currentWindow,
		windowId: '' + getUniqueId(),
		groupId,

		contentComponent,
		statusComponent,

		positionZ: windowProps.positionZ || state.highestZIndex + 1,

		windowProps: {
			sizeW: sizeW,
			sizeH: sizeH,
			positionX: defaultWindowProps.noPlacement ? 0 : placementX(state, sizeW),
			positionY: defaultWindowProps.noPlacement ? 0 : placementY(state, sizeH),
			noStatus: ifDefined('noStatus'),
			canResize: ifDefined('canResize'),
			modifierClass: ifDefined('modifierClass'),
			isMaximized: ifDefined('isMaximized'),
			noPlacement: ifDefined('noPlacement')
		}
	}
}
