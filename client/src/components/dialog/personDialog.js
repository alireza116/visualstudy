import React from "react";
import { Dialog, DialogTitle, DialogContent } from "@material-ui/core";
// import BinaryChoice from "../choice/binaryChoice";
// import axios from "axios";
import * as Survey from "survey-react";
import "survey-react/survey.css";

Survey.StylesManager.applyTheme("orange");

const PeresonDialog = (props) => {
  let results;
  const handleClose = () => {
    if (results) {
      props.onClose();
    }
  };

  const onComplete = (survey, options) => {
    //Write survey results into database
    results = { ...survey.data };
    props.setPersonResponse(results);
    props.onClose();
  };

  const json = {
    elements: [
      {
        type: "radioGroup",
        name: "familiarity",
        title: `How familiar are you with ${props.person}?`,
        isRequired: true,
        colCount: 0,
        choices: [
          "Not at all familiar",
          "Slightly familiar",
          "Somewhat familiar",
          "Moderately familiar",
          "Extremely familiar",
        ],
      },
      {
        type: "radioGroup",
        name: "favorability",
        title: `From negative to positive, what is your view of ${props.person}?`,
        isRequired: true,
        colCount: 0,
        choices: [
          "Very negative",
          "Slightly negative",
          "Neutral",
          "Slightly Positive",
          "Very Positive",
        ],
      },
    ],
  };

  const model = new Survey.Model(json);

  let survey = <Survey.Survey model={model} onComplete={onComplete} />;
  //   model.showCompletedPage = false;
  model.completedHtml = "<p>Thanks for completing this task</p>";
  return (
    <Dialog
      // onClose={handleClose}
      maxWidth="lg"
      aria-labelledby="simple-dialog-title"
      open={props.open}
      scroll="paper"
    >
      <DialogTitle id="simple-dialog-title">
        Please answer the following questions about {props.person}
      </DialogTitle>
      <DialogContent>{survey}</DialogContent>
    </Dialog>
  );
};

export default PeresonDialog;
