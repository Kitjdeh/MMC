let initialState = {
    questions: [],
  };
  function questionReducer(state = initialState, action) {
    let { type, payload } = action;
    switch (type) {
      case "GET_PRODUCT_SUCCESS":
        return { ...state, questions: payload.data };
      default:
        return { ...state };
    }
  }
  export default questionReducer;
  