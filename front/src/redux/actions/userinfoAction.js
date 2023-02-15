import axios from "axios";
import { apiInstance } from "../../api";
const api = apiInstance();
// let baseUrl = "http://localhost:8080/api/v1/users";
let baseUrl = "http://i8a508.p.ssafy.io:8083/api/v1/users";

function getUserInfo(user_id) {
  return async (dispatch) => {
    let url = baseUrl + `/${user_id}`;
    let response = await api
      .get(url)
      .then((response) => {
        let data = response.data;
        dispatch({ type: "GET_USERINFO_SUCCESS", payload: { data } });
      })
      .catch((error) => {
        console.log("getUser", error);
      });
  };
}

function modifyUser(user) {
  console.log("USERINFO ACTION MODIFY", user);
  return async (dispatch) => {
    let url = baseUrl + `/${user.userId}`;
    let response = await api
      .patch(url, JSON.stringify(user), {
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      })
      .then((response) => {
        let data = response.data;
        dispatch({ type: "GET_USER_INFO_SUCCESS", payload: { data } });
      })
      .catch((error) => {
        console.log("MODIFYUSER", error);
      });
  };
}

function signUp(inputs) {
  console.log("회원가입 action", inputs);
  return async () => {
    let url = baseUrl;
    let response = await axios
      .post(url, inputs)
      .then((response) => {
        let data = response.data;
        console.log(data);
      })
      .catch((error) => {
        console.log("ERROR", error);
      });
  };
}
export const userinfoAction = { signUp, getUserInfo, modifyUser };
