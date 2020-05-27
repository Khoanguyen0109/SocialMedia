import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { Grid, Typography, TextField, Button } from "@material-ui/core";
import AppIcon from "../images/download.png";

const useStyles = makeStyles({
  form: {
    textAlign: "center",
  },
  image: {
    margin: "20px  auto 20px auto",
    borderRadius: 50,
    padding: 20,
    width: "80px",
  },
  title: {
      
  },

  textField: {
    margin: "10px  auto 10px auto",
    
  },
  button:{
    width: "100px",
    marginTop: 20
  },
});

const handleSubmit = () => {
    alert("Hi")
};

function Login() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setError] = useState({});
  console.log(email)
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
            onChange={(event) => setEmail(event.target.value)}
            fullWidth
          />
           <TextField
            id="password"
            type="password"
            label="Password"
            className={classes.textField}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary" className={classes.button} >Go </Button>
        </form>
      </Grid>
      <Grid item />
    </Grid>
  );
}

Login.prototype = {
  classes: PropTypes.object.isRequired,
};

export default Login;
