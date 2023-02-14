let initialState = {
    note: [],
  };
  function noteReducer(state = initialState, action) {
    let { type, payload } = action;
    switch (type) {
      case "GET_LECTURE_NOTE_SUCCESS":
        return { ...state, note: payload.data };
      default:
        return { ...state };
    }
  }
  export default noteReducer;