import React, { useState, useEffect, Fragment } from "react";
import {
  makeStyles,
  Tooltip,
  IconButton,
  DialogContent,
  TextField,
  DialogActions,
} from "@material-ui/core";
import styles from "../Profile/styles";
import { useDispatch, useSelector } from "react-redux";

//material-ui
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";

import EditIcon from "@material-ui/icons/Edit";

import { editDetails } from "../../redux/actions/userAction";

const useStyles = makeStyles(styles);
function Editdetails() {
  const classes = useStyles();
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [open, setOpen] = useState(false);

  const credentials = useSelector((state) => state.user.credentials);
  const dispatch = useDispatch();

  const mapUserDetailsToState = () => {
    credentials.bio ? setBio(credentials.bio) : setBio("");
    credentials.location ? setLocation(credentials.location) : setLocation("");
  };
  useEffect(() => {
    mapUserDetailsToState();
  }, []);

  const handleOpen = () => {
    setOpen(true);
    mapUserDetailsToState();
  };

  function handleClose() {
    setOpen(false);
  }
  const handleSubmit = () => {
    const userDetails = {
      bio: bio,
      location: location,
    };
    dispatch(editDetails(userDetails))
    handleClose()
  };
  return (
    <Fragment>
      <Tooltip title="Edit your profile" placement="top">
        
        <IconButton onClick={handleOpen} className={classes.button}>
          <EditIcon color="primary"></EditIcon>
        
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
          <DialogTitle> Edit your profile</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                name="bio"
                type="text"
                label="bio"
                multiline
                rows="3"
                placeholder="about yourself "
                className={classes.textField}
                value={bio}
                onChange={(event) => {
                  setBio(event.target.value);
                }}
                fullWidth
              ></TextField>
              <TextField
                name="location"
                type="text"
                label="location"
                placeholder="your location "
                className={classes.textField}
                value={location}
                onChange={(event) => {
                  setLocation(event.target.value);
                }}
                fullWidth
              ></TextField>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSubmit} color="primary">
              {" "}
              Save{" "}
            </Button>
            <Button onClick={handleClose} color="secondary">
              {" "}
              Cancle{" "}
            </Button>
          </DialogActions>
        </Dialog>
        </IconButton>
      </Tooltip>
    </Fragment>
  );
}

export default Editdetails;
