import { combineReducers } from "redux";
import questionReducer from "./question";
import userReducer from "./userinfo";
import mypageReducer from "./mypage";
import adminReducer from './admin';
import pointReducer from "./point";
import tokenReducer from "./authenticate";

export default combineReducers({
    question: questionReducer,
    userinfo: userReducer,
    mypage: mypageReducer,
    admin: adminReducer,
    authToken:tokenReducer,
    point: pointReducer,
})