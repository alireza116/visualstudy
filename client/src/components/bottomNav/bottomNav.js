import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    color: "white",
    "&$selected": {
      color: "blue",
    },
  },
  selected: {},
}));

// const useStyles = makeStyles({
//   bottomNav: {
//     width: "100%",
//     height: "7%",
//     backgroundColor: "orange",
//     // position: "fixed",
//     // bottom: 0,
//   },
// });

const BottomNav = (props) => {
  const classes = useStyles();
  const history = useHistory();
  let location = useLocation();
  //   console.log(history);
  // const setHistory = (newValue) => {
  //   history.push(newValue);
  // };

  return (
    <BottomNavigation
      value={location.pathname}
      // onChange={(event, newValue) => {
      //   console.log(newValue);
      //   setPageIndex(newValue);
      //   setHistory(newValue);
      // }}
      showLabels
      className={classes.root}
      style={{
        height: props.height,
        width: "100%",
        height: "7%",
        backgroundColor: "orange",
        pointerEvents: "None",
      }}
    >
      <BottomNavigationAction
        label="Consent"
        value="/consent"
        classes={classes}
      />
      <BottomNavigationAction
        label="Pre-questionaire"
        value="/pre"
        classes={classes}
      />
      <BottomNavigationAction
        label="Instructions"
        value="/instructions"
        classes={classes}
      />
      <BottomNavigationAction label="Task" value="/task" classes={classes} />
      {/* <BottomNavigationAction label="Task 2" value="/task2" classes={classes} /> */}
      <BottomNavigationAction
        label="Post-questionaire"
        value="/post"
        classes={classes}
      />
      <BottomNavigationAction
        label="Debrief"
        value="/debrief"
        classes={classes}
      />
    </BottomNavigation>
  );
};

export default BottomNav;
