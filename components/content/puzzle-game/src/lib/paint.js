import { paintPiece } from "./paint-piece.js";
import { clearCanvas } from "./clear-canvas.js";

export const paint = (state) => ({
  ...state,
  canvas: {
    ...state.canvas,
    ctx: clearCanvas(state, state.canvas.ctx)
  },
  pieces: state.pieces.map(paintPiece(state))
});
