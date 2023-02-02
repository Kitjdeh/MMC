let initialState = {
    authenticated: false,
    accessToken:null
  };
  function tokenReducer(state = initialState, action) {
    let { type, payload } = action;
    switch (type) {
      case "GET_TOKEN_SUCCESS":
        return { ...state, authenticated: true, accessToken:payload.payload };
      case "DELETE_TOKEN_SUCCESS":
        return {...state, authenticated: false, accessToken:null}
        default:
        return { ...state };
    }
  }
  export default tokenReducer;