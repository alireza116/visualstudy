import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import BinaryChoice from "../../components/choice/binaryChoice";
import DecisionDialog from "../../components/dialog/decisionDialog";
import AlertDialog from "../../components/dialog/alertDialog";
import PersonDialog from "../../components/dialog/personDialog";
import Tweet from "../../components/tweet/tweet";
import LoadingCircle from "../../components/loading/loading";
import Instructions from "../../components/instructions/instructions";
import { useHistory } from "react-router-dom";
import { Button, Divider } from "@material-ui/core";
import $ from "jquery";

const Task2Page = (props) => {
  //   console.log(props.setChoice);
  const history = useHistory();
  const [answerCount, setAnswerCount] = [
    props.answerCount,
    props.setAnswerCount,
  ];
  const [loadingOpacity, setLoadingOpacity] = useState(0);
  const [data, setData] = useState([]);
  const [choiceContent, setChoiceContent] = useState([]);
  const [showImage, setShowImage] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [openPersonDialog, setOpenPersonDialog] = useState(false);
  const [tweetResponses, setTweetResponses] = useState({});
  const [accountResponse, setAccountResponse] = useState({});
  const [personResponse, setPersonResponse] = useState({});
  const [personAssignment, setpersonAssignment] = useState({});

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
    props.setPersonIndex(props.personIndex + 1);
    setOpenDialog(false);
  };

  const handleOpenPersonDialog = (value) => {
    setOpenPersonDialog(true);
  };

  const handleClosePersonDialg = (value) => {
    setOpenPersonDialog(false);
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
          question="How Biased/Not Biased is this tweet?"
          tickLabels={["Biased", "", "Not Biased"]}
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
        personResponse: personResponse,
        tweetResponses: tweetResponses,
        accountResponse: accountResponse,
        personAssignment: personAssignment,
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
      const result = await axios.post("/rq2/data", {
        personIndex: props.personIndex,
      });
      setChoiceContent([]);
      setLoadingOpacity(0.8);
      setTimeout(() => {
        setLoadingOpacity(0);
        setTweetResponses([]);
        console.log(result.data.data);
        setData(result.data.data);
        setShowImage(result.data.showImage);
        console.log(result.data.personAssignment);
        setpersonAssignment(result.data.personAssignment);
        setAnswerCount(0);
        handleOpenPersonDialog();
      }, 1000);
    }
    if (props.personIndex < 8) {
      fetchData();
    } else {
      history.push("/post");
    }
  }, [props.personIndex]);

  useEffect(() => {
    if (data.length > 0) {
      if (answerCount < data.length) {
        addContent();
      } else {
        history.push("/post");
      }
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
      <Instructions accAlias={personAssignment.accAlias}></Instructions>
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
            backgroundColor: "#1DA1F2",
            // color: "black",
          }}
          color="primary"
          variant="contained"
          onClick={handleAddMoreClick}
        >
          See More Tweets
        </Button>
        <Button
          style={{ backgroundColor: "#1DA1F2" }}
          color="primary"
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
      <PersonDialog
        open={openPersonDialog}
        onClose={handleClosePersonDialg}
        setPersonResponse={setPersonResponse}
        person={personAssignment.person}
      ></PersonDialog>
      <AlertDialog
        open={openAlert}
        onClose={handleCloseAlert}
        message="Please make a decision about the previous tweet to be able to see more!"
      ></AlertDialog>
      <LoadingCircle opacity={loadingOpacity}></LoadingCircle>
    </div>
  );
};

export default Task2Page;
