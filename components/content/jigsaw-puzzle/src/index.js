import { $ } from "./utils/dom.js";
import { pipe } from "./utils/pipe.js";
import { tap } from "./utils/tap.js";
import { event } from "./utils/event-listeners.js";

import { makeCanvas, updCanvas } from "./lib/make-canvas.js";
import { loadImage } from "./lib/load-image.js";
import { makePuzzle } from "./lib/make-puzzle.js";
import { makePieces } from "./lib/make-pieces.js";
import { shuffle } from "./lib/shuffle.js";
import { paint } from "./lib/paint.js";
import { activate } from "./lib/activate.js";
import { deactivate } from "./lib/deactivate.js";
import { move } from "./lib/move.js";
import { snap } from "./lib/snap.js";
import { status } from "./lib/status.js";
import { gather } from "./lib/gather.js";
import { clone } from "./lib/clone.js";

export const puzzle = async ({
  element,
  restore = {},
  image: img = "",
  pieces: ps = { x: 6, y: 4 },
  attraction = 20,
  size = 0.8,
  draggable = false,
  onComplete = () => {},
  onChange: changecb = () => {},
}) => {
  // game board
  const container = typeof element === "string" ? $(element) : element;

  if (!container) {
    console.warn(`Couldn't find element: ${element}`);
    return;
  }

  // initial setup
  const canvas = makeCanvas(container);
  const image = restore.image || (await loadImage(img));
  const puzzle = () =>
    restore.puzzle ||
    makePuzzle(ps, image, attraction, container, size, draggable, onComplete);
  const pieces = restore.pieces || makePieces(puzzle());

  // passed on-change callback
  const onChange = tap(pipe(clone, changecb));

  // initial state
  const initState = () => ({
    image,
    canvas,
    pieces,
    puzzle: puzzle(),
  });

  // 'global' game state
  let state = initState();

  // initial paint
  state = restore.puzzle ? pipe(paint)(state) : pipe(shuffle, paint)(state);

  // user interactions
  const eventListeners = [
    event(window).resize(
      (e) => (state = pipe(updCanvas, gather, paint)(state))
    ),
    event(window).scroll((e) => (state = pipe(updCanvas)(state))),
    event(state.canvas).mousedown(
      (e) => (state = pipe(activate(e), paint)(state))
    ),
    event(state.canvas).mousemove((e) => (state = pipe(move(e), paint)(state))),
    event(document.body).mouseup(
      (e) => (state = pipe(snap, deactivate, status, paint, onChange)(state))
    ),
  ];

  // exposed api
  return {
    newGame: () => (state = pipe(shuffle, paint)(initState())),
    getState: () => clone(state),
    setState: (newState) => (state = pipe(clone, paint)(newState)),
    update: () => (state = pipe(updCanvas, paint)(state)),
    destroy: () => {
      if (element.tagName !== "CANVAS") {
        state.canvas.element.remove();
      }

      state = null;
      eventListeners.map((listener) => listener.remove());
    },
  };
};

export default puzzle;
