let initialState = {
    points: [],
  };
  function adminReducer(state = initialState, action) {
    let { type, payload } = action;
    switch (type) {
      case "GET_POINT_LIST_SUCCESS":
        return { ...state, points: payload.data };
      default:
        return { ...state };
    }
  }
  export default adminReducer;
  