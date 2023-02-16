import { combineReducers } from "redux";
import questionReducer from "./question";
import userReducer from "./userinfo";
import mypageReducer from "./mypage";
import adminReducer from './admin';
import pointReducer from "./point";
import tokenReducer from "./authenticate";
import noteReducer from "./note";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from "redux-persist";

const persistConfig = {
    key: "root", // localStorage key 
    storage: storage, // localStorage
    whitelist:["question","userinfo","mypage","admin","authToken","point","note"]
  }
  
const rootReducer = combineReducers({
    question: questionReducer,
    userinfo: userReducer,
    mypage: mypageReducer,
    admin: adminReducer,
    authToken:tokenReducer,
    point: pointReducer,
    note: noteReducer,
});

const perReducer =persistReducer(persistConfig, rootReducer);

export default perReducer;