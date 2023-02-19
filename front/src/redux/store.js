import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import perReducer from "./reducers/index";

export const store = createStore(perReducer , applyMiddleware(thunk));