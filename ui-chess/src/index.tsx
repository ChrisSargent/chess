import React, { useState } from "react";
import ReactDOM from "react-dom";
import Chessboard from "chessboardjsx";
import "reset-css";

declare global {
  interface Window {
    setBoardPosition: any;
  }
}

const Chess = () => {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const positionFromURL = params.get("position");

  const [position, setPosition] = useState(positionFromURL || "");
  window.setBoardPosition = setPosition;

  return (
    <Chessboard
      calcWidth={({ screenWidth, screenHeight }) => {
        console.log(screenWidth);

        return Math.min(screenWidth, screenHeight);
      }}
      draggable={false}
      position={position}
    />
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Chess />
  </React.StrictMode>,
  document.getElementById("root")
);
