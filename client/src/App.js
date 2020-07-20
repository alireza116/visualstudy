import React from "react";
import NavBar from "./components/nav/nav";
import Container from "@material-ui/core/Container";
import BottomNav from "./components/bottomNav/bottomNav";

import StudyPage from "./pages/study/study";
import PreSurveyPage from "./pages/survey/pre";
import PostSurveyPage from "./pages/survey/post";
import ConsentPage from "./pages/consent/consent";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";

// const App = () => {
class App extends React.Component {
  state = {
    answerCount: 0,
    accIndex: null,
  };

  componentWillMount() {
    axios.get("/consent");
  }

  componentDidMount() {
    this.setState({ accIndex: 0 });
  }

  setAnswerCount = (newValue) => {
    this.setState({ answerCount: newValue });
  };

  setAccIndex = (newValue) => {
    this.setState({ accIndex: newValue });
  };

  render() {
    return (
      <div className="app" style={{ height: "100%", overflow: "auto" }}>
        <Router>
          <NavBar height={"7%"} className="navBar"></NavBar>
          <Container style={{ height: "86%", margin: "0 auto", width: "100%" }}>
            <Switch>
              <Route path="/consent" component={ConsentPage}></Route>
              <Route path="/instructions"></Route>
              <Route path="/pre" component={PreSurveyPage}></Route>
              <Route path="/study">
                <StudyPage
                  answerCount={this.state.answerCount}
                  setAnswerCount={this.setAnswerCount}
                  accIndex={this.state.accIndex}
                  setAccIndex={this.setAccIndex}
                ></StudyPage>
              </Route>
              <Route path="/post" component={PostSurveyPage}></Route>
              <Route path="/debrief"></Route>
            </Switch>
          </Container>
          <BottomNav height="7%"></BottomNav>
        </Router>
      </div>
    );
  }
}

// const Consent = () => {
//   return <p className="test">consent</p>;
// };

// const Pre = () => {
//   return <p className="test">Pre</p>;
// };

// const Post = () => {
//   return <p className="test">Post</p>;
// };

export default App;
