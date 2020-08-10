import React from "react";
import axios from "axios";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const Consent = (props) => {
  const history = useHistory();
  const handleConsent = () => {
    axios.get("/consent").then((result) => {
      //   console.log(result.data);
      history.push("/pre");
    });
  };

  return (
    <div
      style={{
        textAlign: "center",
        paddingTop: "10px",
        paddingBottom: "10px",
      }}
    >
      <Button
        style={{ backgroundColor: "gray", color: "black" }}
        variant="contained"
        onClick={handleConsent}
      >
        Give Consent
      </Button>
    </div>
  );
};

export default Consent;
