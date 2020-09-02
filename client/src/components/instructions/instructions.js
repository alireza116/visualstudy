import React from "react";
import { Typography, Divider } from "@material-ui/core";
import { ConnectionStates } from "mongoose";

const Instructions = (props) => {
  return (
    <div
      style={{
        // textAlign: "center",
        width: "60%",
        margin: "0 auto",
      }}
    >
      <div>{props.children}</div>
      <Divider></Divider>
    </div>
  );
};

export default Instructions;
