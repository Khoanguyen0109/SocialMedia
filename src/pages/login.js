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
import { useHistory } from "react-router-dom";
import cssfile from "./css/login_css";
import { Link } from "react-router-dom";
//Redux
import { loginUser } from "../redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles(cssfile);

function Login() {

  let history = useHistory();
  const classes = useStyles();
  /// hook 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors,setErrors] = useState('');
  
  
  //redux
  const dispatch = useDispatch();
  const user = useSelector(state => state.user) /// user reducer 
  const UI = useSelector(state => state.ui)// ui reducer
  const loading = UI.loading;
  // let errorsUI = UI.errors
  // setErrors(errorsUI)
  
  useEffect(()=>{
    const setError= async() =>  {
      return setErrors ( await UI.errors)
      
    }
    setError()
  },
  )
   const errorsUI = errors
  console.log(errors)

 
  // console.log(errors)
  // console.log(errors)
  // SetErrors()
  // },[errors])
  


  
  const handleSubmit = (event) => {
    event.preventDefault();

    const userData = {
      email: email,
      password: password,
    };
    dispatch(loginUser(userData, history));

    
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
          Login
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            id="email"
            type="email"
            label="Email"
            className={classes.textField}
            value={email}
            helperText={errorsUI.email ?errorsUI.email:'' }
            error={errorsUI.email ? true : false}
            onChange={(event) => setEmail(event.target.value)}
            fullWidth
          />
          <TextField
            id="password"
            type="password"
            label="Password"
            className={classes.textField}
            value={password}
            helperText={errorsUI.password? errorsUI.password : ''}
            error={errorsUI.password ? true : false}
            onChange={(event) => setPassword(event.target.value)}
            fullWidth
          />
          {errorsUI.general && (
            <Typography variant="h2" className={classes.Error}>
              {errorsUI.general }
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Go{" "}
            {loading && <CircularProgress color="secondary" className={classes.progress} />}
          </Button>
        </form>

        <small>
          Don't have account ?? <Link to="/signup"> Sign up Here </Link>
        </small>
      </Grid>
      <Grid item />
    </Grid>
  );
}

Login.prototype = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user : PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

export default Login;
