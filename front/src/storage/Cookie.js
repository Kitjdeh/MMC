import { Cookies } from "react-cookie";

//getRefreshToken: RefreshToken을 Cookie 저장하는 함수
//getCookieToken: Cookie에 저장된 RefreshToken을 호출하는 함수
//removeCookieTokem: 로그아웃시 Cookie를 삭제하는 함수

const cookies = new Cookies();

export const setUserId = (userId) => {
  const today = new Date();
  const expireDate = today.setHours(today.getHours() + 10);
  return cookies.set("userId", userId, {
    sameSite: "strict",
    path: "/",
    expires: new Date(expireDate),
  });
};

export const setAccessToken = (accessToken) => {
  const today = new Date();
  const expireDate = today.setHours(today.getHours()+10);
  console.log("쿠키저장", accessToken);

  return cookies.set("jwt-auth-token", accessToken, {
    sameSite: "strict",
    path: "/",
    expires: new Date(expireDate),
  });
};

export const setRefreshToken = (refreshToken) => {
  const today = new Date();
  const expireDate = today.setHours(today.getHours() + 10);
  console.log("쿠키저장", refreshToken);
  return cookies.set("jwt-refresh-token", refreshToken, {
    sameSite: "strict",
    path: "/",
    expires: new Date(expireDate),
  });
};


// export const getRefreshToken = (refreshToken) => {
//   const today = new Date();
//   const expireDate = today.setHours(today.getHours() + 10);
//   console.log("쿠키저장작동", refreshToken);
//   return cookies.set("refresh_token", refreshToken, {
//     sameSite: "strict",
//     path: "/",
//     expires: new Date(expireDate),
//   });
// };
export const getRefreshToken = () => {
  console.log("쿠키발급작동");
  return cookies.get("jwt-refresh-token");
};

export const getAccessToken = () => {
  console.log("쿠키발급작동");
  return cookies.get("jwt-auth-token");
};

export const getCookieToken = () => {
  console.log("쿠키발급작동");
  return cookies.get("refresh_token");
};
export const getUserId = () => {
  console.log("쿠키에서 유저아이디 발급");
  return cookies.get("userid");
};

export const removeRefreshToken = () => {
  return cookies.remove("jwt-refresh-token", { sameSite: "strict", path: "/" });
};

export const removeAccessToken = () => {
  return cookies.remove("jwt-auth-token", { sameSite: "strict", path: "/" });
};

export const removeUserId = () => {
  return cookies.remove("userId", { sameSite: "strict", path: "/" });
};