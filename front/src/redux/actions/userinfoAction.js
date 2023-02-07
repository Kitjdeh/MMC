import axios from "axios";
let baseUrl="http://localhost:8080/api/v1/users";

function getUserInfo(user_id){
    return async (dispatch)=>{
        let url = baseUrl+`/${user_id}`;
        let response = await axios.get(url)
        .then((response)=>{
            let data=response.data;
            dispatch({type:"GET_USERINFO_SUCCESS",payload:{data}});
        })
        .catch((error)=>{
            console.log("getUser", error);
        })
    }   
}

function signUp(data) {
  console.log("회원가입 action", data);
  return async (dispatch, getState) => {
    let url = `http://localhost:8080/api/v1/users`;
    // let url = `http://i8a508.p.ssafy.io:8080/api/v1/users`;
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
export const userinfoAction = {  signUp,getUserInfo };
