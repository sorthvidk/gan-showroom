// is piece1 close to piece2
export const isClose = (p1, p2, state, position) => {
  const { attraction } = state.puzzle;

  const XY = position === "top" || position === "bottom" ? "y" : "x";
  const invXY = XY === "x" ? "y" : "x";

  const positive = position === "top" || position === "left" ? false : true;

  const size = p1[XY === "y" ? "height" : "width"];
  const offset = positive ? p2.curPos[XY] + size : p2.curPos[XY] - size;

  return (
    p1.curPos[XY] <= offset + attraction &&
    p1.curPos[XY] >= offset - attraction &&
    p1.curPos[invXY] <= p2.curPos[invXY] + attraction &&
    p1.curPos[invXY] >= p2.curPos[invXY] - attraction
  );
};
