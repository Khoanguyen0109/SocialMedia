import React, { useState, useEffect, Fragment } from "react";

//redux
import { useDispatch, useSelector } from "react-redux";

//MUI
import { makeStyles, Grid, TextField, CircularProgress, Button } from "@material-ui/core";

import styles from "./styles";
import { postComment } from "../../redux/actions/dataAction";

function CommentForm({ screamId }) {
  // styles
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  //state
  const [body, setBody] = useState("");
  const [errors,setErrors] = useState({});
  //redux
  const dispatch = useDispatch();
  const ui = useSelector((state) => state.ui);
  const data = useSelector((state) => state.data);
  const user = useSelector((state) => state.user);


  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(postComment(screamId ,{body}))
    setBody('')
  };


  useEffect(() => {
    const setError = async () => {
      return setErrors(await ui.errors);
    };
    setError();
  });
//   console.log('ui.errors', errors)

  const commentFormMarkup = user.authenticated ? (
    <Grid item sm={12} style={{ textAlign: "center" }}>
      <form onSubmit={handleSubmit}>
          <TextField
          name='body'
          type='text'
          label= 'Comment'
          error = {errors.error  ? true : false}
          helperText = {errors.error ? errors.error : ''}
          value ={body}
          onChange={event => setBody(event.target.value)}
          />
        <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submitButton}
              disabled={ui.loading}
            >
              Submit
              {ui.loading && (
                <CircularProgress
                  size={30}
                  className={classes.progressSpinner}
                />
              )}
            </Button>
         
      </form>
    </Grid>
  ) : null;
  return <Fragment>
      {commentFormMarkup}
  </Fragment>;
}

export default CommentForm;
