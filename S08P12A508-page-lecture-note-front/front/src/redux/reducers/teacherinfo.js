let initialState = {
    teacherinfo: [],
  };
  function teacherinfoReducer(state = initialState, action) {
    let { type, payload } = action;
    switch (type) {
      case "GET_TEACHER_INFO_SUCCESS":
        return { ...state, teacherinfo: payload.result };
      default:
        return { ...state };
    }
  }
  export default teacherinfoReducer;