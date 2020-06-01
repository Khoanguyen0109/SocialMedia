import React, { useState, Fragment, useEffect } from "react";

// icon
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
//MUI

import {
  makeStyles,
  Tooltip,
  IconButton,
  Dialog,
  DialogTitle,
  TextField,
  Button,
  CircularProgress,
  DialogContent,
} from "@material-ui/core";
import styles from "./styles";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { postScream } from "../../redux/actions/dataAction";
import { CLEAR_ERRORS } from "../../redux/type";

const useStyles = makeStyles(styles);
function PostScream() {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const data = useSelector((state) => state.data);
  const ui = useSelector((state) => state.ui);
  const loadingUI = ui.loadingUI;
    
  useEffect(() => {
    const setError = async () => {
      return setErrors(await ui.errors);
    };
    setError();
    
  });
  
  //console


  const handleOpen = () => {
    setOpen(true);
    setBody('')
    dispatch({
        type: CLEAR_ERRORS,
    })
  };
  const handleClose = () => {
    setOpen(false);
 

  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(postScream({body})) 
    if(body !== '')
      handleClose()
  };
  return (
    <Fragment>
      <Tooltip title="Post a Scream">
        <IconButton onClick={handleOpen}>
          <AddIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
      >
          <Tooltip title='close'>
        <IconButton
          onClick={handleClose}
          className={classes.closeButton}
        >
          <CloseIcon />
        </IconButton>
        </Tooltip>
        <DialogTitle>Post a new scream</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              name="body"
              type="text"
              label="SCREAM!!"
              multiline
              rows="3"
              placeholder="Scream at your fellow apes"
              error={errors.body ? true : false}
              helperText={errors.body}
              className={classes.textField}
              onChange={event=> setBody(event.target.value)}
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submitButton}
              disabled={loadingUI}
            >
              Submit
              {loadingUI && (
                <CircularProgress
                  size={30}
                  className={classes.progressSpinner}
                />
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}

export default PostScream;
