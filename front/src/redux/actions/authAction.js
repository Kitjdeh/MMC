import axios from "axios";
import { getRefreshToken, setUserId, setAccessToken, setRefreshToken} from "../../storage/Cookie";
import { removeAccessToken, removeRefreshToken, removeUserId } from "../../storage/Cookie";
import jwtDecode from "jwt-decode";

import { apiInstance } from "../../api/index";

let baseUrl="http://i8a508.p.ssafy.io:8083/api/v1";

const api = apiInstance();

function onLogin(id, password) {
  let data = {
    identity: id,
    password: password,
  };
  console.log("로그인요청은 옴", data);
  return async (dispatch, getState) => {
    let url = `${baseUrl}/login`;
    let response = await axios
      .post(url, JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      })
      .then((response) => {
        let data = response.data;
        let refreshtoken = data["jwt-refresh-token"];
        let userid = data["userId"];
        getRefreshToken(refreshtoken);
        setUserId(userid);
        dispatch({ type: "POST_AUTH_SUCCESS", payload: { data } });
      })
      .catch((error) => {
        console.log("인증에러", error);
      });
  };
}
function onLogout(userId) {
  console.log("로그아웃요청", userId);
  const id = Number(userId);
  let data = {
    userId: id,
  };
  return async (dispatch, getState) => {
    let url = `${baseUrl}/logout?userId=${id}`;
    let response = await api
      .get(url)
      .then((response) => {
        dispatch({ type: "DELETE_TOKEN_SUCCESS" });
        dispatch({ type: "SET_IS_LOGIN", payload: false });
        dispatch({ type: "SET_IS_VALID_TOKEN", payload: false });
        dispatch({ type: "SET_IS_LOGIN_ERROR", payload: false }); 
          
        sessionStorage.clear();
        
        removeAccessToken(null);
        removeRefreshToken(null);
        removeUserId(null);
      })
      .catch((error) => {
        console.log("로그아웃에러", error);
      });
  };
}

function resetToken(refreshtoken, userId) {
  let data = {
    userId: userId,
    refreshToken: refreshtoken,
  };
  console.log("리셋토큰데이터", data);
  return async (dispatch, getstate) => {
    let url = `${baseUrl}/users/refresh`;
    let response = await axios
      .post(url, JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      })
      .then((response) => {
        let data = response.data;
        let accesstoken = data["jwt-auth-token"];
        dispatch({ type: "POST_RESETTOEKN_SUCCESS", payload: { data } });
      })
      .catch((error) => {
        console.log("토큰리셋인증에러", error);
      });
  };
}

function userConfirm(userId, password) {
  const inputs = {
    identity: userId,
    password: password,
  };
  return async (dispatch) => {
    let url = `${baseUrl}/login`;
    let response = await axios
      .post(url, JSON.stringify(inputs), {
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      })
      .then((response) => {
        let data = response.data;
        if(data["jwt-auth-token"] != null){
          let accessToken = data["jwt-auth-token"];
          let refreshToken = data["jwt-refresh-token"];
          let userId = data["userId"];
          console.log(accessToken);
          console.log(refreshToken);
          console.log(userId);
          dispatch({ type: "SET_IS_LOGIN", payload: true });
          dispatch({ type: "SET_IS_VALID_TOKEN", payload: true });
          dispatch({ type: "SET_IS_LOGIN_ERROR", payload: false }); 
          
          sessionStorage.setItem("jwt-auth-token", accessToken);
          
          setAccessToken(accessToken);
          setRefreshToken(refreshToken);
          setUserId(userId);
          dispatch({ type: "SET_AUTH_TOKEN", payload: accessToken });
        }
        else{
          alert("아이디와 비밀번호를 확인하세요.");
          dispatch({ type: "SET_IS_LOGIN", payload: false });
          dispatch({ type: "SET_IS_VALID_TOKEN", payload: false });
          dispatch({ type: "SET_IS_LOGIN_ERROR", payload: true });
        }
      })
      .catch((error) => {
        alert("아이디와 비밀번호를 확인하세요.");
        console.log("userConfirm Error", error);
      });
  };
}

function getUserInfo(token){
  console.log("OOOO",token)
  let decodeToken = jwtDecode(token);
  return async (dispatch) => {
    let url = `${baseUrl}/users/${decodeToken.userId}`;
    api.defaults.headers["jwt-auth-token"] = token;
    let response = await api
      .get(url)
      .then((response) => {
        let data = response.data.userId;
        console.log(data);
        dispatch({ type: "GET_USER_INFO_SUCCESS", payload: { data } });      })
      .catch(async(error) => {
        console.log("getUser", error);
      });
  };
}

function tokenRegeneration(refreshtoken, userId) {
  let data = {
    userId: userId,
    refreshToken: refreshtoken,
  };
  console.log("리셋토큰데이터", data);
  return async (dispatch, getstate) => {
    let url = `${baseUrl}/users/refresh`;
    let response = await axios
      .post(url, JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      })
      .then((response) => {
        let data = response.data;
        let accesstoken = data["jwt-auth-token"];
        dispatch({ type: "POST_RESETTOEKN_SUCCESS", payload: { data } });
      })
      .catch((error) => {
        console.log("토큰리셋인증에러", error);
      });
    }
  };


export const authAction = { onLogout, onLogin, resetToken, userConfirm, getUserInfo };
