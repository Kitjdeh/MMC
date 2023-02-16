let initialState = {
  question: [],
  questions: [],
  trainers: [],
  imageUrl: [],
  backjoon: [],
  usercount: [],
  is_loaded: false,
};
function questionReducer(state = initialState, action) {
  let { type, payload } = action;
  switch (type) {
    case "GET_QUESTION_LIST_SUCCESS":
      return { ...state, questions: payload.data, is_loaded: true };
    case "GET_QUESTION_DETAIL_SUCCESS":
      return { ...state, question: payload.data };
    case "GET_TRAINER_LIST_SUCCEESS":
      return { ...state, trainers: payload.data };
    case "GET_IMAGE_URL_SUCCESS":
      return { ...state, imageUrl: payload.data };
    case "GET_BACKJOON_INFO_SUCCESS":
      return { ...state, backjoon: payload.data };
    case "GET_USER_COUNT_SUCCESS":
      return { ...state, usercount: payload.data };
    default:
      return { ...state };
  }
}
export default questionReducer;
