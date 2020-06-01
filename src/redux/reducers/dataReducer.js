import {
  SET_SCREAM,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  SET_SCREAMS,
  LOADING_DATA,
  POST_SCREAM,
  DELETE_SCREAM,
  SUBMIT_COMMENT,
} from "../type";

const initialState = {
  scream: {},
  screams: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_SCREAMS:
      return {
        ...state,
        screams: action.payload,
        loading: false,
      };
    case SET_SCREAM:
      return {
        ...state,
        scream: action.payload,
      };
    case POST_SCREAM:
      return {
        ...state,
        screams: [action.payload, ...state.screams],
      };
    case DELETE_SCREAM:
      let indexDelete = state.screams.findIndex(
        (scream) => scream.screamId === action.payload
      );
      state.screams.splice(indexDelete, 1);
      return {
        ...state,
      };
    // find scream => set scream new Data
    //=> userReducer
    case LIKE_SCREAM:
    case UNLIKE_SCREAM:
      let index = state.screams.findIndex(
        (scream) => scream.screamId === action.payload.screamId
      );
      state.screams[index] = action.payload;
      if (state.scream.screamId === action.payload.screamId) {
        state.scream = action.payload;
      }
      return {
        ...state,
      };
      case SUBMIT_COMMENT:
        
        return {
          ...state,
          scream: {
            ...state.scream,
            comments: [action.payload, ...state.scream.comments]
          }
        };
    default:
      return state;
  }
}
