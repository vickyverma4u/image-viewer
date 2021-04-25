import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import Avatar from "@material-ui/core/Avatar";
import logo from "../assets/boy-cartoon-avatar.png";
import { IconButton, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  appBar: {
    backgroundColor: "#263238",
    color: "#fff",
    justifyContent: "space-between",
  },
  logo: {
    fontSize: 18,
  },
  appBarRight: {
    display: "flex",
  },
  searchBar: {
    paddingTop: 0,
    paddingBottom: 0,
    backgroundColor: "#bbb",
    borderRadius: 5,
    margin: "auto",
  },
  avatar: {
    marginLeft: 20,
    marginRight: 20,
  },
});

const NavBar = ({ searchBar, onSearch, toggleFloat }) => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar className={classes.appBar}>
        <p className={classes.logo}>Image Viewer</p>
        {searchBar ? (
          <div className={classes.appBarRight}>
            <TextField
              id="search-box"
              className={classes.searchBar}
              size="small"
              placeholder="Search"
              variant="outlined"
              onChange={onSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            ></TextField>
            <IconButton className={classes.avatar} onClick={toggleFloat}>
              <Avatar src={logo} />
            </IconButton>
          </div>
        ) : null}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
