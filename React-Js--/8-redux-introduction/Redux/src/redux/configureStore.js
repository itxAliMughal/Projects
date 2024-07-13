import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import counterReducers from "./duck/counter";

const reducer = combineReducers({
  counter: counterReducers,
});

export default createStore(reducer, composeWithDevTools());
