import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import dayjs from "dayjs";
//@material-ui
import {
  makeStyles,
  Paper,
  Typography,
  Button,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import styles from "./styles";
import MuiLink from "@material-ui/core/Link";
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import EditIcon from "@material-ui/icons/Edit";
import CalendarToday from "@material-ui/icons/CalendarToday";
//router
import { Link } from "react-router-dom";
function StaticProfile({
  profile: { handle, createAt, imageUrl, bio, location },
}) {

  const useStyles = makeStyles(styles);
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className="image-wrapper">
          <img src={imageUrl} alt="profile" className="profile-image" />
        </div>
        <hr />
        <div className="profile-details">
          <MuiLink
            component={Link}
            to={`/user/${handle}`}
            color="primary"
            variant="h5"
          >
            @{handle}
          </MuiLink>
          <hr />
          {bio && <Typography variant="body2">{bio}</Typography>}
          <hr />
          {location && (
            <Fragment>
              <LocationOn color="primary" /> <span>{location}</span>
              <hr /> 
            </Fragment>
          )}
          <CalendarToday color="primary" />{" "}
          <span>Joined {dayjs(createAt).format("MMM YYYY")}</span>
        </div>
      </div>
    </Paper>
  );
}

export default StaticProfile;
