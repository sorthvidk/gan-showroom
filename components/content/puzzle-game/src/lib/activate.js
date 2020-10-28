import {
  activeLast,
  connectedFirst,
  mapReverse,
  map
} from "./../utils/array-helpers.js";
import { pipe } from "./../utils/pipe.js";

// export const activateNew = (e) => (state) => ({
//   ...state,
//   pieces: pipe(
//     mapReverse(piece => ({
//       ...piece,
//       active:
//         (e.clientX - state.canvas.pos.x) * state.canvas.DPI >= piece.curPos.x &&
//         (e.clientX - state.canvas.pos.x) * state.canvas.DPI <=
//           piece.curPos.x + piece.width &&
//         (e.clientY - state.canvas.pos.y) * state.canvas.DPI >= piece.curPos.y &&
//         (e.clientY - state.canvas.pos.y) * state.canvas.DPI <=
//           piece.curPos.y + piece.height
//     })),
//   )(state.pieces)
// });

export const activate = (e) => (state) => {
  const clickedPos = {
    x: (e.clientX - state.canvas.pos.x) * state.canvas.DPI,
    y: (e.clientY - state.canvas.pos.y) * state.canvas.DPI
  };

  // backwards map to hit piece on top
  const activePiece = state.pieces
    .slice(0)
    .reverse()
    .find(
      (piece) =>
        clickedPos.x >= piece.curPos.x &&
        clickedPos.x <= piece.curPos.x + piece.width &&
        clickedPos.y >= piece.curPos.y &&
        clickedPos.y <= piece.curPos.y + piece.height
    );

  if (!activePiece) {
    if (state.puzzle.draggable) {
      // make all pieces active
      state.pieces = state.pieces.map((piece) => ({
        ...piece,
        active: {
          x: clickedPos.x - piece.curPos.x,
          y: clickedPos.y - piece.curPos.y
        }
      }));
    }

    return state;
  }

  activePiece.active = {
    x: clickedPos.x - activePiece.curPos.x,
    y: clickedPos.y - activePiece.curPos.y
  };

  state.pieces = state.pieces.map((piece) =>
    activePiece.connections.includes(piece.id)
      ? {
          ...piece,
          active: {
            x: clickedPos.x - piece.curPos.x,
            y: clickedPos.y - piece.curPos.y
          }
        }
      : piece
  );

  if (!state.puzzle.done) {
    // clicked piece is placed on top
    state.pieces.sort(activeLast);
  }

  return state;
};

export const deactivate = (state) => ({
  ...state,
  pieces: state.pieces
    // .sort(connectedFirst)
    .map((piece) => ({
      ...piece,
      active: false,
      alsoActive: false
    }))
});
