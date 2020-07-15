import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import BinaryChoice from "../../components/choice/binaryChoice";
import DecisionDialog from "../../components/dialog/decisionDialog";
import Tweet from "../../components/tweet/tweet";
import { Button, Divider, Switch } from "@material-ui/core";
import $ from "jquery";

// let index = 0;

const StudyPage = (props) => {
  //   console.log(props.setChoice);
  const [answerCount, setAnswerCount] = useState(0);
  const [data, setData] = useState([]);
  const [choiceContent, setChoiceContent] = useState([]);

  const [happySort, setHappySort] = useState(true);
  const [showImage, setShowImage] = useState(true);

  const [openDialog, setOpenDialog] = React.useState(false);
  const [responses, setResponses] = useState({});

  const divContainer = useRef(null);

  const handleResponse = (response, index) => {
    console.log(index);
    // console.log(response);
    response.index = index;
    // let responsesCopy = { ...props.responses };
    setResponses((responses) => {
      responses[index] = response;
      return responses;
    });

    // });
  };

  const handleSort = (event) => {
    setHappySort(event.target.checked);
    let d;
    if (event.target.checked) {
      d = [...data].sort((a, b) => +b["dpfc_happy"] - +a["dpfc_happy"]);
    } else {
      d = [...data].sort((a, b) => +b["dpfc_angry"] - +a["dpfc_angry"]);
    }
    setData(d);
    setChoiceContent([]);
    setAnswerCount(0);
  };

  const handleShowImage = (event) => {
    setShowImage(event.target.checked);
  };

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = (value) => {
    setOpenDialog(false);
  };

  const handleDecision = () => {
    console.log(responses);
    handleClickOpen();
  };

  const scrollToBottom = () => {
    if (divContainer.current) {
      $(divContainer.current).animate(
        { scrollTop: divContainer.current.scrollHeight },
        500
      );
    }
  };

  useEffect(() => {
    if (divContainer.current) {
      scrollToBottom();
    }
  }, [answerCount]);

  const handleAddMoreClick = () => {
    setAnswerCount(answerCount + 1);
  };

  const addContent = () => {
    console.log(showImage);
    let content = [];
    for (let i = 0; i <= answerCount; i++) {
      content.push(
        <Tweet
          key={`tweet_${i}`}
          text={data[i].text}
          src={`/testImages/${data[i]._id}.png`}
          showImage={showImage}
        ></Tweet>
      );
      content.push(
        <BinaryChoice
          choiceDomain={[0.0, 1.0]}
          key={`choice_${i}`}
          responseIndex={i}
          handleResponse={handleResponse}
          tickLabels={["suspicious", "", "trustworthy"]}
        ></BinaryChoice>
      );
      content.push(<Divider key={`divider_${i}`}></Divider>);
    }
    // let content = [, ,];
    setChoiceContent(content);
  };

  useEffect(() => {
    async function fetchData() {
      const result = await axios("/study/getData");
      // console.log(result.data);
      let d;
      if (happySort) {
        d = result.data.sort((a, b) => +b["dpfc_happy"] - +a["dpfc_happy"]);
      } else {
        d = result.data.sort((a, b) => +b["dpfc_angry"] - +a["dpfc_angry"]);
      }
      setData(d);
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      addContent();
    }
  }, [data, answerCount, showImage]);

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
      ref={divContainer}
    >
      <p>Sort based on happiness?</p>
      <Switch onChange={handleSort} checked={happySort}></Switch>
      <p>show images?</p>
      <Switch onChange={handleShowImage} checked={showImage}></Switch>

      <div>{choiceContent}</div>

      <div
        style={{
          textAlign: "center",
          paddingTop: "10px",
          paddingBottom: "10px",
        }}
      >
        <Button
          style={{
            marginRight: "10px",
            backgroundColor: "gray",
            color: "black",
          }}
          variant="contained"
          onClick={handleAddMoreClick}
        >
          See More Tweets
        </Button>
        <Button
          style={{ backgroundColor: "gray", color: "black" }}
          variant="contained"
          onClick={handleDecision}
        >
          Make a Decision
        </Button>
      </div>
      <DecisionDialog open={openDialog} onClose={handleClose}></DecisionDialog>
    </div>
  );
};

export default StudyPage;
