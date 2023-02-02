import { combineReducers } from "redux";
import questionReducer from "./questions";
import userReducer from "./userinfo";
import detailquestionReducer from "./questiondetail";
import pointReducer from "./point";
export default combineReducers({
    questions: questionReducer,
    userinfo: userReducer,
    detailquestion:detailquestionReducer,
    point: pointReducer,
})