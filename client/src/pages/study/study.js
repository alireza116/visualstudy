import React, { useState, useEffect } from "react";
import axios from "axios";
import BinaryChoice from "../../components/choice/binaryChoice";

const StudyPage = (props) => {
  //   console.log(props.setChoice);
  useEffect(() => {
    async function fetchData() {
      const result = await axios("/study/getData");
      console.log(result.data);
    }
    fetchData();
  });
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div
        className="choiceContainer"
        style={{ width: "30%", height: "20%", margin: "0 auto" }}
      >
        <BinaryChoice
          setChoice={props.setChoice}
          setUncertaintyCI={props.setUncertaintyCI}
        ></BinaryChoice>
      </div>
      <p>Choice:</p>
      <p>{props.choice}</p>
      <p>Uncertainty CI:</p>
      <p>
        `{props.uncertaintyCI[0]}, {props.uncertaintyCI[1]}`
      </p>
    </div>
  );
};

export default StudyPage;
