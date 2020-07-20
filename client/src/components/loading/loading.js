import { CircularProgress } from "@material-ui/core";
import React from "react";

const LoadingCircle = (props) => {
  let opacity = props.opacity || 0;
  return (
    <CircularProgress
      size={300}
      thickness={10}
      style={{
        position: "absolute",
        top: "30%",
        left: "40%",
        color: "orange",
        display: props.show,
        opacity: opacity,
        pointerEvents: "none",
      }}
    ></CircularProgress>
  );
};

export default LoadingCircle;
