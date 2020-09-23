import React from "react";
import ReactDOM from "react-dom";
import Chessboard from "chessboardjsx";
import "reset-css";

ReactDOM.render(
  <React.StrictMode>
    <Chessboard
      calcWidth={({ screenWidth, screenHeight }) => Math.min(screenWidth, screenHeight)}
      draggable={false}
      position="2R5/4bppk/1p1p3Q/5R1P/4P3/5P2/r4q1P/7K b - - 6 50"
    />
  </React.StrictMode>,
  document.getElementById("root")
);
