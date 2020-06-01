import React, { Fragment } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Tooltip, makeStyles } from "@material-ui/core";

import HomeIcon from "@material-ui/icons/Home";
import Notifications from "@material-ui/icons/Notifications";
import styles from './styles'
import PostScream from "../Screams/PostScream";

const useStyle = makeStyles(styles)
function Navbar() {
  const classes = useStyle()
  const user = useSelector((state) => state.user);

  return (
    <div>
      <AppBar position="static">
        <Toolbar className="nav-container">
          {user.authenticated ? (
            <Fragment>
              <PostScream/>
              <Link to='/'>
              <Tooltip title="Post Scream" aria-label="home">
                <HomeIcon />
              </Tooltip>
              </Link>
              <Tooltip title="Post Scream" aria-label="notification">
                <Notifications />
              </Tooltip>
            </Fragment>
          ) : (
            <Fragment>
              <Link to="/" style={{ color: "#FFF", textDecoration: "none" }}>
                {" "}
                <Button color="inherit">Home </Button>
              </Link>
              <Link
                to="/login"
                style={{ color: "#FFF", textDecoration: "none" }}
              >
                {" "}
                <Button color="inherit">Login </Button>
              </Link>
              <Link
                to="/signup"
                style={{ color: "#FFF", textDecoration: "none" }}
              >
                {" "}
                <Button color="inherit">Sing up </Button>
              </Link>
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
