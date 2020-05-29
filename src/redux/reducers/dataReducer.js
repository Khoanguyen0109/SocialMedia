import {
  SET_SCREAM,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  SET_SCREAMS,
  LOADING_DATA,
} from "../type";

const inittialState = {
  scream: [],
  screams: {},
  loading: false,
};

export default function (state = inittialState, action) {
  switch (action) {
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
      let index = state.screams.findIndex(
        (scream) => scream.screamId === action.payload.screamId
      );
      state.screams[index] = action.payload
      return {};
    case LIKE_SCREAM:
      return {};

    case UNLIKE_SCREAM:
      return {};
    default:
      return state;
  }
}
