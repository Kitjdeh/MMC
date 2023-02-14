let initialState = {
    point: [],
  };
  function pointReducer(state = initialState, action) {
    let { type, payload } = action;
    switch (type) {
      case "GET_POINT_DETAIL_SUCCESS":
        return { ...state };
      case "GET_POINT_LIST_SUCCESS":
        return { ...state, point: payload.data };
      default:
        return { ...state };
    }
    console.log(payload.data);
  }
  export default pointReducer;