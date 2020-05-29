import axios from "axios";

import {
  LOADING_UI,
  CLEAR_ERRORS,
  SET_ERRORS,
  SET_USER,
  SET_UNAUTHENTICATED,
  LOADING_USER,
} from "../type";

//dispatch LOADING_UI
// loading true
// post request login
// get token from api
// set token to local storage
// set default header = Authorization
// dispatch getUserData
// dispatch CLEAR_ERRORS
/// loading false
/// errors null
// push to home
// catch errors
export const loginUser = (userData, history) => (dispatch) => {
  dispatch({
    type: LOADING_UI,
  });
  axios
    .post("/login", userData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push("/");
    })
    .catch((err) => {
      
      
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data,
        });
        console.log(err);
      
    });
};

export const signupUser = (newUserData, history) => (dispatch) => {
  dispatch({
    type: LOADING_UI,
  });
  axios
    .post("/signup", newUserData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push("/");
    })
    .catch((err) => {
      console.log(err);
      
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data,
        });
      
    });
};

// Upload image
// formData : 
export const uploadImage = (formData) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/user/image", formData)
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => console.log(err));
};

export const getUserData = () => (dispatch) => {
  dispatch({
    type: LOADING_USER,
  });
  axios
    .get("/user") // this will fetch Own user=> return userData.credentials , like , notification
    .then((res) => {
      dispatch({
        type: SET_USER,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const editDetails =(userDetails) =>(dispatch) =>{
  dispatch({
    type: LOADING_USER,
  })
  axios.post('/user',userDetails)
  .then( () =>
    dispatch(getUserData())

  ).catch(err =>{
    console.log(err)
  })
}

const setAuthorizationHeader = (token) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem("FBIdToken", FBIdToken);
  axios.defaults.headers.common["Authorization"] = FBIdToken;
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("FBIdToken");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({
    type: SET_UNAUTHENTICATED,
  });
};
