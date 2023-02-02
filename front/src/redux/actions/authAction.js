import axios from "axios";

function onLogin(id, password) {
  console.log("로그인요청은 옴", id, password);
  return async (dispatch, getState) => {
    let url = `http://i8a508.p.ssafy.io:8080/api/v1/login`;
    let response = await axios
      .post(url, {
        identity: { id },
        password: { password },
      })
      .then((response) => {
        console.log(response);
        dispatch({ type: "POST_AUTH_SUCCESS", payload: { response } });
      })
      .catch((error) => {
        console.log("인증에러",error)
      });
      console.log(response)
  };
}
export const authAction = { onLogin };
