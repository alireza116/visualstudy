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
    width: "40%",
    backgroundColor: "white",
    borderRadius: 0,
    margin: "0 auto",
    marginBottom: "10px",
    marginTop: "25px",
    paddingLeft: "50px",
    paddingRight: "50px",
    paddingTop: "20px",
    paddingBottom: "20px",
  },
});

const Tweet = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.tweetCard}>
      <div style={{ width: "100%" }}>
        <div style={{ width: "100%", float: "left" }}>
          <Typography variant="body1" style={{ marginBottom: "10px" }}>
            {parseString(props.text)}
          </Typography>
          {props.showImage ? (
            <img src={props.src} style={{ borderRadius: 15, width: "80%" }} />
          ) : null}
        </div>
      </div>
    </Card>
  );
};

export default Tweet;
