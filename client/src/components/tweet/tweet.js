import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  tweetCard: {
    width: "60%",
    // height: "400px",
    backgroundColor: "#F7F5F5",
    margin: "0 auto",
    marginBottom: "10px",
    marginTop: "10px",
    padding: "20px",
    // position: "fixed",
    // bottom: 0,
  },
});

const Tweet = (props) => {
  //   console.log(props.text);
  const classes = useStyles();
  return (
    <Card className={classes.tweetCard}>
      <Typography variant="body1" style={{ marginBottom: "10px" }}>
        {props.text}
      </Typography>
      <div style={{ textAlign: "center" }}>
        <img src={props.src} style={{ borderRadius: 15 }} />
      </div>
    </Card>
  );
};

export default Tweet;
