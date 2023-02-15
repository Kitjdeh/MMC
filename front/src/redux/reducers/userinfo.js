let initialState = {
    userinfo: [],
  };
  function userReducer(state = initialState, action) {
    let { type, payload } = action;
    console.log('123123123',payload)
    switch (type) {
<<<<<<< HEAD
      case "GET_USERINFO_SUCCESS":
        console.log('유저정보 요청',payload)
=======
      case "GET_USER_INFO_SUCCESS":
>>>>>>> 5d36e7de20290a6bb26fb47ced45e8eb0269bb5c
        return { ...state, userinfo: payload.data };
      case "POST_SIGNUP_SUCCESS":
        console.log(payload.data)
        return { ...state, userinfo: payload.data };
      default:
        return { ...state };
    }
  }
  export default userReducer;