import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  tweetCard: {
    width: "60%",
    // height: "400px",
    backgroundColor: "white",
    borderRadius: 0,
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
  const showImage = props.showImage || true;
  const classes = useStyles();
  const image = showImage ? (
    <img src={props.src} style={{ borderRadius: 15 }} />
  ) : null;
  return (
    <Card className={classes.tweetCard}>
      <Typography variant="body1" style={{ marginBottom: "10px" }}>
        {props.text}
      </Typography>
      <div style={{ textAlign: "center" }}>{image}</div>
    </Card>
  );
};

export default Tweet;
