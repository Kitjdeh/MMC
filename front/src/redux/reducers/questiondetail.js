let initialState = {
    question: [],
  };
  function detailquestionReducer(state = initialState, action) {
    let { type, payload } = action;
    switch (type) {
      case "GET_QUESTION_DETAIL_SUCCESS":
        return { ...state, question: payload.data };
      default:
        return { ...state };
    }
  }
  export default detailquestionReducer;