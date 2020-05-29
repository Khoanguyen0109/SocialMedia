import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {
  Grid,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@material-ui/core";
import AppIcon from "../images/download.png";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import cssfile from "./css/login_css";
//redux
import { signupUser } from "../redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
const useStyles = makeStyles(cssfile);

function Signup() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [handle, setHandle] = useState("");
  const [errors,setErrors] = useState('');

  let history = useHistory();

  //redux
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user); /// user reducer
  const UI = useSelector((state) => state.ui); // ui reducer
  const loading = UI.loading;
  



  useEffect(() => {
    const setError = async () => {
      return setErrors(await UI.errors);
    };
    setError();
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const newUserData = {
      email: email,
      handle: handle,
      password: password,
      confirmPassword,
    };
    dispatch(signupUser(newUserData,history))
    console.log(errors);
  };
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      className={classes.form}
    >
      <Grid item sm>
        <img src={AppIcon} alt="rainbow" className={classes.image} />
        <Typography variant="h5" className={classes.title}>
          Signup
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            id="email"
            type="email"
            label="Email"
            className={classes.textField}
            value={email}
            helperText={errors.email? errors.email :''}
            error={errors.email ? true : false}
            onChange={(event) => setEmail(event.target.value)}
            fullWidth
          />
          <TextField
            id="handle"
            type="text"
            label="Handle"
            className={classes.textField}
            value={handle}
            helperText={errors.handle? errors.handle :''}
            error={errors.handle ? true : false}
            onChange={(event) => setHandle(event.target.value)}
            fullWidth
          />
          <TextField
            id="password"
            type="password"
            label="Password"
            className={classes.textField}
            value={password}
            helperText={errors.password? errors.password :''}
            error={errors.password ? true : false}
            onChange={(event) => setPassword(event.target.value)}
            fullWidth
          />
          <TextField
            id="confirmPassword"
            type="password"
            label="Confirm Password"
            className={classes.textField}
            value={confirmPassword}
            helperText={errors.confirmPassword? errors.confirmPassword :''}
            error={errors.confirmPassword ? true : false}
            onChange={(event) => setConfirmPassword(event.target.value)}
            fullWidth
          />
          {errors.general && (
            <Typography variant="h2" className={classes.Error}>
              {errors.general}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            
          >
            Sing up{" "}
            {loading && (
              <CircularProgress
                color="secondary"
                className={classes.progress}
              />
            )}
          </Button>
        </form>

        <small>
          Already have an account ?? <Link to="/login"> Login Here </Link>
        </small>
      </Grid>
      <Grid item />
    </Grid>
  );
}

Signup.prototype = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,

};

export default Signup;
