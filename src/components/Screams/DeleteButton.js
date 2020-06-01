import React, { Fragment, useState } from "react";
import styles from "./styles";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { deleteScream } from "../../redux/actions/dataAction";

//icon
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import {
  makeStyles,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles(styles);

function DeleteButton({screamId}) {

  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const ui = useSelector((state) => state.ui);
  const data = useSelector((state) => state.data);
  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    dispatch(deleteScream(screamId));
    setOpen(false);
  };
  return (
    <Fragment>
      <Tooltip title="Delete SCream">
        <IconButton onClick={handleOpen} className={classes.deleteButton}>
          <DeleteOutline />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Want to Delete Scream ?</DialogTitle>
        <DialogActions>
            <Button variant='contained' onClick={handleDelete} color='secondary'>DELETE</Button>
        </DialogActions>

      </Dialog>
    </Fragment>
  );
}

export default DeleteButton;
