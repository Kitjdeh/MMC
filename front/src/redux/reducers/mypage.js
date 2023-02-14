let initialState = {
    point: [],
    questions: [],
    lectures: [],
  };
  function mypageReducer(state = initialState, action) {
    let { type, payload } = action;
    switch (type) {
      case "GET_POINT_DETAIL_SUCCESS":
        return { ...state };
      case "GET_POINT_LIST_SUCCESS":
        return { ...state, point: payload.data };
      case "GET_MYQUESTION_LIST_SUCCESS":
        return { ...state, questions: payload.data};
      case "GET_MYLECTURE_LIST_SUCCESS":
        return { ...state, lectures: payload.data};
      default:
        return { ...state };
    }
  }
  export default mypageReducer;