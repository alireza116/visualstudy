import React from "react";
import axios from "axios";
import { Button, Container } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import BinaryChoice from "../../components/choice/binaryChoice";

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
    history.push("/task1");
    // axios.get("/consent").then((result) => {
    //   //   console.log(result.data);

    // });
  };

  return (
    <Container maxWidth="lg" className={classes.instructContainer}>
      <h3>Study Instructions</h3>
      <h3>Please read thesee instructions carefully</h3>
      <p>
        In this study, our main goal is understand how you will rate{" "}
        <span className={classes.emph}>Bias in tweets</span>,
        <span className={classes.emph}>Credibility of Source</span>, and{" "}
        <span className={classes.emph}>Political Orientation of Source</span> of
        tweets.
      </p>
      <p>
        To do this we have collected tweets from multiple sources of news on
        Twitter. The tweets are from about two years ago and include many
        different domestic and international topics. We will not show you the
        sources name so that your opinions are not influenced by your potential
        knowledge about that source. We are asking you to based your judgments
        based on the tweets you will see.
      </p>
      <p className={classes.emph}>
        First, we would like to clarify some definitions
      </p>
      <ul>
        <li>
          <span className={classes.emph}>Tweet</span> A piece of news on Twitter
          that includes a short piece of text, and might or might not include
          images.
        </li>
        <li>
          <span className={classes.emph}>Source</span> A Twitter account that
          produces news. In this study, you will assess the crediblity of
          multiple sources of news on Twitter!{" "}
        </li>
        <li>
          <span className={classes.emph}>Biased / Not Biased:</span> a statement
          is biased when it reflects a partiality, preference, or prejudice for
          or against a person, object, or idea . So wheen you feel like a tweet
          is lacks any partiality, you would rate it is not biased, and when you
          feel it is taking sides, or is very opinionated, you would rate it as
          biased.
        </li>
        <li>
          <span className={classes.emph}>Not Credible / Credible:</span> When
          you feel likee a source is compleeteely credible, it means that you
          are very likely to trust the content and news coming from that source.
          On the otherhand, you would not trust a source that you feel is not
          credible.
        </li>
        <li>
          <span className={classes.emph}>
            Left / Right Political Orientation:
          </span>{" "}
          We are asking you to rate sources of news, based on your own knowledge
          of left / right political spectrum.
        </li>
      </ul>
      <p>
        {" "}
        Since, these subjects cannot always be rated with very high certainty,
        so we are using a method that allows you to state your beliefs about
        these concepts, while also stating how uncertain you are about your
        choice.
      </p>
      <p>
        This method allows you to <span className={classes.emph}>first</span>{" "}
        select what you believe to be the most likely rating, and{" "}
        <span className={classes.emph}>next</span> selecting a range of
        plausible alternatives.
      </p>
      <hr />
      <p>So let's look at example:</p>
      <p>
        In the animation below, a user is selecting that a tweet is very biased,
        and they are more or less sure that the bias rating lies to the very
        right of the specturm
      </p>
      <img
        src={process.env.PUBLIC_URL + "/uncertainty1.gif"}
        alt=""
        className={classes.image}
      />
      <p>
        In the next animation, we can see a user that believes a tweet is very
        unbiased, but they are not very sure, and they think that it's possible
        that the tweet is moderately biased
      </p>
      <img
        src={process.env.PUBLIC_URL + "/uncertainty2.gif"}
        alt=""
        className={classes.image}
      />
      <hr />
      <h4>Now let's practice with this technique:</h4>
      <p>
        {" "}
        Let's imagine a scenario in which you are submiting your belief about
        how credible a source of news on Twitter is: <br />
        Assume you believe that{" "}
        <span className={classes.emph}> the source is very Credible</span>, and
        you are
        <span className={classes.emph}> very certain</span> of your decision.
      </p>
      <p>
        First use your mouse to hover on the chart. <br />
        Click to select the line that best represents your belief. <br />
        Then use the mouse to select the range of plusible alternatives that
        represents how uncertain you are about your belief.
      </p>
      <span className={classes.highlight}>
        {" "}
        use the chart below to show your decision
      </span>
      :
      <BinaryChoice
        choiceDomain={[0.0, 1.0]}
        responseIndex={"instructions"}
        //   handleResponse={handleResponse}
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
        <span className={classes.emph}>the source is very Not Credible</span>,
        and you are
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
        responseIndex={"instructions"}
        //   handleResponse={handleResponse}
        question="How Not Credible / Credible is this source?"
        tickLabels={["Not Credible", "", "Credible"]}
      ></BinaryChoice>
      <hr />
      <h4>What will you go through in this study</h4>
      <ul>
        <li>You will evaluate 16 accounts</li>
        <li>
          Tweets from these accounts, include text, and might include images
        </li>
        <li>
          You will evaluate Credibility and Political Orientation of all 16
          accounts using the method we just discussed.
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
        <li>Task 1 includes 8 accounts. Tweets are about different topics.</li>
        <li>
          Task 2 include 8 other accounts. Tweets for each account are filtered
          to focus on tweets about specific identities.
        </li>
      </ul>
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
