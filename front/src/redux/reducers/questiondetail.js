let initialState = {
    question: [],
  };
  function detailquestionReducer(state = initialState, action) {
    let { type, payload } = action;
    console.log(payload,"리듀서확인")
    switch (type) {
      case "GET_QUESTION_DETAIL_SUCCESS":
        return { ...state, question: payload.result };
      default:
        return { ...state };
    }
  }
  export default detailquestionReducer;