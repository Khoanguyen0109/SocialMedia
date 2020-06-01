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
import { uploadImage, logoutUser } from "../../redux/actions/userAction";
import Editdetails from "../EditDetails/Editdetails";
const useStyles = makeStyles(styles);
function Profile() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const credentials = user.credentials;
  const loading = user.loading;

  const handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    // name, value (file), file name
    formData.append("image", image, image.name);
    dispatch(uploadImage(formData));
  };

  const handleEditImage = (event) => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

 

  let profileMarkup = !loading ? (
    user.authenticated ? (
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className="image-wrapper">
            <img
              src={credentials.imageUrl}
              alt="profile"
              className="profile-image"
            />
            <input
              type="file"
              id="imageInput"
              hidden="hidden"
              onChange={handleImageChange}
            />
            <Tooltip title="Edit profile picture" placement="top">
              <IconButton onClick={handleEditImage} className="button">
                <EditIcon color="primary"></EditIcon>
              </IconButton>
            </Tooltip>
          </div>
          <hr />
          <div className="profile-details">
            <MuiLink
              component={Link}
              to={`/user/${credentials.handle}`}
              color="primary"
              variant="h5"
            >
              @{credentials.handle}
            </MuiLink>
            <hr />
            {credentials.bio && (
              <Typography variant="body2"> {credentials.bio}</Typography>
            )}
            <hr />
            {credentials.location && (
              <Fragment>
                <LocationOn color="primary" />{" "}
                <span>{credentials.location}</span>
                <hr />
              </Fragment>
            )}
             <h3>Edit Profile<Editdetails></Editdetails></h3>
            <hr />
            <CalendarToday color="primary" />{" "}
            <span>
              Joined {dayjs(credentials.createdAt).format("MMM YYYY")}
            </span>
            <hr />
            <Button variant="contained" color="primary" onClick={handleLogout}>
              {" "}
              Log out{" "}
            </Button>
           
          </div>
        </div>
      </Paper>
    ) : (
      <Paper className={classes.paper}>
        <Typography variant="body2" align="center">
          No Profile founded , pls login again
        </Typography>
        <div className={classes.buttons}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/login"
          >
            Login
          </Button>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/signup"
          >
            Sign up
          </Button>
        </div>
      </Paper>
    )
  ) : (
    <p>Loading ...</p>
  );
  return profileMarkup;
}

export default Profile;
