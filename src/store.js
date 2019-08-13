import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducers from "./state/reducers/index.js";
import logger from "redux-logger";

// const middleware = [thunk, logger];
const composeEnhance = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducers,
  composeEnhance(applyMiddleware(thunk, logger))
);

export default store;
