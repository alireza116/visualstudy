import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import BinaryChoice from "../../components/choice/binaryChoice";
import DecisionDialog from "../../components/dialog/decisionDialog";
import AlertDialog from "../../components/dialog/alertDialog";
import Tweet from "../../components/tweet/tweet";
import LoadingCircle from "../../components/loading/loading";
import { useHistory } from "react-router-dom";
import { Button, Divider } from "@material-ui/core";
import $ from "jquery";

// let index = 0;

const StudyPage = (props) => {
  //   console.log(props.setChoice);
  const history = useHistory();
  const [answerCount, setAnswerCount] = [
    props.answerCount,
    props.setAnswerCount,
  ];
  const [loadingPpacity, setLoadingOpacity] = useState(0);
  const [data, setData] = useState([]);
  const [choiceContent, setChoiceContent] = useState([]);
  const [showImage, setShowImage] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [tweetResponses, setTweetResponses] = useState({});
  const [accountResponse, setAccountResponse] = useState({});
  const [accAssignment, setAccAssignment] = useState({});

  const divContainer = useRef(null);

  const handleResponse = (response, index) => {
    if (response) response.index = index;
    setTweetResponses((responses) => {
      responses[index] = response;
      return responses;
    });
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = (value) => {
    props.setAccIndex(props.accIndex + 1);
    setOpenDialog(false);
  };

  const handleCloseAlert = (value) => {
    setOpenAlert(false);
  };

  const handleDecision = () => {
    console.log(tweetResponses);
    handleOpenDialog();
  };

  const handleAddMoreClick = () => {
    if (tweetResponses[answerCount]) {
      setAnswerCount(answerCount + 1);
    } else {
      setOpenAlert(true);
    }
  };

  const addContent = () => {
    let content = [];
    for (let i = 0; i <= answerCount; i++) {
      content.push(
        <Tweet
          key={`tweet_${i}`}
          text={data[i].clean_text}
          src={`/images/${data[i].idx}.png`}
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
    setChoiceContent(content);
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
    if (accountResponse) {
      let userResponse = {
        tweetResponses: tweetResponses,
        accountResponse: accountResponse,
        accAssignment: accAssignment,
      };
      console.log(userResponse);
      // props.setAccIndex(props.accIndex + 1);
    }
  }, [accountResponse]);

  useEffect(() => {
    if (divContainer.current) {
      scrollToBottom();
    }
  }, [answerCount]);

  useEffect(() => {
    async function fetchData() {
      const result = await axios.post("/rq1/data", {
        accIndex: props.accIndex,
      });
      setChoiceContent([]);
      setLoadingOpacity(0.8);
      setTimeout(() => {
        setLoadingOpacity(0);
        setTweetResponses([]);
        setData(result.data.data);
        setShowImage(result.data.showImage);
        setAccAssignment(result.data.accAssignment);
        setAnswerCount(0);
      }, 1000);
    }
    if (props.accIndex < 8) {
      fetchData();
    } else {
      history.push("/post");
    }
  }, [props.accIndex]);

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
      <DecisionDialog
        open={openDialog}
        onClose={handleCloseDialog}
        setAccountResponse={setAccountResponse}
      ></DecisionDialog>
      <AlertDialog
        open={openAlert}
        onClose={handleCloseAlert}
        message="Please make a decision about the previous tweet to be able to see more!"
      ></AlertDialog>
      <LoadingCircle opacity={loadingPpacity}></LoadingCircle>
    </div>
  );
};

export default StudyPage;
