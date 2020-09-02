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
import DebriefPage from "./pages/debrief/debrief";
import InstructionsTask1 from "./pages/instructions/instructionsTask1";
import InstructionsTask2 from "./pages/instructions/instructionsTask2";
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
    task: 2,
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

  setTaskNumber = (newValue) => {
    this.setState({ task: newValue });
  };

  setPersonIndex = (newValue) => {
    this.setState({ personIndex: newValue });
  };

  render() {
    return (
      <div className="app" style={{ height: "100%", lineHeight: "150%" }}>
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
              <Route path="/consent">
                <ConsentPage setTaskNumber={this.setTaskNumber}></ConsentPage>
              </Route>
              <Route path="/pre" component={PreSurveyPage}></Route>
              <Route
                path="/instructions"
                component={InstructionsMainPage}
              ></Route>

              <Route path="/task">
                {this.state.task === 1 ? (
                  <Task1
                    answerCount={this.state.answerCount}
                    setAnswerCount={this.setAnswerCount}
                    accIndex={this.state.accIndex}
                    setAccIndex={this.setAccIndex}
                  ></Task1>
                ) : (
                  <Task2
                    answerCount={this.state.answerCount}
                    setAnswerCount={this.setAnswerCount}
                    personIndex={this.state.personIndex}
                    setPersonIndex={this.setPersonIndex}
                  ></Task2>
                )}
              </Route>

              <Route path="/instructions1">
                {this.state.task === 1 ? (
                  <InstructionsTask1></InstructionsTask1>
                ) : (
                  <InstructionsTask2></InstructionsTask2>
                )}
              </Route>
              {/* <Route path="/instructionst1">
                <InstructionsTask1></InstructionsTask1>
              </Route>

              <Route path="/task1">
                <Task1
                  answerCount={this.state.answerCount}
                  setAnswerCount={this.setAnswerCount}
                  accIndex={this.state.accIndex}
                  setAccIndex={this.setAccIndex}
                ></Task1>
              </Route>

              <Route path="/instructionst2">
                <InstructionsTask2></InstructionsTask2>
              </Route>
              <Route path="/task2">
                <Task2
                  answerCount={this.state.answerCount}
                  setAnswerCount={this.setAnswerCount}
                  personIndex={this.state.personIndex}
                  setPersonIndex={this.setPersonIndex}
                ></Task2>
              </Route> */}
              <Route path="/post" component={PostSurveyPage}></Route>
              <Route path="/debrief">
                <DebriefPage></DebriefPage>
              </Route>
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
