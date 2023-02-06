let initialState = {
  authenticated: false,
  accessToken: null,
  userId: "",
};
function tokenReducer(state = initialState, action) {
  let { type, payload } = action;
  console.log("로그인전", payload);
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
      return { ...state, authenticated: false, accessToken: null };
    case "POST_RESETTOEKN_SUCCESS":
      console.log("토큰 재발급 요청");
      return {
        ...state,
        authenticated: true,
        accessToken: payload.data["jwt-auth-token"],
        userId: payload.data.userId,
      };
    default:
      return { ...state };
  }
}
export default tokenReducer;
