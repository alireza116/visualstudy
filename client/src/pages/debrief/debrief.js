import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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

const Debrief = (props) => {
  const classes = useStyles();
  const [token, setToken] = useState(null);

  useEffect(() => {
    axios.get("api/debrief").then((res) => {
      setToken(res.data.token);
      console.log(res);
    });
  }, []);

  return (
    <Container maxWidth="lg" className={classes.instructContainer}>
      <div style={{ textAlign: "center" }}>
        <img
          src={process.env.PUBLIC_URL + "/university.png"}
          height="120px"
        ></img>
      </div>
      <h1>Debriefing</h1>
      <p>
        <b>Principal investigator:</b> Alireza Karduni, College of Computing and
        Informatics
      </p>
      <p>
        <b>Faculty Adviser:</b> Dr. Wenwen Dou, College of Computing and
        Informatics
      </p>
      <p>
        <b>Co-PIs:</b> Dr. Doug Markant (Department of Psychological Science),
        Ryan Wesslen (College of Computing and Informatics)
      </p>
      <p>
        Thank you for your participation! In this study, we were investigating
        how images affect your decisions about news online. In some cases, we
        showed you tweets with one of the following conditions: 1) with angry
        images from news sources, 2) happy images from news sources, or 3) Mixed
        angry and happy images or 4) no images from news sources. All the text
        and images were collected from Twitter.
      </p>
      <h3>
        Here is your token of completion. Please enter this into Amazon MTurk.
        Do not close this page.
      </h3>

      <hr />
      <h3>{token}</h3>
      <hr />
      <h3>If you a SONA participant, there is nothing else you need to do.</h3>
      <p>
        If your instructor has offered extra credits for this study, please
        email them your unique token. We will confirm your participation by
        cross-checking your token within our secure database if inquired by the
        instructor. If you are participating in this study through SONA, you
        will receive 0.5 credits for your participation. Please click on the
        following link to be redirected back to SONA.
      </p>
      <p>
        For questions about this research, you may contact Alireza Karduni
        (akarduni@uncc.edu) and Dr. Wenwen Dou (Wdou1@uncc.edu). If you have
        questions about your rights as a research participant, or wish to obtain
        information, ask questions, or discuss any concerns about this study
        with someone other than the researcher(s), please contact the Office of
        Research Protections and Integrity at 704-687-1871 or uncc-irb@uncc.edu.
      </p>
    </Container>
  );
};

export default Debrief;
