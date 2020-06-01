import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
//redux
import { useDispatch, useSelector } from "react-redux";
import { getScream } from "../../redux/actions/dataAction";

// MUI
import {
  Tooltip,
  IconButton,
  makeStyles,
  Dialog,
  DialogContent,
  CircularProgress,
  Grid,
  Typography,
} from "@material-ui/core";
import styles from "./styles";
// icon
import UnfolMore from "@material-ui/icons/UnfoldMore";
import CloseIcon from "@material-ui/icons/Close";
import LikeButton from "./LikeButton";
import Comments from "../Comments/Comments";
import ChatIcon from "@material-ui/icons/Chat";
import CommentForm from "../Comments/CommentForm";
import { CLEAR_ERRORS } from "../../redux/type";

function ScreamDialog({ userHandle, screamId }) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const ui = useSelector((state) => state.ui);
  const data = useSelector((state) => state.data);
  const scream = data.scream;

  const loadingUI = ui.loading;
  const handleOpen = () => {
    setOpen(true);
    dispatch(getScream(screamId));
  };
  const handleClose = () => {
    setOpen(false);
    dispatch ({
        type:CLEAR_ERRORS
    })
  };

  const dialogMarkup = loadingUI ? (
    <div className={classes.spinnerDiv}>
      <CircularProgress size={200} />
    </div>
  ) : (
    <Grid container spacing={10}>
      <Grid item sm={5}>
        <img
          src={scream.userImage}
          alt="Profile"
          className={classes.profileImage}
        />
      </Grid>
      <Grid item sm={7}>
        <Typography
          component={Link}
          color="primary"
          variant="h5"
          to={`/users/${userHandle}`}
        >
          @{userHandle}
        </Typography>
        <hr className={classes.invisibleSeparator} />
        <Typography variant="body2" color="textSecondary">
          {dayjs(scream.createAt).format("h:mm a, MMMM DD YYYY")}
        </Typography>
        <hr className={classes.invisibleSeparator} />
        <Typography variant="body1">{scream.body}</Typography>
        <LikeButton screamId={scream.screamId} />
        <span>{scream.likeCount}</span>

        <Tooltip title="comment">
          <ChatIcon color="primary"></ChatIcon>
        </Tooltip>
        <span>{scream.commentCount} Comments </span>
        <hr className={classes.invisibleSeparator} />
        <hr/>
        <CommentForm screamId={screamId}/>
        <hr/>
        <Comments comments={scream.comments} />
      </Grid>
    </Grid>
  );
  return (
    <Fragment>
      <Tooltip title=" Expand Scream">
        <IconButton onClick={handleOpen} className={classes.expandButton}>
          <UnfolMore />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <Tooltip title="close">
          <IconButton onClick={handleClose} className={classes.closeButton}>
            <CloseIcon />
          </IconButton>
        </Tooltip>
        >
        <DialogContent className={classes.DialogContent}>
          {dialogMarkup}
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}

export default ScreamDialog;
