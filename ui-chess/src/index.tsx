import React from "react";
import ReactDOM from "react-dom";
import Chessboard from "chessboardjsx";
import "reset-css";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <Chessboard
      calcWidth={({ screenWidth, screenHeight }) => Math.min(screenWidth, screenHeight)}
      draggable={false}
      position="__BOARD_POSITION__"
    />
  </React.StrictMode>,
  document.getElementById("root")
);
