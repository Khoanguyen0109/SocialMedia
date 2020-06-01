import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Switch, NavLink, Link } from "react-router-dom";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import CreateMuiTheme from "@material-ui/core/styles/createMuiTheme";
import jwtDecode from "jwt-decode";
import "./App.css";
//pages
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";
//components
import Navbar from "./components/Navbar/Navbar";
import AuthRoute from "./utils/AuthRoute";
import themefile from "./utils/theme";

//Redux
import { Provider, useSelector } from "react-redux";
import store from "./redux/store";
import { logoutUser, getUserData } from "./redux/actions/userAction";
import { SET_AUTHENTICATED } from "./redux/type";
import axios from "axios";
import User from "./pages/User";

const theme = CreateMuiTheme(themefile);


const token = localStorage.FBIdToken;

if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = "/";
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}

function App() {
  let authenticated = useSelector(state => state.user.authenticated)
  return (
    <MuiThemeProvider theme={theme}>
      
        <div className="App">
          <Router>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={home} />
                <AuthRoute
                  exact
                  path="/login"
                  component={login}
                  authenticated = {authenticated}
                />
                <AuthRoute
                  exact
                  path="/signup"
                  component={signup}
                  authenticated ={authenticated}
                /> 
                <Route exact path ="/user/:handle" component={User}/>
              </Switch>
            </div>
          </Router>
        </div>
     
    </MuiThemeProvider>
  );
}

export default App;
