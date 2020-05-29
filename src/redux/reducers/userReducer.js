import {
  LOADING_UI,
  CLEAR_ERRORS,
  SET_ERRORS,
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
} from "../type";

const initialState = {
  authenticated: false, 
  credentials: {},
  loading: false,
  likes: [],
  notifications: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      
      return {
        authenticated: true,
        loading: false,
        ...action.payload,
        // credentials : action.payload.credentials,
        // likes : action.payload.likes,
        // notifications : action.payload.notifications,
        
        
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true
      }
    // create like
    case LIKE_SCREAM:
      console.log(action.payload)
      return {
        ...state,
        likes : [
          ... state.likes,
          {
            userHandle: state.credentials.handle,
            screamId : action.payload.screamId
          }
        ]
      }
    case UNLIKE_SCREAM:
      return{
        ...state,
        likes : state.likes.filter(like => like.screamId === action.payload.screamId )
      }
    default:
      return state;
  }
}
