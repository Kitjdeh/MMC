import axios from "axios";
let baseUrl = "http://i8a508.p.ssafy.io:8083/api/v1";

function getUserInfo(user_id) {
  return async (dispatch) => {
    let url = baseUrl + `/${user_id}`;
    let response = await axios
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

function signUp(inputs) {
  console.log("회원가입 action", inputs);
    return async () => {
      let url = baseUrl + `/users`;;
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
export const userinfoAction = { signUp, getUserInfo };
