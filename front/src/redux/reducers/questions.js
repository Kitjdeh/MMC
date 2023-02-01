let initialState = {
    questions: [],
  };
  function questionReducer(state = initialState, action) {
    let { type, payload } = action;
    switch (type) {
      case "GET_QUESTIONS_SUCCESS":
        return { ...state, questions: payload.result };
      default:
        return { ...state };
    }
  }
  export default questionReducer;
  