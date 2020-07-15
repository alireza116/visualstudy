import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent } from "@material-ui/core";
import BinaryChoice from "../choice/binaryChoice";
import axios from "axios";
import * as Survey from "survey-react";
import "survey-react/survey.css";

Survey.StylesManager.applyTheme("orange");

const DecisionDialog = (props) => {
  const [trustworthyChoice, setTrustworthyChoice] = useState(null);
  const [politicalStanceChoice, setPoliticalStanceChoice] = useState(null);
  const handleClose = () => {
    props.onClose();
  };

  const handleResponseTrustworthy = (response, index) => {
    response["index"] = index;
    setTrustworthyChoice(response);
  };

  const handleResponseStance = (response, index) => {
    response["index"] = index;
    setPoliticalStanceChoice(response);
  };

  const onComplete = (survey, options) => {
    //Write survey results into database
    let results = { ...survey.data };
    results["trustworthyChoice"] = trustworthyChoice;
    results["politicalStanceChoice"] = politicalStanceChoice;
    console.log(results);
    props.onClose();
  };

  const json = {
    elements: [
      {
        type: "comment",
        name: "choiceComment",
        title: "How did you arrive to this decision?",
        isRequired: true,
      },
    ],
  };

  const model = new Survey.Model(json);

  let survey =
    politicalStanceChoice && trustworthyChoice ? (
      <Survey.Survey model={model} onComplete={onComplete} />
    ) : (
      ""
    );
  //   model.showCompletedPage = false;
  model.completedHtml = "<p>Thanks for completing this task</p>";
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={props.open}
      scroll="paper"
    >
      <DialogTitle id="simple-dialog-title">
        Please answer the following questions about the trustworthiness of the
        source:
      </DialogTitle>
      <DialogContent>
        <BinaryChoice
          responseIndex={"trustworthyChoice"}
          choiceDomain={[0, 1]}
          handleResponse={handleResponseTrustworthy}
          question="how suspicious was the source?"
          tickLabels={["suspicious", "", "trustworthy"]}
          width="80%"
          height="125px"
        ></BinaryChoice>
        <BinaryChoice
          responseIndex={"politicalStanding"}
          handleResponse={handleResponseStance}
          question="What do you think is the political standing of this source?"
          tickLabels={["left", "center", "right"]}
          width="80%"
          height="125px"
        ></BinaryChoice>
        {survey}
      </DialogContent>
    </Dialog>
  );
};

export default DecisionDialog;
