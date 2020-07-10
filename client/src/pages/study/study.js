import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import BinaryChoice from "../../components/choice/binaryChoice";
import Tweet from "../../components/tweet/tweet";
import { Button, Divider } from "@material-ui/core";
import $ from "jquery";

const StudyPage = (props) => {
  //   console.log(props.setChoice);
  const [answerCount, setAnswerCount] = useState(0);
  const [data, setData] = useState([]);
  const divContainer = useRef(null);
  const [choiceContent, setChoiceContent] = useState([]);

  const scrollToBottom = () => {
    if (divContainer.current) {
      // divContainer.current.scrollTop = divContainer.current.scrollHeight;
      // divContainer.current.scrollIntoView({ behavior: "smooth" });
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

  const addContent = () => {
    let content = [
      ...choiceContent,
      <Tweet
        key={`tweet_${answerCount}`}
        text={data[answerCount].text}
        src={`/testImages/${data[answerCount]._id}.png`}
      ></Tweet>,
      <BinaryChoice
        key={`choice_${answerCount}`}
        setChoice={props.setChoice}
        setUncertaintyCI={props.setUncertaintyCI}
        tickLabels={["suspicious", "-", "trustworthy"]}
      ></BinaryChoice>,
      <Divider key={`divider_${answerCount}`}></Divider>,
    ];
    setChoiceContent(content);
    setAnswerCount(answerCount + 1);
  };

  // addContent();

  useEffect(() => {
    async function fetchData() {
      const result = await axios("/study/getData");
      // console.log(result.data);
      let d = result.data.sort((a, b) => +b["dpfc_angry"] - +a["dpfc_angry"]);
      console.log(d);
      setData(d);
    }

    fetchData();
  }, [answerCount]);

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
      {choiceContent}
      {/* <Tweet></Tweet>

      <BinaryChoice
        setChoice={props.setChoice}
        setUncertaintyCI={props.setUncertaintyCI}
      ></BinaryChoice> */}
      {/* <p>Choice:</p>
      <p>{props.choice}</p>
      <p>Uncertainty CI:</p>
      <p>
        `{props.uncertaintyCI[0]}, {props.uncertaintyCI[1]}`
      </p> */}
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
          onClick={addContent}
        >
          See More Tweets
        </Button>
        <Button
          style={{ backgroundColor: "gray", color: "black" }}
          variant="contained"
          onClick={addContent}
        >
          Make a Decision
        </Button>
      </div>
    </div>
  );
};

export default StudyPage;
