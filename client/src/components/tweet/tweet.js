import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card } from "@material-ui/core";

const useStyles = makeStyles({
  tweetCard: {
    width: "60%",
    // height: "400px",
    backgroundColor: "#ececec",
    margin: "0 auto",
    marginBottom: "10px",
    marginTop: "10px",
    padding: "20px",
    // position: "fixed",
    // bottom: 0,
  },
});

const Tweet = (props) => {
  console.log(props.text);
  const classes = useStyles();
  return (
    <Card className={classes.tweetCard}>
      <p>{props.text}</p>
      <img src={props.src} style={{ margin: "0 auto" }} />
    </Card>
  );
};

export default Tweet;
