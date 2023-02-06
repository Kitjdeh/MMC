import { combineReducers } from "redux";
import questionReducer from "./questions";
import userReducer from "./userinfo";
import detailquestionReducer from "./questiondetail";
import tokenReducer from "./authenticate";
import teacherinfoReducer from "./teacherinfo";
export default combineReducers({
    questions: questionReducer,
    userinfo: userReducer,
    detailquestion:detailquestionReducer,
    authToken:tokenReducer,
    teacherinfo:teacherinfoReducer,
    signup:userReducer,
})