import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent } from "@material-ui/core";
import BinaryChoice from "../choice/binaryChoice";
import axios from "axios";
import * as Survey from "survey-react";
import "survey-react/survey.css";

Survey.StylesManager.applyTheme("orange");

const DecisionDialog = (props) => {
  const [binaryChoice, setBinaryChoice] = useState(null);
  const handleClose = () => {
    props.onClose();
  };

  const handleResponse = (response, index) => {
    console.log(response);
    setBinaryChoice(response);
  };

  const onComplete = (survey, options) => {
    //Write survey results into database
    console.log("Survey results: " + JSON.stringify(survey.data));
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

  let survey = binaryChoice ? (
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
          responseIndex={"sourceChoice"}
          handleResponse={handleResponse}
          question="how suspicious was the source?"
          tickLabels={["suspicious", "", "trustworthy"]}
          width="80%"
          height="125px"
        ></BinaryChoice>
        {survey}
      </DialogContent>
    </Dialog>
  );
};

export default DecisionDialog;
