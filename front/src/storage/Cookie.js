import { Cookies } from "react-cookie";

//getRefreshToken: RefreshToken을 Cookie 저장하는 함수
//getCookieToken: Cookie에 저장된 RefreshToken을 호출하는 함수
//removeCookieTokem: 로그아웃시 Cookie를 삭제하는 함수

const cookies = new Cookies();

export const setUserId = (userId) => {
  const today = new Date();
  const expireDate = today.setHours(today.getHours() + 10);
  return cookies.set("userid", userId, {
    sameSite: "strict",
    path: "/",
    expires: new Date(expireDate),
  });
};

export const getRefreshToken = (refreshToken) => {
  const today = new Date();
  const expireDate = today.setHours(today.getHours() + 10);
  console.log("쿠키저장작동", refreshToken);
  return cookies.set("refresh_token", refreshToken, {
    sameSite: "strict",
    path: "/",
    expires: new Date(expireDate),
  });
};

export const getCookieToken = () => {
  console.log("쿠키발급작동");
  return cookies.get("refresh_token");
};
export const getUserId = () => {
  console.log("쿠키에서 유저아이디 발급");
  return cookies.get("userid");
};

export const removeCookieToken = () => {
  return cookies.remove("refresh_token", { sameSite: "strict", path: "/" });
};
