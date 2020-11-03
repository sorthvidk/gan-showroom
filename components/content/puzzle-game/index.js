import { $ } from './src/utils/dom.js'
import { pipe } from './src/utils/pipe.js'
import { event } from './src/utils/event-listeners.js'

import { makeCanvas, updCanvas } from './src/lib/make-canvas.js'
import { loadImage } from './src/lib/load-image.js'
import { makePuzzle } from './src/lib/make-puzzle.js'
import { makePieces } from './src/lib/make-pieces.js'
import { shuffle } from './src/lib/shuffle.js'
import { paint } from './src/lib/paint.js'
import { activate, deactivate } from './src/lib/activate.js'
import { move } from './src/lib/move.js'
import { snap } from './src/lib/snap.js'
import { status } from './src/lib/status.js'
import { gather } from './src/lib/gather.js'
import { clone } from './src/lib/clone.js'

export const puzzle = async ({
	element,
	restore = {},
	image: img = '',
	pieces: ps = { x: 6, y: 4 },
	attraction = 20,
	size = 0.8,
	draggable = false,
	onInit = () => {},
	onComplete = () => {},
	onChange: cb = () => {}
}) => {
	// game board
	const container = typeof element === 'string' ? $(element) : element

	if (!container) {
		console.warn(`Couldn't find element: ${element}`)
		return
	}

	// initial setup
	const canvas = makeCanvas(container)
	const image = await loadImage(img)
	const puzzle = () =>
		restore.puzzle ||
		makePuzzle(ps, image, attraction, container, size, draggable, onComplete)
	const pieces = restore.pieces || makePieces(puzzle())

	const onChange = state => {
		cb(clone(state))
		return state
	}

	// initial state
	const initState = () => ({
		image,
		canvas,
		pieces,
		puzzle: puzzle()
	})

	// 'global' game state
	let state = initState()

	// initial paint
	state = restore.puzzle ? pipe(paint)(state) : pipe(shuffle, paint)(state)

	onInit(state)

	// user interactions
	const eventListeners = [
		event(window).resize(
			e => (state = pipe(updCanvas, gather, paint, onChange)(state))
		),
		event(window).scroll(e => (state = pipe(updCanvas, onChange)(state))),
		event(state.canvas).mousedown(
			e => (state = pipe(activate(e), paint)(state))
		),
		event(state.canvas).mousemove(e => (state = pipe(move(e), paint)(state))),
		event(document.body).mouseup(
			e => (state = pipe(snap, deactivate, status, paint, onChange)(state))
		)
	]

	// exposed api
	return {
		newGame: () => (state = pipe(shuffle, paint)(initState())),
		getState: () => clone(state),
		setState: newState => (state = pipe(clone, paint)(newState)),
		update: () => (state = pipe(updCanvas, paint, onChange)(state)),
		destroy: () => {
			// state.canvas.element.remove()
			state = null
			eventListeners.map(listener => listener.remove())
		}
	}
}

export default puzzle
