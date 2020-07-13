import React, { Component, useState, useEffect } from "react";
import NavBar from "./components/nav/nav";
import Container from "@material-ui/core/Container";
import BottomNav from "./components/bottomNav/bottomNav";

import { makeStyles } from "@material-ui/core/styles";
import StudyPage from "./pages/study/study";
import PreSurveyPage from "./pages/survey/pre";
import PostSurveyPage from "./pages/survey/post";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";

const App = () => {
  // const [choice, setChoice] = useState(0);
  // const [uncertaintyCI, setUncertaintyCI] = useState([null, null]);

  return (
    <div className="app" style={{ height: "100%", overflow: "auto" }}>
      <Router>
        <NavBar height={"7%"} className="navBar"></NavBar>
        <Container style={{ height: "86%", margin: "0 auto", width: "100%" }}>
          <Switch>
            <Route path="/consent" component={Consent}></Route>
            <Route path="/instructions"></Route>
            <Route path="/pre" component={PreSurveyPage}></Route>
            <Route path="/study" component={StudyPage}>
              {/* <StudyPage></StudyPage> */}
            </Route>
            <Route path="/post" component={PostSurveyPage}></Route>
            <Route path="/debrief"></Route>
          </Switch>
        </Container>
        <BottomNav height="7%"></BottomNav>
      </Router>
    </div>
  );
};

const Consent = () => {
  return <p className="test">consent</p>;
};

// const Pre = () => {
//   return <p className="test">Pre</p>;
// };

// const Post = () => {
//   return <p className="test">Post</p>;
// };

export default App;
