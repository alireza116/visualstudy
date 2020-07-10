import React from "react";
import { useHistory } from "react-router-dom";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  bottomNav: {
    width: "100%",
    height: "7%",
    backgroundColor: "orange",
    // position: "fixed",
    // bottom: 0,
  },
});

const BottomNav = (props) => {
  const classes = useStyles();
  const [pageIndex, setPageIndex] = React.useState("/");
  const history = useHistory();
  //   console.log(history);
  const setHistory = (newValue) => {
    history.push(newValue);
  };
  const indexRoutemAp = {
    0: "/",
    1: "/pre",
    2: "/study",
    3: "/post",
    4: "/debrief",
  };
  return (
    <BottomNavigation
      value={pageIndex}
      onChange={(event, newValue) => {
        console.log(newValue);
        setPageIndex(newValue);
        setHistory(newValue);
      }}
      showLabels
      className={classes.bottomNav}
      style={{ height: props.height }}
    >
      <BottomNavigationAction label="Consent" value="/consent" />
      <BottomNavigationAction label="Pre-questionaire" value="/pre" />
      <BottomNavigationAction label="Study" value="/study" />
      <BottomNavigationAction label="Post" value="/post" />
    </BottomNavigation>
  );
};

export default BottomNav;
