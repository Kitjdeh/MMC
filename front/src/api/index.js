import axios from "axios";
import { Cookies } from 'react-cookie';
import { setAccessToken } from "../storage/Cookie";

function apiInstance() {
  const cookie = new Cookies();

  const instance = axios.create({
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "jwt-auth-token": cookie.get("jwt-auth-token"),
    },
  });
  instance.interceptors.request.use(
    (response)=> {
      return response;
    },
    async (error) => {
      console.log("error11111",error);
      return Promise.reject(error);
    }
  )

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      console.log("error22222", error);
      if(error.response && error.response.status){
        switch(error.response.status){
          case 401:
            console.log("401error");
            break;
          case 400:   //Access토큰 기간 만료
            const userId = cookie.get("userId");
            const refreshToken = cookie.get("jwt-refresh-token");
            let url = `http://i8a508.p.ssafy.io:8083/api/v1/users/refresh`;            
            let data = {
              userId: userId,
              refreshToken: refreshToken,
            };
            console.log(data);
            let response = await axios
              .post(url, JSON.stringify(data), {
                headers: {
                  "Content-Type": "application/json;charset=utf-8",
                },
              })
              .then((response) => {
                let data = response.data;
                let accessToken = data["jwt-auth-token"];
                setAccessToken(accessToken);
                console.log("TOKENeeeeeeen", data);
              })
              .catch((error) => {
                console.log("토큰리셋인증에러", error);
              });
            break;
        }
      }
    }
  );
  return instance;
}

export { apiInstance };
