let initialState = {
    points: [],
    user: []
  };
  function adminReducer(state = initialState, action) {
    let { type, payload } = action;
    switch (type) {
      case "GET_POINT_LIST_SUCCESS":
        return { ...state, points: payload.data };
      case "GET_OTHER_INFO_SUCCESS":
        return { ...state, user: payload.data };
      default:
        return { ...state };
    }
  }

export default adminReducer;
