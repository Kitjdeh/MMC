import axios from "axios";

// function getUserInfo() {
//   return async (dispatch, getState) => {
//     let url = `http://localhost:5000/user`;
//     let response = await fetch(url);
//     let data = await response.json();
//     dispatch({ type: "GET_USERINFO_SUCCESS", payload: { data } });
//   };
// }

function signUp(item) {
  let data = item
  console.log("회원가입 action", data);
  return async (dispatch, getState) => {
    let url = `http://i8a508.p.ssafy.io:8080/api/v1/users`;
    let response = await axios
      .post(url, JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      })
      .then((response) => {
        let data = response.data;
        console.log("회원가입response",response)
        dispatch({ type: "POST_SIGNUP_SUCCESS", payload: { data } });
      })
      .catch((error) => {
        console.log("회원가입에러", error);
      });
  };
}
export const userinfoAction = {  signUp };
