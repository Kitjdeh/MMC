let initialState = {
  authenticated: false,
  accessToken: null,
  userId: "",
  isLogin: false,
  isValidToken: false,
  isLoginError: false,
};
function tokenReducer(state = initialState, action) {
  let { type, payload } = action;
  switch (type) {
    case "POST_AUTH_SUCCESS":
      return {
        ...state,
        authenticated: true,
        accessToken: payload.data["jwt-auth-token"],
        userId: payload.data.userId,
      };
    case "DELETE_TOKEN_SUCCESS":
      console.log("로그아웃 토큰제거까지 옴");
      return { ...state, isLogin: false, accessToken: null };
    case "POST_RESETTOEKN_SUCCESS":
      console.log("토큰 재발급 요청");
      return {
        ...state,
        authenticated: true,
        accessToken: payload.data["jwt-auth-token"],
        userId: payload.data.userId,
      };
    case "SET_IS_LOGIN":
      return { ...state, isLogin: payload};
    case "SET_IS_VALID_TOKEN":
      return { ...state, isValidToken: payload};
    case "SET_IS_LOGIN_ERROR":
      return { ...state, isLoginError: payload};
    case "SET_AUTH_TOKEN":
      console.log("SET_AUTH_TOKEN",payload)
      return { ...state, accessToken: payload };
    case "GET_USER_INFO_SUCCESS":
      return { ...state, userId: payload.data};
    default:
      return { ...state };
  }
}
export default tokenReducer;
