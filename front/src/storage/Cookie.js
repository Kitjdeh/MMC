import { Cookies } from "react-cookie";

//getRefreshToken: RefreshToken을 Cookie 저장하는 함수
//getCookieToken: Cookie에 저장된 RefreshToken을 호출하는 함수
//removeCookieTokem: 로그아웃시 Cookie를 삭제하는 함수

const cookies = new Cookies();

export const getRefreshToken = (refresToken) => {
  return cookies.set("refresh_token", refresToken, {
    sameSite: "None",
    path: "/",
  });
};

export const getCookieToken = () => {
  return cookies.get("refresh_token");
};

export const removeCookieToken = () => {
  return cookies.remove("refresh_token", { sameSite: "None", path: "/" });
};
