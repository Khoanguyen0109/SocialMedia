import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

// reducer
import userReducer from "./reducers/userReducer";
import dataReducer from "./reducers/dataReducer";
import uiReducer from "./reducers/uiReduce.js";
import { composeWithDevTools } from "redux-devtools-extension";

const initialState = {};
const middleWare = [thunk];

const rootReducers = combineReducers({
  user: userReducer,
  data: dataReducer,
  ui: uiReducer,
});

const store = createStore(
  rootReducers,
  initialState,
  compose(applyMiddleware(...middleWare),composeWithDevTools())
);

export default store