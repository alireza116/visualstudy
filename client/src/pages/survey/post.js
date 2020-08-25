import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import * as Survey from "survey-react";
import "survey-react/survey.css";

Survey.StylesManager.applyTheme("orange");

const PostSurveyPage = (props) => {
  const history = useHistory();
  const json = {
    elements: [
      {
        type: "radiogroup",
        name: "economic",
        title:
          "How would you describe your political outlook with regard to economic issues?",
        isRequired: true,
        colCount: 5,
        choices: [
          "Very liberal",
          "Slightly liberal",
          "Moderate",
          "Slightly Conservative",
          "Very Consertavite",
        ],
      },
      {
        type: "radiogroup",
        name: "social",
        title:
          "How would you describe your political outlook with regard to social issues?",
        isRequired: true,
        colCount: 5,
        choices: [
          "Very liberal",
          "Slightly liberal",
          "Moderate",
          "Slightly Conservative",
          "Very Consertavite",
        ],
      },
      {
        type: "matrix",
        name: "emotions",
        isRequired: true,
        title:
          "Emotional state: This question consists of a number of words that describe different feelings and emotions. Read each item and then mark the appropriate answer in the space next to that word.\
        Indicate to what extent you have felt like this in the right now. Use the following scale to record your answers.",
        columns: [
          "Very slightly/Not at all",
          "A little",
          "Moderately",
          "Quite a bit",
          "Extremely",
        ],
        rows: [
          "Alert",
          "Ashamed",
          "Upset",
          "Nervous",
          "Determined",
          "Attentive",
          "Hostile",
          "Active",
          "Afraid",
          "Inspired",
        ],
      },
    ],
  };

  const onComplete = (survey, options) => {
    //Write survey results into database
    console.log("Survey results: " + JSON.stringify(survey.data));
    axios.post("/api/postq", survey.data).then((response) => {
      console.log(response);
      history.push("/debrief");
    });
  };

  const model = new Survey.Model(json);
  model.showCompletedPage = false;
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        margin: "0 auto",
        overflow: "auto",
        paddingTop: "30px",
        paddingBottm: "30px",
      }}
    >
      <Survey.Survey model={model} onComplete={onComplete} />
    </div>
  );
};

export default PostSurveyPage;
