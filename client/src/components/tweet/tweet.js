import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Typography } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
// import { teal } from "@material-ui/core/colors";

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
    // paddingLeft: "10px",
    paddingRight: "50px",
    paddingTop: "20px",
    paddingBottom: "20px",
  },
});

const Tweet = (props) => {
  const classes = useStyles();
  console.log();
  return (
    <Card className={classes.tweetCard}>
      <div style={{ width: "100%" }}>
        <div
          style={{
            float: "left",
            paddingLeft: "10px",
            paddingRight: "10px",
          }}
        >
          <div
            style={{
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              backgroundColor: "grey",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <PersonIcon></PersonIcon>
          </div>
        </div>
        <div style={{ width: "80%", float: "left" }}>
          <p style={{ margin: 0 }}>
            <span style={{ fontWeight: "bold" }}>
              {" "}
              Twitter Account {props.accAlias}{" "}
            </span>
            <span style={{ color: "grey" }}>@{props.accAlias}News</span>
          </p>
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
