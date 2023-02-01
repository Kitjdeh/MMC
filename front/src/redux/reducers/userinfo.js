let initialState = {
    userinfo: [],
  };
  function userReducer(state = initialState, action) {
    let { type, payload } = action;
    switch (type) {
      case "GET_USERINFO_SUCCESS":
        return { ...state, userinfo: payload.data };
      default:
        return { ...state };
    }
  }
  export default userReducer;