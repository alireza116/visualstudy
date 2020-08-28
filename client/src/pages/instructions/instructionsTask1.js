import React from "react";
import { Button, Container } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  emph: {
    fontWeight: "bold",
  },
  highlight: {
    fontWeight: "bold",
    color: "red",
  },
  instructContainer: {
    height: "100%",
    margin: "0 auto",
    overflow: "auto",
  },
  image: {
    width: "50%",
    display: "block",
    margin: "auto",
  },
}));

const InstructionsTask1 = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const handleConsent = () => {
    history.push("/task1");
    // axios.get("/consent").then((result) => {
    //   //   console.log(result.data);

    // });
  };

  return (
    <Container maxWidth="lg" className={classes.instructContainer}>
      <h3>Task 1 Instructions</h3>
      <h3>Please read these instructions carefully</h3>
      <p>
        In this Task, you will evaluate tweets from the profile of 8 Twitter
        accounts. We have masked the real name of the account.
      </p>
      <ul>
        <li>
          By clicking on the See More button, you can see more tweets from this
          account. For each tweet, we ask you to elicit your judgmenet of that
          individual tweet.{" "}
        </li>
        <li>
          When you feel like you are ready to judge the trustworthiness of the
          account after evaluating multiple tweets, click on Make a Decision. A
          popup will appear with three questions about the crediblity, political
          orientation of the account, as well as an open ended question.
        </li>
      </ul>
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
          Continue
        </Button>
      </div>
    </Container>
  );
};

export default InstructionsTask1;
