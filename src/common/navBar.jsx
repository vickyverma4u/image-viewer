import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  appBar: {
    backgroundColor: "#263238",
    color: "#fff",
  },
  logo: {
    fontSize: 18,
  },
});

const NavBar = () => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar className={classes.appBar}>
        <p className={classes.logo}>Image Viewer</p>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
