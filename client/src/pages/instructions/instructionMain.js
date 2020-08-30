import React, { useState } from "react";
import axios from "axios";
import { Button, Container } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import BinaryChoice from "../../components/choice/binaryChoice";
import AlertDialog from "../../components/dialog/alertDialog";

const useStyles = makeStyles((theme) => ({
  emph: {
    fontWeight: "bold",
  },
  highlight: {
    fontWeight: "bold",
    color: "red",
  },
  instructContainer: {
    height: "100%",
    margin: "0 auto",
    overflow: "auto",
  },
  image: {
    width: "50%",
    display: "block",
    margin: "auto",
  },
}));

const InstructionsMain = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const handleConsent = () => {
    if (
      ("CredibleCertain" in response) &
      ("notCredibleNotCertain" in response)
    ) {
      axios.post("/api/instructions", response).then((res) => {
        history.push("instructionst1");
      });
    } else setOpenAlert(true);
  };

  const [response, setResponse] = useState({});
  const [openAlert, setOpenAlert] = useState(false);

  const handleCloseAlert = (value) => {
    setOpenAlert(false);
  };

  const handleResponse = (response, index) => {
    if (response) response.index = index;
    console.log(response);
    setResponse((responses) => {
      responses[index] = response;
      console.log(responses);
      return responses;
    });
  };

  return (
    <Container maxWidth="lg" className={classes.instructContainer}>
      <h3>Study Instructions</h3>
      <h3>Please read these instructions carefully</h3>
      <p>
        In this study, our main goal is to understand how individuals form
        beliefs on
        <span className={classes.emph}> bias </span>,
        <span className={classes.emph}>credibility</span>, and{" "}
        <span className={classes.emph}>political orientation of source</span> of
        tweets.
      </p>
      <p>
        To do this we have collected tweets from multiple sources of news on
        Twitter. These tweets are about four years old and include many
        different domestic and international topics. We will not show you the
        source name (i.e., Twitter account that posted the tweet) so that your
        opinions are not influenced by your prior beliefs about that source. We
        ask you to base your judgments on only the information provided to you
        in this study.
      </p>
      <p className={classes.emph}>First, let’s review important definitions</p>
      <ul>
        <li>
          <span className={classes.emph}>Tweet</span> A piece of news on Twitter
          that includes a short piece of text, and may or may not include
          images.
        </li>
        <li>
          <span className={classes.emph}>Source</span> A Twitter account that
          produces news. In this study, you will assess the credibility of
          multiple sources of news on Twitter.
        </li>
        <li>
          <span className={classes.emph}>Biased / Not Biased:</span> a statement
          is biased when it reflects a partiality, preference, or prejudice for
          or against a person, object, or idea. If you feel like a tweet is
          impartial, you would rate it as not biased.
        </li>
        <li>
          <span className={classes.emph}>Not Credible / Credible:</span> : When
          you feel like a source is completely credible, it means that you are
          very likely to trust the content and news coming from that source. On
          the other hand, you would not trust a source that you feel is not
          credible.
        </li>
        <li>
          <span className={classes.emph}>
            Left / Right Political Orientation:
          </span>{" "}
          We are asking you to rate sources of news, based on your own knowledge
          of left (liberal) / right (conservative) political spectrum.
        </li>
      </ul>
      <p>
        {" "}
        Since these subjects cannot always be rated with very high certainty, we
        use a method to measure your uncertainty around your beliefs.
      </p>
      <p>
        This method allows you to first select what you believe to be the most
        likely rating, and next selecting a range of plausible alternatives
        (i.e., range of uncertainty around your decision).
      </p>
      <hr />
      <p>Let's look at example:</p>
      <p>
        In the animation below, the user determined a tweet is strongly biased
        and and was highly confident (with a small range of uncertainty around
        their decision).
      </p>
      <img
        src={process.env.PUBLIC_URL + "/uncertainty1.gif"}
        alt=""
        className={classes.image}
      />
      <p>
        In the next animation, we can see a user that believes a tweet is
        somewhat unbiased. However, they are not very sure and they think that
        it's possible that the tweet is moderately biased, so there is a large
        range of uncertainty around their decision.
      </p>
      <img
        src={process.env.PUBLIC_URL + "/uncertainty2.gif"}
        alt=""
        className={classes.image}
      />
      <hr />
      <p className={classes.emph}>Now let's practice with this technique:</p>
      <p>
        {" "}
        Imagine a scenario in which you are submiting your belief about how
        credible a source of news on Twitter is: <br />
        Assume you believe that{" "}
        <span className={classes.emph}> the source is very Credible</span>, and
        you are
        <span className={classes.emph}> very certain</span> of your decision.
      </p>
      <p>
        First use your mouse to hover on the chart. <br />
        Click to select the line that best represents your belief. <br />
        Then use the mouse to select the range of plausible alternatives that
        represents how uncertain you are about your belief.
      </p>
      <span className={classes.highlight}>
        {" "}
        use the chart below to show your decision
      </span>
      :
      <BinaryChoice
        choiceDomain={[0.0, 1.0]}
        responseIndex={"CredibleCertain"}
        handleResponse={handleResponse}
        question="How Not Credible / Credible is this source?"
        tickLabels={["Not Credible", "", "Credible"]}
      ></BinaryChoice>
      <hr />
      <h4>Another scenario:</h4>
      <p>
        {" "}
        Let's imagine you are assessing the crediblity of another source of news
        on Twitter: <br />
        you believe that{" "}
        <span className={classes.emph}>
          the source is definitely Not Credible
        </span>
        , and you are
        <span className={classes.emph}> very uncertain</span> of your judgment.{" "}
        <br />
        <br />
        <span className={classes.highlight}>
          {" "}
          use the chart below to show your decision
        </span>
      </p>
      <BinaryChoice
        choiceDomain={[0.0, 1.0]}
        responseIndex={"notCredibleNotCertain"}
        handleResponse={handleResponse}
        question="How Not Credible / Credible is this source?"
        tickLabels={["Not Credible", "", "Credible"]}
      ></BinaryChoice>
      <hr />
      <h4>What will you go through in this study</h4>
      <ul>
        <li>You will evaluate 16 accounts</li>
        <li>
          Tweets from these accounts, include text, and could include images
        </li>
        <li>
          You will evaluate Credibility and Political Orientation of all 16
          accounts using the method shown above.
        </li>
        <li>
          For each account, we ask that you write in two text boxes, how the the
          text and images influenced your judgment. If the account had no
          images, you can type N/A in the respective box.
        </li>
      </ul>
      <h4>For each account</h4>
      <ul>
        <li>
          {" "}
          You will go through tweets one by one and evalute how Biased each
          tweet is.
        </li>
        <li>You can click on "View More Tweets" to see the next one.</li>
        <li>
          Whenever you feel like you have made your judgment about that account,
          click on "Make a decision"
        </li>
        <li>
          A popup will appear and you will answer the questions about each
          account
        </li>
      </ul>
      <h4>There are Two tasks</h4>
      <ul>
        <li>
          Task 1 includes 8 different accounts. Tweets are about different
          topics.
        </li>
        <li>
          Task 2 includes 8 different accounts (different from task 1). The
          difference is that tweets for each account are filtered to focus
          specific identities as Donald Trump, Barack Obama, or Emanuel Macron.
        </li>
      </ul>
      <AlertDialog
        open={openAlert}
        onClose={handleCloseAlert}
        message="Please respond to the two introductory scenarios first!"
      ></AlertDialog>{" "}
      <div
        style={{
          textAlign: "center",
          paddingTop: "10px",
          paddingBottom: "10px",
        }}
      >
        <Button
          style={{ backgroundColor: "gray", color: "black" }}
          variant="contained"
          onClick={handleConsent}
        >
          Continue
        </Button>
      </div>
    </Container>
  );
};

export default InstructionsMain;
