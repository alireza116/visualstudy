import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Typography } from "@material-ui/core";

var parser = new DOMParser();

function parseString(encodedString) {
  var dom = parser.parseFromString(
    "<!doctype html><body>" + encodedString,
    "text/html"
  );
  var decodedString = dom.body.textContent;
  return decodedString;
}
const useStyles = makeStyles({
  tweetCard: {
    width: "60%",
    // height: "400px",
    backgroundColor: "white",
    borderRadius: 0,
    margin: "0 auto",
    marginBottom: "10px",
    marginTop: "25px",
    padding: "20px",
    // position: "fixed",
    // bottom: 0,
  },
});

const Tweet = (props) => {
  //   console.log(props.text);
  console.log(props.showImage);
  const showImage = props.showImage;
  const classes = useStyles();

  return (
    <Card className={classes.tweetCard}>
      <Typography variant="body1" style={{ marginBottom: "10px" }}>
        {parseString(props.text)}
      </Typography>
      <p>{props.showImage}</p>
      <div style={{ textAlign: "center" }}>
        {props.showImage ? (
          <img src={props.src} style={{ borderRadius: 15 }} />
        ) : null}
      </div>
    </Card>
  );
};

export default Tweet;
