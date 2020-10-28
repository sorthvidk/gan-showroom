import { shareConnections } from "./share-connections";
import { isClose } from "./is-close";

const moveConnections = (state, activePiece, distance) => {
  activePiece.connections.forEach((id) => {
    const connection = state.pieces.find((piece) => piece.id === id);
    connection.curPos = {
      x: connection.curPos.x + distance.x,
      y: connection.curPos.y + distance.y
    };
  });
};

export const snap = (state) => {
  const activePieces = state.pieces.filter((piece) => piece.active);

  if (!activePieces.length) {
    return state;
  }

  activePieces.forEach((piece) => {
    Object.entries(piece.neighbors).forEach(([position, id]) => {
      const neighbor = state.pieces.find((piece) => piece.id === id);

      if (isClose(neighbor, piece, state, position)) {
        switch (position) {
          case "top":
            const distance1 = {
              x: neighbor.curPos.x - piece.curPos.x,
              y: neighbor.curPos.y + neighbor.height - piece.curPos.y
            };
            moveConnections(state, piece, distance1);
            piece.curPos = {
              x: neighbor.curPos.x,
              y: neighbor.curPos.y + neighbor.height
            };
            break;

          case "right":
            const distance2 = {
              x: neighbor.curPos.x - neighbor.width - piece.curPos.x,
              y: neighbor.curPos.y - piece.curPos.y
            };
            moveConnections(state, piece, distance2);
            piece.curPos = {
              x: neighbor.curPos.x - neighbor.width,
              y: neighbor.curPos.y
            };
            break;

          case "bottom":
            const distance3 = {
              x: neighbor.curPos.x - piece.curPos.x,
              y: neighbor.curPos.y - neighbor.height - piece.curPos.y
            };
            moveConnections(state, piece, distance3);
            piece.curPos = {
              x: neighbor.curPos.x,
              y: neighbor.curPos.y - neighbor.height
            };
            break;

          case "left":
            const distance4 = {
              x: neighbor.curPos.x + neighbor.width - piece.curPos.x,
              y: neighbor.curPos.y - piece.curPos.y
            };
            moveConnections(state, piece, distance4);
            piece.curPos = {
              x: neighbor.curPos.x + neighbor.width,
              y: neighbor.curPos.y
            };
            break;

          default:
            return;
        }

        shareConnections(state, piece, neighbor);
      }
    });
  });

  return state;
};
