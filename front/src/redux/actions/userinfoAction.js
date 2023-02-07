import axios from "axios";
let baseUrl = "http://localhost:8080/api/v1/users";

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
export const userinfoAction = { signUp, getUserInfo };
