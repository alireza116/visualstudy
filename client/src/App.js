import React from "react";
import NavBar from "./components/nav/nav";
import Container from "@material-ui/core/Container";
import BottomNav from "./components/bottomNav/bottomNav";
import Task1 from "./pages/study/task1";
import Task2 from "./pages/study/task2";
import PreSurveyPage from "./pages/survey/pre";
import PostSurveyPage from "./pages/survey/post";
import ConsentPage from "./pages/consent/consent";
import InstructionsMainPage from "./pages/instructions/instructionMain";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import "./App.css";

// const App = () => {
class App extends React.Component {
  state = {
    answerCount: 0,
    accIndex: null,
    personIndex: null,
  };

  // componentWillMount() {
  //   // axios.get("/consent");
  // }

  componentDidMount() {
    this.setState({ accIndex: 0 });
    this.setState({ personIndex: 0 });
  }

  setAnswerCount = (newValue) => {
    this.setState({ answerCount: newValue });
  };

  setAccIndex = (newValue) => {
    this.setState({ accIndex: newValue });
  };

  setPersonIndex = (newValue) => {
    this.setState({ personIndex: newValue });
  };

  render() {
    return (
      <div
        className="app"
        style={{ height: "100%", overflow: "auto", lineHeight: "150%" }}
      >
        <Router>
          <NavBar height={"7%"} className="navBar"></NavBar>
          <Container
            style={{ height: "86%", margin: "0 auto", width: "100%" }}
            id="root-container"
          >
            <Switch>
              <Route
                exact
                path="/"
                render={() => {
                  return <Redirect to="/consent" />;
                }}
              />
              <Route path="/consent" component={ConsentPage}></Route>
              <Route
                path="/instructions"
                component={InstructionsMainPage}
              ></Route>
              <Route path="/pre" component={PreSurveyPage}></Route>
              <Route path="/task1">
                <Task1
                  answerCount={this.state.answerCount}
                  setAnswerCount={this.setAnswerCount}
                  accIndex={this.state.accIndex}
                  setAccIndex={this.setAccIndex}
                ></Task1>
              </Route>
              <Route path="/task2">
                <Task2
                  answerCount={this.state.answerCount}
                  setAnswerCount={this.setAnswerCount}
                  personIndex={this.state.personIndex}
                  setPersonIndex={this.setPersonIndex}
                ></Task2>
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
