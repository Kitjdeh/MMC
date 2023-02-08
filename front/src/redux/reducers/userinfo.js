let initialState = {
    userinfo: [],
  };
  function userReducer(state = initialState, action) {
    let { type, payload } = action;
    console.log('유저인포',payload)
    switch (type) {
      case "GET_USERINFO_SUCCESS":
        return { ...state, userinfo: payload.data };
      case "POST_SIGNUP_SUCCESS":
        console.log(payload.data)
        return { ...state, userinfo: payload.data };
      default:
        return { ...state };
    }
  }
  export default userReducer;