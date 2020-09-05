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

  let results;
  const handleClose = () => {
    if (results) {
      props.onClose();
    }
  };

  const handleResponseTrustworthy = (response, index) => {
    if (response) response.index = index;
    setTrustworthyChoice(response);
  };

  const handleResponseStance = (response, index) => {
    if (response) response.index = index;
    setPoliticalStanceChoice(response);
  };

  const onComplete = (survey, options) => {
    //Write survey results into database

    if (politicalStanceChoice && trustworthyChoice) {
      results = { ...survey.data };
      results["credibilityChoice"] = trustworthyChoice;
      results["politicalOrientationChoice"] = politicalStanceChoice;
      props.setAccountResponse(results);
      setTrustworthyChoice(null);
      setPoliticalStanceChoice(null);
      props.onClose();
    } else {
      alert(
        "please complete the credibility and political orientation questions."
      );
    }
  };

  const json = {
    elements: [
      {
        type: "comment",
        name: "sourceCommeent",
        title:
          "Please describe how the tweets (text and images) influenced your decisions about this account?",
        isRequired: false,
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

  // let survey = <Survey.Survey model={model} onComplete={onComplete} />;
  //   model.showCompletedPage = false;
  model.completedHtml = "<p>Thanks for completing this task</p>";
  return (
    <Dialog
      // onClose={handleClose}
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
          question="Please evaluate the credibility of this source."
          tickLabels={["Not Credible", "", "Credible"]}
          width="90%"
          height="125px"
        ></BinaryChoice>
        <BinaryChoice
          responseIndex={"politicalStanding"}
          handleResponse={handleResponseStance}
          question="What is the political orientation of this source?"
          tickLabels={["Left", "Center", "Right"]}
          width="90%"
          height="125px"
        ></BinaryChoice>
        {survey}
      </DialogContent>
    </Dialog>
  );
};

export default DecisionDialog;
