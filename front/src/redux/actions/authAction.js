import axios from "axios";
import { getRefreshToken,setUserId } from "../../storage/Cookie";
import { removeCookieToken } from "../../storage/Cookie";

function onLogin(id, password) {
  let data = {
    identity: id,
    password: password,
  };
  console.log("로그인요청은 옴", data);
  return async (dispatch, getState) => {
    let url = `http://localhost:8080/api/v1/login`;
    // let url = `http://i8a508.p.ssafy.io:8080/api/v1/login`;
    let response = await axios
      .post(url, JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      })
      .then((response) => {
        let data = response.data;
        let refreshtoken = data["jwt-refresh-token"];
        let userid = data["userId"]
        getRefreshToken(refreshtoken);
        setUserId(userid)
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
    let url = `http://localhost:8080/api/v1/logout?userId=${id}`;
    // let url = `http://i8a508.p.ssafy.io:8080/api/v1/logout?userId=${id}`;
    let response = await axios
      .get(url)
      .then((response) => {
        removeCookieToken();
        dispatch({ type: "DELETE_TOKEN_SUCCESS" });
      })
      .catch((error) => {
        console.log("로그아웃에러", error);
      });
  };
}


function resetToken(refreshtoken,userId){
  let data = {
    "userId":userId,
    "refreshToken":refreshtoken
  }
  console.log("리셋토큰데이터",data)
  return async (dispatch,getstate) =>{
    let url = `http://localhost:8080/api/v1/users/refresh`
    // let url = `http://i8a508.p.ssafy.io:8080/api/v1/users/refresh`
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
}

export const authAction = { onLogout, onLogin,resetToken};